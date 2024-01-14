import Budget from "../interfaces/Budget";
import Category from "../interfaces/Category";
import Expense from "../interfaces/Expense";
import Income from "../interfaces/Income";
import User from "../interfaces/User";
import http from "./HttpClient";

const createPutRequest = async (
  url: string,
  body: Category | User | Budget | Income | Expense
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const request = await http.put(
      url,
      { ...body },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    return request;
  } catch (error) {
    throw error;
  }
};

export default createPutRequest;
