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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdateUser = exports.getGoogleUser = exports.getGoogleOAuthTokens = exports.findUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
// import log from "../utils/logger";
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createUser = createUser;
function validatePassword({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inside validatePassword");
        try {
            console.log("inside try");
            console.log("email", email);
            const user = yield user_model_1.default.findOne({ email });
            console.log("after user model findone", user);
            if (!user) {
                console.log("there is no user");
                return false;
            }
            console.log("after UserModel.findOne");
            const isValid = yield user.comparePassword(password);
            if (!isValid)
                return false;
            console.log("after user.comparePassword(password);");
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
        catch (error) {
            console.log("error in validatePassword", error);
        }
    });
}
exports.validatePassword = validatePassword;
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne(query).lean();
    });
}
exports.findUser = findUser;
function getGoogleOAuthTokens({ code, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
            grant_type: "authorization_code",
        };
        console.log("values", { values });
        try {
            const res = yield axios_1.default.post(url, qs_1.default.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            console.log("res.data", res.data);
            return res.data;
        }
        catch (error) {
            console.log("error", error.response.data.error);
            console.error(error, "Failed to fetch GoogleOauth Tokens");
            throw new Error(error.message);
        }
    });
}
exports.getGoogleOAuthTokens = getGoogleOAuthTokens;
// to get token with network request (session.controller => googleOauthHandler)
function getGoogleUser({ id_token, access_token, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error(error, "Error fetching Google user");
            throw new Error(error.message);
        }
    });
}
exports.getGoogleUser = getGoogleUser;
function findAndUpdateUser(query, update, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateUser = findAndUpdateUser;
//# sourceMappingURL=user.service.js.map