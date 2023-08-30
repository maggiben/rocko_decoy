import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import StartLoan from "../pages/Loan/StartLoan/StartLoan";
import ReviewLoan from "../pages/Loan/ReviewLoan/ReviewLoan";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageLoan from "../pages/Loan/ManageLoan/ManageLoan";
import RepayLoan from "../pages/Loan/RepayLoan/RepayLoan";
import AddCollateral from "../pages/Loan/AddCollateral/AddCollateral";
import CoinbaseCallback from "../pages/CoinbaseCallback/CoinbaseCallback";
import DepositeCollateral from "../pages/Steps/DepositeCollateral/DepositCollateral";

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
          path: "/depositing-collateral",
          element: <DepositeCollateral />
        },
        {
          path: "/cb-callback",
          element: <CoinbaseCallback />,
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
        },
        {
          path: "/manage",
          element: <ManageLoan />,
        },
        {
          path: "/repay",
          element: <RepayLoan />,
        },
        {
          path: "/addcollateral",
          element: <AddCollateral />,
        },
        {
          path: '*',
          element: <div>404 Not Found</div>
        }
      ],
    },
  ]);
}
