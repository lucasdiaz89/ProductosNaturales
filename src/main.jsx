import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { firestoneInit } from "./firebase/config";

firestoneInit();
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
