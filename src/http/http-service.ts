import http from "./http-common";

const getAllQuotes = () => {
  return http.get("/quotes");
};

const HttpService = {
  getAllQuotes,
};

export default HttpService;