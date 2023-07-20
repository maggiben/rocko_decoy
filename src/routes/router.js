import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import StartLoan from "../pages/Loan/StartLoan/StartLoan";

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
      ],
    },
  ]);
}
