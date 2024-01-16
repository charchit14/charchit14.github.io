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

// Middleware for JWT authentication
export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the JWT token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    // Check if the token is present
    if (!token) throw new ForbiddenError("No token provided");

    // Verify the JWT token using the accessSecret key from config
    const tokenUser = jwt.verify(token!, config.jwt.accessSecret);

    // Check if the token verification is successful
    if (!tokenUser) throw new ForbiddenError("Invalid access token");
    else {
      // Extract user ID from the token payload
      const userid = (tokenUser as any).userid;

      // Set the user information in res.locals for future use in the request
      res.locals.user = await getUserById(userid);

      // Call the next middleware in the stack
      next();
    }
  } catch (error) {
    // Handle specific JWT-related errors and send appropriate error responses
    if (error instanceof TokenExpiredError) {
      next(new UnauthorizedError("Access Token has expired!"));
    } else if (error instanceof NotBeforeError) {
      next(new UnauthorizedError("JWT is not active"));
    } else if (error instanceof JsonWebTokenError) {
      next(new UnauthorizedError("JWT is malformed"));
    }

    // Pass other errors to the next middleware in the stack
    next(error);
  }
};
