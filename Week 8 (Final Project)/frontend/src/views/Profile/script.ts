import { HttpStatusCode } from "axios";
import * as bootstrap from "bootstrap";
import "../../assets/scss/style.scss";
import renderNavBar from "../../components/Navbar/navbar";
import Category from "../../interfaces/Category";
import createDeleteRequest from "../../service/DeleteRequest";
import createGetRequest from "../../service/GetRequest";
import createPostRequest from "../../service/PostRequest";
import createPutRequest from "../../service/PutRequest";
// --------------------- Getting elements from DOM -----------------------
const navBar = document.getElementById("nav-placeholder") as HTMLElement;

const categoryContainer = document.getElementById("category-container") as HTMLElement;

const addCategoryDialog = document.getElementById("add-category-dialog") as HTMLElement;
const addCategoryBtn = document.getElementById("btn-add-category") as HTMLElement;
const btnCloseCategoryDialog = document.getElementById("btn-close-category-dialog") as HTMLElement;

const btnSaveCategory = document.getElementById("btn-save-category") as HTMLElement;
const categoryTitleInput = document.getElementById("add-category-title") as HTMLInputElement;
const categoryDescriptionInput = document.getElementById("add-category-description") as HTMLInputElement;
// --------------------- Initializing Modals -----------------------

let categoryModal: bootstrap.Modal;
let categoryId: string = "";
window.onload = async () => {
  renderNavBar(navBar, "nav-profile");
  categoryModal = new bootstrap.Modal(addCategoryDialog);

  const userCategories = await getUserCategories();
  renderUserCategories(userCategories);
};

addCategoryBtn.addEventListener("click", () => {
  categoryModal.show();
});
btnCloseCategoryDialog.addEventListener("click", () => {
  closeDialog();
});
btnSaveCategory.addEventListener("click", async () => {
  const title = categoryTitleInput.value;
  const description = categoryDescriptionInput.value;
  const category: Category = {
    title: title,
    description: description,
  };
  if (categoryId === "") {
    await saveCategory(category);
  }
  if (categoryId !== "") {
    category.id = categoryId;
    await updateCategory(category);
    categoryId = "";
  }
  renderUserCategories(await getUserCategories());
  closeDialog();
});

const closeDialog = () => {
  categoryTitleInput.value = "";
  categoryDescriptionInput.value = "";
  categoryModal.hide();
  categoryId = "";
};

const renderUserCategories = (categories: Category[]) => {
  categoryContainer.innerHTML = "";
  categories.forEach((category: Category) => {
    categoryContainer.appendChild(createCategoryCard(category));
  });
};

const createCategoryCard = (category: Category) => {
  const row = document.createElement("tr");

  const title = document.createElement("td");
  title.textContent = category.title;

  const description = document.createElement("td");
  description.textContent = category.description;

  const actions = document.createElement("td");
  actions.setAttribute("colspan", "2");
  const editButton = document.createElement("button");
  // editButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
  editButton.innerText = "Edit";
  editButton.classList.add("btn", "btn-warning");
  editButton.addEventListener("click", () => {
    categoryId = category.id!;
    categoryModal.show();
    categoryTitleInput.value = category.title;
    categoryDescriptionInput.value = category.description;
  });
  const deleteButton = document.createElement("button");
  // deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
  deleteButton.innerText = "Delete";

  deleteButton.classList.add("btn", "btn-danger", "mx-2");
  deleteButton.addEventListener("click", () => {
    deleteCategory(category.id!);
  });
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);
  row.appendChild(title);
  row.appendChild(description);
  row.appendChild(actions);
  return row;
};

/* -------------------------------------------------------------------------- */
/*                                  API Calls                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------- Getting user categories ------------------------ */
const getUserCategories = async () => {
  try {
    const categories = await createGetRequest("/categories/");
    return categories;
  } catch (error) {
    // Todo remove
    console.log(error);
  }
};

/* --------------------------- Adding new category -------------------------- */
const saveCategory = async (category: Category) => {
  try {
    const response = await createPostRequest("/categories/", category);
    if (response.status == HttpStatusCode.Accepted) {
      //Todo
    }
  } catch (error) {
    //Todo show Toast
  }
};

/* --------------------------- Deleting a category -------------------------- */
const deleteCategory = async (id: string) => {
  try {
    const response = await createDeleteRequest(`/categories/${id}`);
    if (response.status === HttpStatusCode.Ok) {
      renderUserCategories(await getUserCategories());
    }
  } catch (error) {
    //Todo show Toast
  }
};

const updateCategory = async (category: Category) => {
  try {
    const response = await createPutRequest("/categories/", category);
    if (response.status == HttpStatusCode.Accepted) {
      //todo add toast
    }
  } catch (error) {
    //Todo Add Toast
  }
};
