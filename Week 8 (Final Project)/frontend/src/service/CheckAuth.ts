// Check if a JWT token is stored in the local storage
const token = localStorage.getItem("jwt") || "";

// Function to validate the presence of a token
const validateToken = async () => {
  // Check if the token is an empty string
  if (token === "") {
    // If the token is empty, redirect the user to the login page
    window.location.href = "/views/Login/";
  }
};

// Call the validateToken function to perform the token validation
validateToken();
