import { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import config from "../configs";
import ForbiddenError from "../errors/Forbidden";
import UnauthorizedError from "../errors/Unauthorized";
import { getUserById } from "../services/UserService";

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ForbiddenError("No token provided");
    const tokenUser = jwt.verify(token!, config.jwt.accessSecret);
    if (!tokenUser) throw new ForbiddenError("Invalid access token");
    else {
      const userid = (tokenUser as any).userid;
      res.locals.user = await getUserById(userid);
      next();
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new UnauthorizedError("Access Token has expired!"));
    } else if (error instanceof NotBeforeError) {
      next(new UnauthorizedError("JWT is not active"));
    } else if (error instanceof JsonWebTokenError) {
      next(new UnauthorizedError("JWT is malformed"));
    }
    next(error);
  }
};
