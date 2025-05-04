import { createBrowserRouter } from "react-router-dom";
import { routeNames } from "./routes";
import AppLayout from "@/layout/AppLayout";
import LoansPage from "@/pages/Loans/Loans";



const router = createBrowserRouter([
  {
    path: routeNames.initPage,
    element: <AppLayout />,
    children: [
      {
        path: routeNames.initPage
        , element: <LoansPage  ></LoansPage>
      }
    ],
  },
]);

export default router;
