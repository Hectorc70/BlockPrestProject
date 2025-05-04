import { createBrowserRouter } from "react-router-dom";
import { routeNames } from "./routes";
import AppLayout from "@/layout/AppLayout";
import LoansPage from "@/pages/Loans/Loans";
import HomePage from "@/pages/Home/Home";



const router = createBrowserRouter([
  {
    path: routeNames.initPage,
    element: <AppLayout />,
    children: [
      {
        path: routeNames.initPage
        , element: <HomePage  ></HomePage>
      },
      {
        path: routeNames.loans
        , element: <LoansPage  ></LoansPage>
      }
    ],
  },
]);

export default router;
