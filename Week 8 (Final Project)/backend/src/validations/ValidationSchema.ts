// Importing the Joi library for schema validation
import Joi from "joi";

// Schema for validating the request body during category creation
export const categoryBodySchema = Joi.object({
    title: Joi.string().required(),          // Required string for category title
    description: Joi.string().default(""),  // Optional string for category description with a default value of an empty string
});

// Schema for validating the request query parameters during category-related queries
export const categoryQuerySchema = Joi.object({
    id: Joi.string(),           // Optional string for category ID
    title: Joi.string(),        // Optional string for category title
});

// Schema for validating the request body during budget creation
export const budgetBodySchema = Joi.object({
    title: Joi.string().required(),          // Required string for budget title
    amount: Joi.number().required(),         // Required number for budget amount
    startTime: Joi.date().required(),        // Required date for budget start time
    endTime: Joi.date().required(),          // Required date for budget end time
    category: Joi.string().required(),       // Required string for budget category
});

// Schema for validating the request query parameters during budget-related queries
export const budgetQuerySchema = Joi.object({
    id: Joi.string(),           // Optional string for budget ID
    title: Joi.string(),        // Optional string for budget title
    date: Joi.date(),           // Optional date for budget date
});

// Schema for validating the request body during income creation
export const incomeBodySchema = Joi.object({
    source: Joi.string().required(),        // Required string for income source
    amount: Joi.number().required(),        // Required number for income amount
    date: Joi.date(),                        // Optional date for income date
});

// Schema for validating the request query parameters during income-related queries
export const incomeQuerySchema = Joi.object({
    id: Joi.string(),           // Optional string for income ID
    source: Joi.string(),       // Optional string for income source
    startDate: Joi.date(),      // Optional date for income start date
    endDate: Joi.date(),        // Optional date for income end date
});

// Schema for validating the request body during expense creation
export const expenseBodySchema = Joi.object({
    amount: Joi.number().required(),                // Required number for expense amount
    date: Joi.date().required(),                    // Required date for expense date
    description: Joi.string().default(""),         // Optional string for expense description with a default value of an empty string
    category: Joi.string().required(),              // Required string for expense category
    image: Joi.string(),                            // Optional string for expense image URL
});

// Schema for validating the request query parameters during expense-related queries
export const expenseQuerySchema = Joi.object({
    id: Joi.string(),               // Optional string for expense ID
    startDate: Joi.date(),          // Optional date for expense start date
    endDate: Joi.date(),            // Optional date for expense end date
    category: Joi.string(),         // Optional string for expense category
    amount: Joi.number(),           // Optional number for expense amount
    description: Joi.string(),      // Optional string for expense description
});
