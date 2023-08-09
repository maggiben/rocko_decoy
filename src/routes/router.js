import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import StartLoan from "../pages/Loan/StartLoan/StartLoan";
import ReviewLoan from "../pages/Loan/ReviewLoan/ReviewLoan";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/startloan",
          element: <StartLoan />,
        },
        {
          path: "/reviewloan",
          element: <ReviewLoan />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ],
    },
  ]);
}
