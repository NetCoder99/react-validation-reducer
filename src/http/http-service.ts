import axios from "axios";
import { getAccessToken } from "../lib/sessionStorage";

//import { AuthToken } from "../models/AuthToken";
//import http from "./http-common";

// curl --location --request GET 'http://127.0.0.1:8181/login' \
//   --header 'apiKey: test1' \
//   --header 'headerKey: test1' \
//   --header 'Content-Type: text/plain' \
//   --data-raw '{
//     "userName": "test1",
//     "passWord": "test2"
// }'
//{headers : {'X-Requested-With': 'XMLHttpRequest'} }

const BASE_URL = "http://127.0.0.1:8181";

const lclInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

lclInstance.interceptors.request.use((config) => {
  const authToken = getAccessToken() || '';
  console.log('axios.request.authToken' + authToken);
  const headers = {
    'Content-Type': 'application/json',
    'apiKey'      : 'test1',
    'headerKey'   : 'test2',
    'queryKey'    : authToken    
  }
  config.headers = headers;
  //config.headers!.queryKey = authToken;
  return config;
}, (error) => {
  return Promise.reject(error);
});

const login = (userId: string, passWd: string) => {
  console.log('http.login');
  const data= {
    'userName'    : userId,
    'passWord'    : passWd,
  }
  return lclInstance.post("/login", data);
};

const getAllQuotes = () => {
  return lclInstance.get("/quotes");
};

const getMarketCodes = () => {
  return lclInstance.get("/getMarketCodes");
};


const HttpService = {
  login,
  getAllQuotes,
  getMarketCodes,
};

export default HttpService;