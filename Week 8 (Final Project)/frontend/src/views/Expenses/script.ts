// Importing modules
import { HttpStatusCode } from "axios";
import * as bootstrap from "bootstrap";
import "../../assets/scss/style.scss";
import renderNavBar from "../../components/Navbar/navbar";
import Category from "../../interfaces/Category";
import Expense from "../../interfaces/Expense";
import createDeleteRequest from "../../service/DeleteRequest";
import createGetRequest from "../../service/GetRequest";
import http from "../../service/HttpClient";
import createPutRequest from "../../service/PutRequest";
import createCategoryOptions from "../../utils/CategoryOptions";

// Defining variables
const navBar = document.getElementById("nav-placeholder") as HTMLElement;
const searchInput = document.getElementById("search-bar") as HTMLInputElement;
const searchBtn = document.getElementById("btn-search") as HTMLElement;
const expenseAddBtn = document.getElementById("btn-add-expense") as HTMLElement;
const btnSaveExpense = document.getElementById("btn-save-expense") as HTMLElement;
const btnCloseDialog = document.getElementById("btn-close-expense-dialog") as HTMLElement;
const addDialogBox = document.getElementById("add-expense-dialog") as HTMLElement;
const remarksInput = document.getElementById("add-remarks") as HTMLInputElement;
const amountInput = document.getElementById("add-amount") as HTMLInputElement;
const categoryInput = document.getElementById("add-category") as HTMLInputElement;
const receiptInput = document.getElementById("add-receipt") as HTMLInputElement;
const dateInput = document.getElementById("add-date") as HTMLInputElement;
const expensesContainer = document.getElementById("expense-container") as HTMLElement;

let expenseModal: bootstrap.Modal;
let dialogExpenseId: string = "";

// When window loads
window.onload = async () => {
  renderNavBar(navBar, "nav-expenses");
  renderExpenseCards("");
  expenseModal = new bootstrap.Modal(addDialogBox);
  createCategoryOptions(categoryInput);
};

searchBtn.addEventListener("click", () => {
  const searchData = searchInput.value;
  console.log(searchData);
});

expenseAddBtn.addEventListener("click", () => {
  showDialog();
});

btnCloseDialog.addEventListener("click", () => {
  closeDialog();
});

