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
exports.googleOauthHandler = exports.deleteSessionHandler = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
// import log from "../utils/logger";
const accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "lax",
    secure: true, // change to true in production (only https)
};
const refreshTokenCookieOptions = Object.assign(Object.assign({}, accessTokenCookieOptions), { maxAge: 86400000 });
const deleteCookies = Object.assign(Object.assign({}, accessTokenCookieOptions), { expires: new Date(0) });
// @desc    Create a user's session
// @route   POST /api/sessions
// @access  Private
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inside createUserSessionHandler");
        // 1. validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        console.log("user in create user session handler", user);
        if (!user) {
            console.log("no user in create session handler");
            return res.status(401).send("Invalid email or password");
        }
        console.log("after validatePassword(req.body) in createUserSessionHandler");
        // 2. create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        console.log("session created");
        // 3. create an access token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: process.env.ACCESSTOKENTTL } // 1d
        );
        // 4. create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: process.env.REFRESHTOKENTTL } // 1y
        );
        // Set CORS headers to allow requests from the frontend
        // res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        // res.header("Access-Control-Allow-Origin", "https://marktbook.vercel.app");
        // res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
        // 5. return access & refresh tokens
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("user", user);
        return res.send({ user });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
// @desc    Get user's session
// @route   GET /api/products/:productId
// @access  Public
function getUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
// @desc    Delete a  product
// @route   DELETE /api/sessions
// @access  Private
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        //ANCHOR - since user somehow can have multiple session, i loop through all the user'session and delete them all,
        //get array of sessions
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
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
        yield (0, session_service_1.updateSession)({ _id: sessionIdsStr }, { valid: false });
        // we're not deleting the session, but turn it to false
        // we're deleting all the session linked to a single user
        return res.send({
            accessToken: null,
            refreshToken: null,
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
function googleOauthHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // // Set Access-Control-Allow-Origin header to allow requests from your frontend domain
        // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        // 1. get the code from qs
        const code = req.query.code;
        try {
            // 2. get the id and access token with the code
            const { id_token, access_token } = yield (0, user_service_1.getGoogleOAuthTokens)({ code });
            // 3. get user with tokens
            // we can either use the token to get the user or through a network request
            const googleUser = yield (0, user_service_1.getGoogleUser)({ id_token, access_token });
            // jwt.decode(id_token);
            //! we use jwt.decode (same as going to jwt.io) attention-> it is not going to verify the token,
            // but we know that the token is signed by google because we make this request server side
            // 4. upsert the user
            if (!googleUser.verified_email) {
                return res.status(403).send("Google account is not verified");
            }
            const user = yield (0, user_service_1.findAndUpdateUser)({
                email: googleUser.email,
            }, {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
            }, {
                upsert: true,
                new: true,
            });
            // 5. create a session
            const session = yield (0, session_service_1.createSession)(user === null || user === void 0 ? void 0 : user._id, req.get("user-agent") || "");
            // 6. create access & refresh tokens
            const userJSON = user === null || user === void 0 ? void 0 : user.toJSON();
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, userJSON), { session: session._id }), { expiresIn: `${process.env.ACCESSTOKENTTL}` } // 1d
            );
            const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, userJSON), { session: session._id }), { expiresIn: `${process.env.REFRESHTOKENTTL}` } // 1 year
            );
            // 7. set cookies
            res.cookie("accessToken", accessToken, accessTokenCookieOptions);
            res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
            // 8. redirect back to client
            res.redirect(`${process.env.ORIGIN}`);
        }
        catch (error) {
            console.error(error, "Failed to authorize Google user");
            return res.redirect(`${process.env.ORIGIN}/oauth/error`);
        }
    });
}
exports.googleOauthHandler = googleOauthHandler;
//# sourceMappingURL=session.controller.js.map