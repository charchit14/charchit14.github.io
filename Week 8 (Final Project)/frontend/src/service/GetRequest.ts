import { HttpStatusCode } from "axios";
import http from "./HttpClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createGetRequest = async (url: string) => {
  const response = await http.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  if (response.status === HttpStatusCode.Ok) {
    const data = response.data.result;
    return data;
  }
};

export default createGetRequest;
