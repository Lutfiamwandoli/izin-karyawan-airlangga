import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

import AdminLayout from "./pages/admin/AdminLayouts";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KaryawanList from "./pages/admin/KaryawanList";
import KaryawanAdd from "./pages/admin/KaryawanAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "karyawan", element: <KaryawanList /> },
      { path: "karyawan/add", element: <KaryawanAdd /> },
    ],
  },
]);

export default router;
