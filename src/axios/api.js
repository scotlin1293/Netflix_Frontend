import axios from "axios";

let BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
BASE_URL = "https://backend-netflix-2-ht.herokuapp.com";

async function request(endpoint, data = {}, method = "get", token = "") {
  console.debug("API Call:", endpoint, data, method);

  const url = `${BASE_URL}/${endpoint}`;
  const headers = {};
  if (token != "") headers = { Authorization: `Bearer ${token}` };
  const params = method === "get" ? data : {};

  try {
    return (await axios({ url, method, data, params, headers })).data;
  } catch (err) {
    console.error("API Error:", err.response);
    let message = err.response.data.error.message;
    throw Array.isArray(message) ? message : [message];
  }
}

export default request;
