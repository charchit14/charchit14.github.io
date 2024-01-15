const token = localStorage.getItem("jwt") || "";

const validateToken = async () => {
  if (token === "") {
    window.location.href = "/views/Login/";
  }
};
validateToken();
