// Importing HttpStatusCode from axios for better code readability
import { HttpStatusCode } from "axios";

// Import the 'http' module, which includes HTTP request functions
import http from "./HttpClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Function to create a GET request with authorization header
const createGetRequest = async (url: string) => {
  // Send a GET request using the 'http' module
  // Include the Authorization header with the JWT token retrieved from local storage
  const response = await http.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  // Check if the status code of the response is HttpStatusCode.Ok (200)
  if (response.status === HttpStatusCode.Ok) {
    // If the status is Ok, extract the result data from the response
    const data = response.data.result;
    // Return the extracted data
    return data;
  }
};

// Export the createGetRequest function to make it accessible from other files
export default createGetRequest;
