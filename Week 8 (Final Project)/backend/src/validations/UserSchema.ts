// Importing the Joi library for schema validation
import Joi from "joi";

// Defining a schema for validating the request body during user registration
export const userBodySchema = Joi.object({
  // Validating the 'username' field
  username: Joi.string().required().max(25),

  // Validating the 'email' field as a valid email address
  email: Joi.string().email().required(),

  // Validating the 'password' field, requiring a minimum length of 5 characters
  password: Joi.string().required().min(5),
});

// Defining a schema for validating the request body during user login
export const userLoginSchema = Joi.object({
  // Validating the 'email' field as a valid email address
  email: Joi.string().email().required(),

  // Validating the 'password' field
  password: Joi.string().required(),
});
