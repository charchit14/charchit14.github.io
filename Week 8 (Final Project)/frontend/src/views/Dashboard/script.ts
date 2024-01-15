import "../../assets/scss/style.scss";
import renderNavBar from "../../components/Navbar/navbar";
// import http from "../../service/HttpClient";
import createGetRequest from "../../service/GetRequest";

const navBar = document.getElementById("navbar-placeholder") as HTMLElement;
const displayName = document.getElementById("display-username") as HTMLElement;
const displayIncome = document.getElementById("summary-income") as HTMLElement;
const displayExpense = document.getElementById("summary-expense") as HTMLElement;
const displayBudget = document.getElementById("summary-budget") as HTMLElement;
// const expenseChart = document.getElementById("expense-chart") as HTMLCanvasElement;

window.onload = async () => {
  renderNavBar(navBar, "nav-dashboard");
  const userSummary = await createGetRequest("/users/summary");
  if (userSummary) {
    displayName.innerHTML = userSummary.username;
    displayIncome.innerHTML = `NRS. ${userSummary.totalIncome}`;
    displayExpense.innerHTML = `NRS. ${userSummary.totalExpense}`;
    displayBudget.innerHTML = `NRS. ${userSummary.totalIncome - userSummary.totalExpense}`;
  }
};
