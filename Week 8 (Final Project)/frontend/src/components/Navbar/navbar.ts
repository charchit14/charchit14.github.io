const renderNavBar = (placeholder: HTMLElement, active: string) => {
  fetch("../../components/Navbar/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      placeholder.innerHTML = data;
      const navLinks = document.querySelectorAll(".nav-link");
      const logout = document.getElementById("btn-logout");

      logout?.addEventListener("click", () => {
        localStorage.removeItem("jwt");
        window.location.href = "/views/login";
      });

      for (const navLink of navLinks) {
        navLink.classList.remove("active");
      }
      const currentPage = document.getElementById(active);
      currentPage!.classList.add("active");
    });
};
export default renderNavBar;