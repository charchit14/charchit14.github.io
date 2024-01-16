// Import the 'http' module, which includes HTTP request functions
import http from "./HttpClient";

// Function to create a DELETE request with authorization header
const createDeleteRequest = async (url: string) => {
  // Send a DELETE request using the 'http' module
  // Include the Authorization header with the JWT token retrieved from local storage
  const response = await http.delete(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  // Return the response received from the DELETE request
  return response;
};

// Export the createDeleteRequest function to make it accessible from other files
export default createDeleteRequest;
