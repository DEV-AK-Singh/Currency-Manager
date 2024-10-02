import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UsersList from "./components/UsersList.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionPage from "./components/TransactionPage.jsx";
import TransactionList from "./components/TransactionList.jsx";
import TransactionDetails from "./components/TransactionDetails.jsx";
import Root from "./pages/Root.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard",
            element: <UserProfile />,
          },
          {
            path: "/dashboard/profile",
            element: <UserProfile />,
          },
          {
            path: "/dashboard/contact",
            element: <UsersList />,
          },
          {
            path: "/dashboard/pay",
            children: [
              {
                path: "/dashboard/pay",
                element: <TransactionForm />,
              },
              {
                path: "/dashboard/pay/:upiId",
                element: <TransactionForm />,
              },
              {
                path: "/dashboard/pay/payment",
                element: <TransactionPage />,
              },
            ]
          },
          {
            path: "/dashboard/history",
            children: [
              {
                path: "/dashboard/history",
                element: <TransactionList />,
              },
              {
                path: "/dashboard/history/:transactionId",
                element: <TransactionDetails />,
              },
            ],
          },
        ],
      },
    ],
    errorElement: <p>Oops! There was an error.</p>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
