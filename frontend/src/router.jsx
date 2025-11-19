import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "./pages/admin/AdminLayouts";
import AdminDashboard from "./pages/admin/AdminDashboard";

import KaryawanList from "./pages/admin/KaryawanList";
import KaryawanAdd from "./pages/admin/KaryawanAdd";
import KaryawanEdit from "./pages/admin/KaryawanEdit";

import JabatanList from "./pages/admin/JabatanList";
import JabatanAdd from "./pages/admin/JabatanAdd";
import JabatanEdit from "./pages/admin/JabatanEdit";

import AtasanList from "./pages/admin/AtasanList";
import AtasanAdd from "./pages/admin/AtasanAdd";
import AtasanEdit from "./pages/admin/AtasanEdit";
import Login from "./pages/login";
import Dashboard from "./pages/karyawan/Dashboard";
import KaryawanLayout from "./pages/karyawan/KaryawanLayout";
import AjukanIzin from "./pages/karyawan/AjukanIzin";
import RiwayatIzin from "./pages/karyawan/RiwayatIzin";

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

      // ==== Karyawan ====
      { path: "karyawan", element: <KaryawanList /> },
      { path: "karyawan/add", element: <KaryawanAdd /> },
      { path: "karyawan/edit/:id", element:<KaryawanEdit />},

      // ==== Jabatan ====
      { path: "jabatan", element: <JabatanList /> },
      { path: "jabatan/add", element: <JabatanAdd /> },
      { path: "jabatan/edit/:id", element:<JabatanEdit />},

      // ==== Atasan ====
      { path: "atasan", element: <AtasanList /> },
      { path: "atasan/add", element: <AtasanAdd /> },
      { path: "atasan/edit/:id", element:<AtasanEdit />},
    ],
  },
  {
    path: "/karyawan",
    element: <KaryawanLayout />,
    children: [
      { index: true, element: <Dashboard/> },
      { path: "izin/ajukan", element: <AjukanIzin/> },
      { path: "izin", element: <RiwayatIzin/> }
            
    ],
  },
  
]);

export default router;
