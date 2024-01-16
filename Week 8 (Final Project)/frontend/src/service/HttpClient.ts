// Import the Axios library
import axios from "axios";

// Create an Axios instance with a specific base URL
const http = axios.create({
  baseURL: "http://localhost:5005",
});

// Export the configured Axios instance for reuse in other parts of the application
export default http;
