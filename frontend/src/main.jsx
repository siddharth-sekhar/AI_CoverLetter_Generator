import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App";
import AuthenticationPage from './AuthenticationPage'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<AuthenticationPage/>} />
        <Route path="/*" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
