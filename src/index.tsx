import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/authContext";

import "./index.css";
import App from "./App";
// eslint-disable-next-line    
import { makeServer } from "./server";
import SlctProvider from "./store/slctContext";
//makeServer({ environment: "dev" })

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SlctProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SlctProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
