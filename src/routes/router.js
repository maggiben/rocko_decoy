import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import Rocko from "../pages/Rocko/Rocko";
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
          path: "/rocko",
          element: <Rocko />,
        },
      ],
    },
  ]);
}
