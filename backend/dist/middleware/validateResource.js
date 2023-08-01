"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creating a function and make that function return another function
// using currying
// because we want to be able to execute this function here with our schema inside of middleware
// and then we want that to return another function and that next function is going to take the request and response in next.
// and then it's going to validate that request object against that schema
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.default = validate;
//# sourceMappingURL=validateResource.js.map