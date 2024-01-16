// Import necessary modules and entities
import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";  // File system module for file-related operations
import NotFoundError from "../errors/NotFound";  // Custom error for handling not found scenarios

// Create a router instance
const router = Router();

// Define a route for fetching images
router.get(
  "/:user/:image",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract image and user parameters from the request
      const image = req.params.image;
      const user = req.params.user;

      // Check if the requested file exists
      const fileExists = fs.existsSync(`./uploads/${user}/${image}`);
      if (!fileExists) {
        // If the file does not exist, throw a NotFoundError
        throw new NotFoundError("Requested file does not exist");
      }

      // Send the requested file as a response
      res.sendFile(image, { root: `./uploads/${user}/` });
    } catch (error) {
      // Forward any errors to the error-handling middleware
      next(error);
    }
  }
);

// Export the router
export default router;
