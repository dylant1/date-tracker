import { Request, Response, NextFunction } from "express";

export interface IGetUserAuthenticated extends Request {
  isAuthenticated: () => boolean;
}

module.exports = {
  ensureAuth: function (
    req: IGetUserAuthenticated,
    res: Response,
    next: NextFunction
  ) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
  ensureGuest: function (
    req: IGetUserAuthenticated,
    res: Response,
    next: NextFunction
  ) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
};
