// Import interfaces representing data structures
import Budget from "../interfaces/Budget";
import Category from "../interfaces/Category";
import Expense from "../interfaces/Expense";
import Income from "../interfaces/Income";
import User from "../interfaces/User";

// Import the Axios instance for making HTTP requests
import http from "./HttpClient";

// Define a function for creating POST requests
const createPostRequest = async (
  url: string,
  body: Category | User | Budget | Income | Expense
) => {
  // Use try-catch to handle errors during the POST request
  try {
    // Send a POST request using the 'http' module
    const request = await http.post(
      url,
      { ...body }, // Spread operator is used to create a shallow copy of the body
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    // Return the request data
    return request;
  } catch (error) {
    // If an error occurs during the request, rethrow the error
    throw error;
  }
};

// Export the createPostRequest function for use in other parts of the application
export default createPostRequest;
