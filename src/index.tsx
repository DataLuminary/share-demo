import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("#root missing");

createRoot(root).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
