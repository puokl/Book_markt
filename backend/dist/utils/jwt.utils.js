"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = `${process.env.PRIVATEKEY}`;
const publicKey = `${process.env.PUBLICKEY}`;
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, Object.assign({}, (options && options)));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        return {
            valid: false,
            // expired: e.message === "jwt expired",
            expired: true,
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.utils.js.map