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
exports.getLog = exports.getCurrentUser = exports.updateUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
// import logger from "../utils/logger";
// @desc    Create a user
// @route   POST /api/users
// @access  Public
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            // return res.send(omit(user.toJSON(), "password"));
            console.log("user in backend createuser", user);
            return res.send(user);
        }
        catch (e) {
            console.error(e);
            return res.status(409).send(e.message);
            // 409 for conflict ( we assume it has violated the unique field in the user model)
        }
    });
}
exports.createUserHandler = createUserHandler;
// @desc    Update user image
// @route   PUT /api/users/:userId
// @access  Private
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const update = { image: req.body.image };
        const oldUser = yield (0, user_service_1.findUser)({ _id: userId });
        if (!oldUser) {
            return res.sendStatus(404);
        }
        const user = yield (0, user_service_1.findAndUpdateUser)({ _id: userId }, update, {
            new: true,
        });
        const newUser = { user };
        return res.send({ user });
    });
}
exports.updateUserHandler = updateUserHandler;
// @desc    Get current user
// @route   GET /api/me
// @access  Private
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(res.locals.user);
    });
}
exports.getCurrentUser = getCurrentUser;
// @desc    Get current session
// @route   GET /sessions/getLog
// @access  Private
function getLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(console.log("getLog works", res.locals.user));
    });
}
exports.getLog = getLog;
//# sourceMappingURL=user.controller.js.map