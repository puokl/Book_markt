import { CookieOptions, Request, Response } from "express";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import log from "../utils/logger";
import jwt from "jsonwebtoken";
import { access } from "fs";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15min
  httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
  domain: process.env.DOMAIN,
  path: "/",
  sameSite: "lax",
  secure: false, // change to true in production (only https)
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1yr
};

const deleteCookies: CookieOptions = {
  ...accessTokenCookieOptions,
  expires: new Date(0),
};

export async function createUserSessionHandler(req: Request, res: Response) {
  // 1. validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // 2. create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // 3. create an access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: process.env.ACCESSTOKENTTL } // 15min
  );
  // 4. create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: process.env.REFRESHTOKENTTL } // 15min
  );
  // 5. return access & refresh tokens
  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  //FIXME - send user to client

  return res.send({ user });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  console.log("session", { sessions });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  //ANCHOR - since user somehow can have multiple session, i loop through all the user'session and delete them all,
  //get array of sessions
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  const sessionIds = [];
  for (const session of sessions) {
    if (session.user.equals(userId)) {
      sessionIds.push(session._id);
    }
  }

  const sessionIdsStr = sessionIds.map((id) => id.toString());
  //ANCHOR -

  // Clear the access token and refresh token cookies

  res.clearCookie("accessToken", accessTokenCookieOptions);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  console.log("cookies should be deleted");
  console.log(res.locals);

  await updateSession({ _id: sessionIdsStr }, { valid: false });
  // we're not deleting the session, but turn it to false
  // we're deleting all the session linked to a single user
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function googleOauthHandler(req: Request, res: Response) {
  // // Set Access-Control-Allow-Origin header to allow requests from your frontend domain
  // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  // 1. get the code from qs
  const code = req.query.code as string;
  console.log("code", { code });
  // console.log("req.query", req.query);
  // console.log("req", req);

  try {
    // 2. get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    console.log({ id_token, access_token });
    // 3. get user with tokens
    // we can either use the token to get the user or through a network request
    const googleUser = await getGoogleUser({ id_token, access_token });
    // jwt.decode(id_token);
    console.log("{googleUser}", { googleUser });
    //! we use jwt.decode (same as going to jwt.io) attention-> it is not going to verify the token,
    // but we know that the token is signed by google because we make this request server side

    // 4. upsert the user

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    // 5. create a session

    const session = await createSession(user?._id, req.get("user-agent") || "");

    // 6. create access & refresh tokens

    const userJSON = user?.toJSON();
    const accessToken = signJwt(
      {
        ...userJSON,
        session: session._id,
      },
      { expiresIn: `${process.env.ACCESSTOKENTTL}` } // 15min
    );

    const refreshToken = signJwt(
      {
        ...userJSON,
        session: session._id,
      },
      { expiresIn: `${process.env.REFRESHTOKENTTL}` } // 1 year
    );

    // 7. set cookies

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    // 8. redirect back to client
    res.redirect(`${process.env.ORIGIN}`);
  } catch (error: any) {
    // console.log("oauth error", error.response.data.error);
    log.error(error, "Failed to authorize Google user");

    //FIXME - check `${process.env.ORIGIN}/oauth/error` url and manage page
    return res.redirect(`${process.env.ORIGIN}/oauth/error`);
  }
}
