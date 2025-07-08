import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./provider/auth.provider";
import { NotificationContextProvider } from "./provider/notification-context-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
