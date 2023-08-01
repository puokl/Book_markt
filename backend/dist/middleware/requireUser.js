"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        console.log("RequireUser middleware: it seems like there is no user in res.local.user");
        return res.sendStatus(403);
    }
    console.log("there is a user in requireUser");
    return next();
};
exports.default = requireUser;
//# sourceMappingURL=requireUser.js.map