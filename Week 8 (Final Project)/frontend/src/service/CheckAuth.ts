// import { HttpStatusCode } from "axios";
// import http from "./HttpClient";

const token = localStorage.getItem("jwt") || "";

const validateToken = async () => {
  if (token === "") {
    window.location.href = "/views/Login/";
  }
  // Todo implement this as well
  // if (token !== "") {
  //   const response = await http.post("/validate", {
  //     token,
  //   });
  //   if (response.status !== HttpStatusCode.Ok) {
  //     window.location.href = "./views/Login/";
  //   }
  // }
};
validateToken();
