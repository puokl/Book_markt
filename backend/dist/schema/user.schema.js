"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "passwordConfirmation is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "paswords do not match",
        path: ["passwordConfirmation"],
    }),
};
const params = {
    params: (0, zod_1.object)({
        image: (0, zod_1.string)(),
    }),
};
exports.createUserSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateUserSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=user.schema.js.map