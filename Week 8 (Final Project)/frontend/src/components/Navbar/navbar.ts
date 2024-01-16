const renderNavBar = (placeholder: HTMLElement, active: string) => {
  // Fetch the HTML content of the navbar from the specified path
  fetch("../../components/Navbar/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      // Replace the content of the specified HTML element with the fetched navbar HTML
      placeholder.innerHTML = data;

      // Get all elements with the class "nav-link" in the rendered navbar
      const navLinks = document.querySelectorAll(".nav-link");

      // Get the element with the ID "btn-logout"
      const logout = document.getElementById("btn-logout");

      // Add a click event listener to the "Logout" button
      logout?.addEventListener("click", () => {
        // Remove the "jwt" item from the local storage (assuming it's a JWT token)
        localStorage.removeItem("jwt");

        // Redirect the user to the login page
        window.location.href = "/views/login";
      });

      // Remove the "active" class from all navigation links
      for (const navLink of navLinks) {
        navLink.classList.remove("active");
      }

      // Add the "active" class to the navigation link corresponding to the current page
      const currentPage = document.getElementById(active);
      currentPage!.classList.add("active");
    });
};

// Export the renderNavBar function for use in other parts of the application
export default renderNavBar;
