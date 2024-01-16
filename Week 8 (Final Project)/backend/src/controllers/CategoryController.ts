import { NextFunction, Request, Response } from "express";
import * as categoryService from "../services/CategoryService";
import HttpStatus from "http-status-codes";
import Category from "../models/Category";

// Create Category Controller
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract category data from the request body
    const category: Category = req.body;

    // Attach the user information from response locals to the category
    category.user = res.locals.user;

    // Call the category service to create a new category
    const response = await categoryService.createCategory(category);

    // Send a response with status ACCEPTED and the created category
    res.status(HttpStatus.ACCEPTED).json({
      message: "Category created successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get All Categories Controller
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user = res.locals.user;

    // Call the category service to retrieve all categories for the user
    const response = await categoryService.getAllCategories(user);

    // Send a response with status OK and the fetched categories
    res.status(HttpStatus.OK).json({
      message: "Categories fetched successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get Category by ID Controller
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Call the category service to retrieve a specific category by ID
    const response = await categoryService.getCategory(req.params.id);

    // Send a response with status OK and the fetched category
    res.status(HttpStatus.OK).json({
      message: "Category fetched successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Update Category Controller
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract category data from the request body
    const category: Category = req.body;

    // Extract user information from response locals
    const user = res.locals.user;

    // Call the category service to update the specified category
    const response = await categoryService.updateCategory(user, category);

    // Send a response with status ACCEPTED and the updated category
    res.status(HttpStatus.ACCEPTED).json({
      message: "Category updated successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Delete Category Controller
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract category ID from request parameters
    const { id } = req.params;

    // Extract user information from response locals
    const user = res.locals.user;

    // Call the category service to delete the specified category by ID
    const response = await categoryService.deleteCategory(user, id);

    // Send a response with status OK and the deleted category
    res.status(HttpStatus.OK).json({
      message: "Category deleted successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
