import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create an access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    // { expiresIn: config.get("accessTokenTtl") } // 15min
    { expiresIn: process.env.ACCESSTOKENTTL } // 15min
  );
  // create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    // { expiresIn: config.get("refreshTokenTtl") } // 15min
    { expiresIn: process.env.REFRESHTOKENTTL }
  );
  // return access & refresh tokens
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15min
    httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "strict",
    secure: false, // change to true in production (only https)
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1yr
    httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "strict",
    secure: false, // change to true in production (only https)
  });

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  console.log("res.locals", res.locals);
  const userId = res.locals.user._id;

  console.log("userId", userId);
  const sessions = await findSessions({ user: userId, valid: true });

  console.log({ sessions });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });
  // we're not deleting the session, but turn it to false

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