btnSaveExpense.addEventListener("click", () => {
  saveExpense();
  closeDialog();
});
const closeDialog = () => {
  expenseModal.hide();
  receiptInput.value = "";
  remarksInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
  dialogExpenseId = "";
};
const saveExpense = async () => {
  const remarks = remarksInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;
  const receipt = receiptInput.files?.[0];
  const date = (dateInput.value && new Date(dateInput.value)) || new Date();
  const formData = new FormData();
  formData.append("description", remarks);
  formData.append("amount", amount);
  formData.append("category", category);
  receipt && formData.append("image", receipt);
  formData.append("date", date.toISOString());

  if (dialogExpenseId === "") {
    createExpense(formData);
    dialogExpenseId = "";
  } else if (dialogExpenseId != "") {
    const expenseId = dialogExpenseId!;
    const expense: Expense = {
      id: expenseId,
      amount: parseFloat(amount),
      description: remarks,
      category: category,
      date: date.toString(),
    };
    await updateExpense(expense);
    dialogExpenseId = "";
  }
};
const showDialog = (data?: {
  remarks: string;
  amount: number;
  category: string;
  date: string;
}) => {
  expenseModal.show();
  receiptInput.value = "";
  remarksInput.value = data?.remarks || "";
  amountInput.value = data?.amount.toString() || "";
  categoryInput.value = data?.category || "";
  dateInput.value = data?.date.toString() || "";
};
const createExpenseCard = (data: Expense) => {
  // Creating expense card element
  const expenseCard = document.createElement("div");
  expenseCard.classList.add("card", "mb-2", "col-md-8", "gx-3");
  expenseCard.style.position = "relative"; // Set position relative for absolute positioning

  // Creating card body element
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "mr-3");

  // Create card title and assigning ta input data
  const cardDescription = document.createElement("h3");
  cardDescription.classList.add("card-title", "text-danger", "m-0");
  cardDescription.textContent = data.description;

  // Creating card amount and assigning the input data
  const cardAmount = document.createElement("p");
  cardAmount.classList.add("card-text", "m-0");
  cardAmount.textContent = "NRS. " + data.amount;

  // Creating card category and assigning the input data
  const cardCategory = document.createElement("p");
  cardCategory.classList.add("card-text", "m-0");
  cardCategory.textContent = "Category: " + (data.category as Category).title;

  // Creating card date and assigning the input data
  const cardDate = document.createElement("p");
  cardDate.classList.add("card-text");
  cardDate.textContent = "Date: " + data.date;

  // Creating the delete button
  const btnDeleteContainer = document.createElement("div");
  btnDeleteContainer.style.position = "absolute";
  btnDeleteContainer.style.top = "5px";
  btnDeleteContainer.style.right = "20px";
  
  // Adding event listener to the delete button
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn", "btn-outline-danger", "round");
  btnDelete.textContent = "Delete";
  btnDelete.setAttribute("data-bs-toggle", "tooltip");
  btnDelete.setAttribute("data-bs-placement", "top");
  btnDelete.setAttribute("data-bs-title", "Delete Expense");
  const btnDeletetooltip = new bootstrap.Tooltip(btnDelete);
  btnDelete.addEventListener("click", () => {
    deleteExpense(data.id!);
    btnDeletetooltip.dispose();
  });

  // Appending delete button to its container
  btnDeleteContainer.appendChild(btnDelete);

  // Create the edit button container with absolute positioning
  // const btnEditContainer = document.createElement("div");
  // btnEditContainer.style.position = "absolute";
  // btnEditContainer.style.top = "5px";
  // btnEditContainer.style.right = "100px"; // Adjust the right value as needed

  // Create the edit button element and add a click event listener
  // const btnEdit = document.createElement("button");
  // btnEdit.classList.add("btn", "btn-outline-primary");
  // btnEdit.textContent = "Edit";
  // btnEdit.addEventListener("click", () => {
  //   dialogExpenseId = data.id!;
  //   return showDialog({
  //     remarks: data.description,
  //     amount: data.amount!,
  //     date: data.date as string,
  //     category: (data.category as Category).id!,
  //   });
  // });
  // btnEdit.setAttribute("data-bs-toggle", "tooltip");
  // btnEdit.setAttribute("data-bs-placement", "top");
  // btnEdit.setAttribute("data-bs-title", "Edit Expense");
  // new bootstrap.Tooltip(btnEdit);

  // // Append the edit button to its container
  // btnEditContainer.appendChild(btnEdit);

  // Creating view image link element and setting href and the target
  const viewImage = document.createElement("a");
  viewImage.classList.add("btn", "btn-primary");
  viewImage.textContent = "View Receipt";
  viewImage.href = data.image || "#";
  viewImage.target = "_blank";

  // Appending elements to the card body
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(cardAmount);
  cardBody.appendChild(cardCategory);
  cardBody.appendChild(cardDate);
  cardBody.appendChild(btnDeleteContainer);
  // cardBody.appendChild(btnEditContainer);
  // cardBody.appendChild(viewImage);

  // Appending card body to the expense card
  expenseCard.appendChild(cardBody);

  // Returning the created expense card element
  return expenseCard;
};

const renderExpenseCards = async (filter: any) => {
  const userExpenses = await createGetRequest(`/expenses/filter?${filter}`);
  if (userExpenses.length == 0) {
    expensesContainer.innerHTML =
      // eslint-disable-next-line quotes
      '<h1 class="text-center h-75 p-5 "><b>No Any Expense</b></h1>';
    return;
  }
  expensesContainer.innerHTML = "";
  userExpenses.forEach((expense: any) => {
    expensesContainer.appendChild(createExpenseCard(expense));
  });
};

const createExpense = async (expense: Expense | FormData) => {
  console.log(expense);
  const response = await http.post("/expenses/", expense, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
  if (response.status == HttpStatusCode.Accepted) {
    closeDialog();
    renderExpenseCards("");
    dialogExpenseId = "";
  }
};

const deleteExpense = async (id: string) => {
  const response = await createDeleteRequest(`/expenses/${id}`);
  if (response.status == HttpStatusCode.Accepted) {
    renderExpenseCards("");
  }
};

const updateExpense = async (expense: Expense) => {
  try {
    const response = await createPutRequest("/expenses/", expense);
    if (response.status == HttpStatusCode.Accepted) {
      renderExpenseCards("");
      dialogExpenseId = "";
    }
  } catch (error) {
    dialogExpenseId = "";
    console.log(error);
  }
};
