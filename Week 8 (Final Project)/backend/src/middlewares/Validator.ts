import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import ValidationError from "../errors/Validation";

/**
 * Middleware to validate the request body against a Joi schema.
 * @param schema - Joi schema for request body validation.
 */
export const validateRequestBody =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the provided Joi schema
      const { error } = schema.validate(req.body);

      // If validation error occurs, throw a custom ValidationError
      if (error) {
        // Remove double quotes from the error message for better formatting
        const errorMessage = error.message.replace(new RegExp(/\"/g), "");
        throw new ValidationError(errorMessage);
      }

      // If validation is successful, proceed to the next middleware
      next();
    } catch (error) {
      // Pass any caught errors to the error-handling middleware
      next(error);
    }
  };

/**
 * Middleware to validate the request query parameters against a Joi schema.
 * @param schema - Joi schema for request query validation.
 */
export const validateRequestQuery =
  (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate the request query parameters against the provided Joi schema
      const { error } = schema.validate(req.query);

      // If validation error occurs, throw a custom ValidationError
      if (error) {
        // Remove double quotes from the error message for better formatting
        const errorMessage = error.message.replace(new RegExp(/\"/g), "");
        throw new ValidationError(errorMessage);
      }

      // If validation is successful, proceed to the next middleware
      next();
    } catch (error) {
      // Pass any caught errors to the error-handling middleware
      next(error);
    }
  };
