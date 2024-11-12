import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Repo from "./components/Repo";
import Index from "./components/Index";
import client from "./services/connection";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "repos/:repoId",
        element: <Repo />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
