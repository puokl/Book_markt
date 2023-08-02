"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash"); // it makes a bit safer to access a property that we don't know if it exists or not
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
// we use this middleware to add the user to the req object
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "cookies.accessToken") ||
        (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, ""); // replace bearer with an empty string
    const refreshToken = (0, lodash_1.get)(req, "cookies.refreshToken") || (0, lodash_1.get)(req, "headers.x-refresh");
    const { decoded } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (!accessToken && refreshToken) {
        console.log("EXPIRED");
        const newAccessToken = yield (0, session_service_1.reIssueAccessToken)({ refreshToken }); // we check if refresh token is valid and we issue a new access toke
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken); // we set the new access token on the header
            res.cookie("accessToken", newAccessToken, {
                maxAge: 9000000,
                httpOnly: true,
                domain: process.env.DOMAIN,
                path: "/",
                sameSite: "strict",
                secure: true, // change to true in production (only https)
            });
        }
        const result = (0, jwt_utils_1.verifyJwt)(newAccessToken); // we decode that access token
        res.locals.user = result.decoded; // we attach the user back to res.locals
        // if they send a request with an expired access token the req flow is just going to continue as if they sent the req with a
        // valid access token given that the refresh token was valid
        console.log("new accesstoken created");
        return next();
    }
    if (!refreshToken) {
        console.log("No Refresh Token", refreshToken);
        return next();
    }
    return next();
});
exports.default = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map