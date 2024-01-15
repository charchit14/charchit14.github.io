import { HttpStatusCode } from "axios";
import "../../assets/scss/style.scss";
import User from "../../interfaces/User";
import createPostRequest from "../../service/PostRequest";

const loginForm = document.getElementById("form-login") as HTMLFormElement;
const validationError = document.getElementById("error-message") as HTMLElement;
const emailInput = document.getElementById("login-email") as HTMLInputElement;
const passwordInput = document.getElementById("login-password") as HTMLInputElement;

// 'Log in' form submit handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Clearing the previous error messages
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  if (!validationError.classList.contains("d-none")) {
    validationError.classList.add("d-none");
  }
  const email = emailInput.value;
  const password = passwordInput.value;
  // Validating the input
  if (!validateInput(email.trim(), password.trim())) {
    validationError.classList.remove("d-none");
  }
  // Submitting the form
  else {
    await sendAuthRequest(email, password);
  }
});

const validateInput = (email: string, password: string): boolean => {
  if (email === "") {
    validationError.innerHTML = "Please enter your email";
    emailInput.classList.add("is-invalid");
    return false;
  }
  if (password === "") {
    validationError.innerHTML = "Please enter your password";
    passwordInput.classList.add("is-invalid");
    return false;
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    validationError.innerHTML = "Please enter valid email";
    emailInput.classList.add("is-invalid");
    return false;
  }
  return true;
};

const sendAuthRequest = async (email: string, password: string) => {
  
  // Sending Request
  try {
    const user: User = { email, password };
    const response = await createPostRequest("/login", user);
    if (response.status === HttpStatusCode.Accepted) {
      localStorage.setItem("jwt", response.data.tokens.accessToken);
      window.location.href = "/views/Dashboard/";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Catch block
  }
};
