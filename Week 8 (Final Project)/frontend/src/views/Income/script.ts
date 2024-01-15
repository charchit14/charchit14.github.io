import { HttpStatusCode } from "axios";
import * as bootstrap from "bootstrap";
import "../../assets/scss/style.scss";
import renderNavBar from "../../components/Navbar/navbar";
import Income from "../../interfaces/Income";
import createDeleteRequest from "../../service/DeleteRequest";
import createGetRequest from "../../service/GetRequest";
import createPostRequest from "../../service/PostRequest";
import createPutRequest from "../../service/PutRequest";

const navBar = document.getElementById("nav-placeholder") as HTMLElement;
const searchInput = document.getElementById("search-bar") as HTMLInputElement;
const searchBtn = document.getElementById("btn-search") as HTMLElement;
const incomeAddBtn = document.getElementById("btn-add-income") as HTMLElement;
const btnSaveIncome = document.getElementById("btn-save-income") as HTMLElement;
const btnCloseDialog = document.getElementById(
  "btn-close-income-dialog"
) as HTMLElement;
const addDialogBox = document.getElementById(
  "add-income-dialog"
) as HTMLElement;
const sourceInput = document.getElementById("add-source") as HTMLInputElement;
const amountInput = document.getElementById("add-amount") as HTMLInputElement;
const dateInput = document.getElementById("add-date") as HTMLInputElement;

const incomeContainer = document.getElementById(
  "income-container"
) as HTMLElement;

let incomeModal: bootstrap.Modal;
let dialogIncomeId: string = "";
window.onload = () => {
  renderNavBar(navBar, "nav-income");
  incomeModal = new bootstrap.Modal(addDialogBox);
  renderIncomeCards("");
};
searchBtn.addEventListener("click", () => {
  const searchData = searchInput.value;
  console.log(searchData);
});

incomeAddBtn.addEventListener("click", () => {
  showDialog();
});

btnCloseDialog.addEventListener("click", () => {
  closeDialog();
});

btnSaveIncome.addEventListener("click", () => {
  saveIncome();
  closeDialog();
});

const saveIncome = () => {
  const source = sourceInput.value;
  const amount = amountInput.value;
  const date = dateInput.value || new Date();
  const income : Income = {
    source,
    amount: parseFloat(amount),
    date,
  };
  if (dialogIncomeId === "") {
    createIncome(income);
  } else if (dialogIncomeId != "") {
    income.id = dialogIncomeId;
    updateIncome(income);
  }
};
const closeDialog = () => {
  incomeModal.hide();
  dialogIncomeId = "";
  sourceInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
};
const showDialog = (data?: {
  source: string;
  amount: number;
  date: string;
}) => {
  incomeModal.show();
  sourceInput.value = data?.source || "";
  amountInput.value = data?.amount.toString() || "";
  dateInput.value = data?.date.toString() || "";
};

const createExpenseCard = (data: Income) => {
  // Create the expense card element
  const expenseCard = document.createElement("div");
  expenseCard.classList.add("card", "mb-2", "col-md-8", "gx-3");
  expenseCard.style.position = "relative"; // Set position relative for absolute positioning

  // Create the card body element
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "mr-3");

  // Create the card description element and assign the remarks from the data
  const cardSource = document.createElement("h3");
  cardSource.classList.add("card-title", "text-success", "m-0");
  cardSource.textContent = data.source;

  // Create the card amount element and assign the amount from the data
  const cardAmount = document.createElement("p");
  cardAmount.classList.add("card-text",  "m-0");
  cardAmount.textContent = "NRS. " + data.amount;

  // Create the card date element and assign the date from the data
  const cardDate = document.createElement("p");
  cardDate.classList.add("card-text");
  cardDate.textContent = "Date: " + data.date;

  // Create the delete button container with absolute positioning
  const btnDeleteContainer = document.createElement("div");
  btnDeleteContainer.style.position = "absolute";
  btnDeleteContainer.style.top = "5px";
  btnDeleteContainer.style.right = "20px";

  // Create the delete button element and add a click event listener
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn", "btn-outline-danger", "round");
  // btnDelete.innerHTML = "<i class='fas fa-trash'></i>";
  btnDelete.textContent = "Delete";
  btnDelete.setAttribute("data-bs-toggle", "tooltip");
  btnDelete.setAttribute("data-bs-placement", "top");
  btnDelete.setAttribute("data-bs-title", "Delete Income");
  const btnDeletetooltip = new bootstrap.Tooltip(btnDelete);
  btnDelete.addEventListener("click", () => {
    deleteIncome(data.id!);
    btnDeletetooltip.dispose();
  });

  // Append the delete button to its container
  btnDeleteContainer.appendChild(btnDelete);

  // // Create the edit button container with absolute positioning
  // const btnEditContainer = document.createElement("div");
  // btnEditContainer.style.position = "absolute";
  // btnEditContainer.style.top = "5px";
  // btnEditContainer.style.right = "100px"; // Adjust the right value as needed

  // // Create the edit button element and add a click event listener
  // const btnEdit = document.createElement("button");
  // btnEdit.classList.add("btn", "btn-outline-primary");
  // // btnEdit.innerHTML = "<i class='fas fa-edit'></i>";
  // btnEdit.textContent = "Edit";
  // btnEdit.addEventListener("click", () => {
  //   dialogIncomeId = data.id!;
  //   return showDialog({
  //     source: data.source,
  //     amount: data.amount!,
  //     date: data.date as string,
  //   });
  // });
  // btnEdit.setAttribute("data-bs-toggle", "tooltip");
  // btnEdit.setAttribute("data-bs-placement", "top");
  // btnEdit.setAttribute("data-bs-title", "Edit Expense");
  // new bootstrap.Tooltip(btnEdit);
  // // Append the edit button to its container
  // btnEditContainer.appendChild(btnEdit);

  // Create the view image link element and set the href and target

  // Append the card date, description, amount, delete button container, edit button, and view image link to the card body
  cardBody.appendChild(cardSource);
  cardBody.appendChild(cardAmount);
  cardBody.appendChild(cardDate);
  cardBody.appendChild(btnDeleteContainer);
  // cardBody.appendChild(btnEditContainer);

  // Append the card body to the expense card
  expenseCard.appendChild(cardBody);

  // Return the created expense card element
  return expenseCard;
};

/* -------------------------------------------------------------------------- */
/*                                  API Calls                                 */
/* -------------------------------------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderIncomeCards = async (filter: any) => {
  console.log(filter);
  const userIncomes = await createGetRequest("/incomes/");
  if (userIncomes.length == 0) {
    incomeContainer.innerHTML =
      // eslint-disable-next-line quotes
      '<h1 class="text-center h-75 p-5 ">No Any Income</h1>';
    return;
  }
  incomeContainer.innerHTML = "";
  userIncomes.forEach((income: Income) => {
    incomeContainer.appendChild(createExpenseCard(income));
  });
};

const createIncome = async (income: Income) => {
  const response = await createPostRequest("/incomes/", income);
  if (response.status == HttpStatusCode.Accepted) {
    renderIncomeCards("");
  }
};

const deleteIncome = async (id: string) => {
  const response = await createDeleteRequest(`/incomes/${id}`);
  if (response.status == HttpStatusCode.Accepted) {
    renderIncomeCards("");
  }
};

const updateIncome = async (income: Income) => {
  const response = await createPutRequest("/incomes/", income);
  if (response.status == HttpStatusCode.Accepted) {
    renderIncomeCards("");
    dialogIncomeId = "";
  }
};
