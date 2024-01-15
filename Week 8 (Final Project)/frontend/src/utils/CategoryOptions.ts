import { HttpStatusCode } from "axios";
import http from "../service/HttpClient";
import Category from "../interfaces/Category";

const createCategoryOptions = async (select: HTMLElement) => {
  const userCategories = await http.get("/categories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  if (userCategories.status == HttpStatusCode.Ok) {
    const data = userCategories.data.result;
    select.innerHTML = "";
    data.forEach((category: Category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.title;
      select.appendChild(option);
    });
  }
};
export default createCategoryOptions;
