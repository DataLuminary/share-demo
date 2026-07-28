import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import { LocaleProvider } from "./i18n";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("#root missing");

createRoot(root).render(
  <LocaleProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/iframe" replace />} />
        <Route path="/:mode" element={<App />} />
        <Route path="*" element={<Navigate to="/iframe" replace />} />
      </Routes>
    </HashRouter>
  </LocaleProvider>,
);
