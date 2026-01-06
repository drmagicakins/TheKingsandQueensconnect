// src/app/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Threads from "../community/Threads";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
// src/app/router.jsx (additions)
import CreateThread from "../community/CreateThread";
import ThreadDetail from "../community/ThreadDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "threads", element: <Threads /> },
      { path: "threads/new", element: <CreateThread /> },
      { path: "threads/:id", element: <ThreadDetail /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute admin>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: "members", element: <Members /> },
          { path: "birthdays", element: <Birthdays /> },
          { path: "messages", element: <AdminMessages /> },
          { path: "ads", element: <AdminAds /> },
          { path: "policies", element: <Policies /> },
        ],
      },
    ],
  },
]);
