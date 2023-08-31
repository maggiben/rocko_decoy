import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard_Previous";
import ManageLoan from "../pages/ManageLoan/ManageLoan";
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
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/manage",
          element: <ManageLoan />,
        },
        {
          path: "/cb-callback",
          element: <CoinbaseCallback />,
        },
        {
          path: '*',
          element: <div>404 Not Found</div>
        }
      ],
    },
  ]);
}
