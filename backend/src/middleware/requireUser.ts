// we have a problem with deserializeUser middleware, user is undefined. we have to validate if user exist for that given request
import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log("res.locals.user", user);

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
