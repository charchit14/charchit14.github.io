// Import HttpStatusCode from Axios for better code readability
import { HttpStatusCode } from "axios";

// Import the Axios instance for making HTTP requests
import http from "../service/HttpClient";

// Import the Category interface representing the data structure
import Category from "../interfaces/Category";

// Define a function for creating category options in a select element
const createCategoryOptions = async (select: HTMLElement) => {
  // Send a GET request to fetch user categories from the server
  const userCategories = await http.get("/categories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  // Check if the status code of the response is HttpStatusCode.Ok (200)
  if (userCategories.status == HttpStatusCode.Ok) {
    // Extract the category data from the response
    const data = userCategories.data.result;

    // Clear the existing options in the select element
    select.innerHTML = "";

    // Iterate over each category and create an option for the select element
    data.forEach((category: Category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.title;
      select.appendChild(option);
    });
  }
};

// Export the createCategoryOptions function for use in other parts of the application
export default createCategoryOptions;
