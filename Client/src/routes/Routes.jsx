import {
    createBrowserRouter
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddAssignment from "../pages/AddAssignment";
import MyPostedAssignments from "../pages/MyPostedAssignments";
import MySubmittedAssignments from "../pages/MySubmittedAssignments";
import PendingAssignments from "../pages/PendingAssignments";
import AllAssignments from "../pages/AllAssignments";
import PrivateRoutes from "./PrivateRoutes";
import UpdateAssignment from "../pages/UpdateAssignment";
import AssignmentDetails from "../components/AssignmentDetails";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/all-assignments",
            element:<AllAssignments></AllAssignments>
        },
        {
            path:"/assignment/:id",
            element:<PrivateRoutes><AssignmentDetails></AssignmentDetails></PrivateRoutes>
        },
        {
            path:"/add-assignments",
            element:<PrivateRoutes><AddAssignment></AddAssignment></PrivateRoutes>
        },
        {
            path:"/my-posted-assignments",
            element:<PrivateRoutes><MyPostedAssignments></MyPostedAssignments></PrivateRoutes>
        },
        {
            path:"/update/:id",
            element:<PrivateRoutes><UpdateAssignment></UpdateAssignment></PrivateRoutes>
        },
        {
            path:"/my-submitted-assignments/:email",
            element:<PrivateRoutes><MySubmittedAssignments></MySubmittedAssignments></PrivateRoutes>
        },
        {
            path:"/my-pending-assignments/:email",
            element:<PrivateRoutes><PendingAssignments></PendingAssignments></PrivateRoutes>
        }
      ]
    },
    {
      path:"/login",
      element:<Login></Login>
  },
  {
      path:"/register",
      element:<Registration></Registration>
  }
  ]);

  export default router