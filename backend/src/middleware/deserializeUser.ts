import { get } from "lodash"; // it makes a bit safer to access a property that we don't know if it exists or not
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// we use this middleware to add the user to the req object
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, ""); // replace bearer with an empty string

  // console.log("req", req);
  console.log("accessToken", { accessToken });
  const refreshToken =
    get(req, "cookies.accessToken") || get(req, "headers.x-refresh");
  // const refreshToken = req && req.headers && req.headers["x-refresh"];
  console.log("refreshToken", refreshToken);

  if (!accessToken) {
    console.log("No accessToken", accessToken);
    console.log("req.cookie", req.cookies);
    console.dir(req.cookies, { depth: null });
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  console.log("decoded", decoded);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken }); // we check if refresh token is valid and we issue a new access toke

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken); // we set the new access token on the header
      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15min
        httpOnly: true, // only accessible through http, not js. good security not provided by localstorage
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: "strict",
        secure: false, // change to true in production (only https)
      });
    }
    const result = verifyJwt(newAccessToken as string); // we decode that access token

    res.locals.user = result.decoded; // we attach the user back to res.locals
    // if they send a request with an expired access token the req flow is just going to continue as if they sent the req with a
    // valid access token given that the refresh token was valid
    return next();
  }
  return next();
};

export default deserializeUser;
