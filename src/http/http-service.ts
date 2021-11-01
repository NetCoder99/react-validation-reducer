import axios from "axios";
import { getAccessToken } from "../lib/sessionStorage";
import { AuthToken } from "../models/AuthToken";
//import http from "./http-common";

const lclInstance = axios.create({
  baseURL: "http://127.0.0.1:8181",
  headers: {
    "Content-type": "application/json"
  }
});

lclInstance.interceptors.request.use((config) => {
  const authToken = getAccessToken() || '';
  console.log('axios.request.authToken' + authToken);
  config.headers!.queryKey = authToken;
  return config;
}, (error) => {
  return Promise.reject(error);
});

//http://127.0.0.1:8181/login
const login = (userId: string, passWd: string) => {
  console.log('http.login');

// curl --location --request GET 'http://127.0.0.1:8181/login' \
//   --header 'apiKey: test1' \
//   --header 'headerKey: test1' \
//   --header 'Content-Type: text/plain' \
//   --data-raw '{
//     "userName": "test1",
//     "passWord": "test2"
// }'
//{headers : {'X-Requested-With': 'XMLHttpRequest'} }
  const headers = {
    'Content-Type': 'text/plain',
    'apiKey'      : 'test1',
    'headerKey'   : 'test1'
  }
  const data= {
    'userName'    : userId,
    'passWord'    : passWd,
  }
  return lclInstance.post("/login", data, {headers: headers});
};



const getAllQuotes = () => {
  return lclInstance.get("/quotes");
};

const HttpService = {
  login,
  getAllQuotes,
};

export default HttpService;