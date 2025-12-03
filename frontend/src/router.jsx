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
import Dashboard from "./pages/karyawan/Dashboard";
import KaryawanLayout from "./pages/karyawan/KaryawanLayout";
import AjukanIzin from "./pages/karyawan/AjukanIzin";
import RiwayatIzin from "./pages/karyawan/RiwayatIzin";
import UbahPassword from "./pages/karyawan/UbahPassword";
import ProfilSaya from "./pages/karyawan/Profil";
import AjukanIzinAtasan from "./pages/atasan/AjukanIzinAtasan";
import DashboardAtasan from "./pages/atasan/DashboardAtasan";
import RiwayatIzinAtasan from "./pages/atasan/RiwayatIzinAtasan";
import UbahPasswordAtasan from "./pages/atasan/UbahPasswordAtasan";
import ProfilSayaAtasan from "./pages/atasan/ProfilAtasan";
import PengajuanIzin from "./pages/atasan/PengajuanIzin";
import AtasanLayout from "./pages/atasan/AtasanLayout";
import LoginAja from "./pages/HalamanLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginAja />,
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
      { path: "izin", element: <RiwayatIzin/> },
      { path: "password", element:<UbahPassword />},
      { path: "profil", element: <ProfilSaya/>}
            
    ],
  },
  {
    path: "/atasan",
    element: <AtasanLayout />,
    children: [
      { index: true, element: <DashboardAtasan/> },
      { path: "izin/ajukan", element: <AjukanIzinAtasan/> },
      { path: "izin", element: <RiwayatIzinAtasan/> },
      { path: "password", element:<UbahPasswordAtasan />},
      { path: "profil", element: <ProfilSayaAtasan/>},
      { path: "pengajuan", element: <PengajuanIzin/>}
            
    ],
  },
  
  
]);

export default router;
