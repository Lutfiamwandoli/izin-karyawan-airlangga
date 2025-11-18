import { Outlet } from "react-router-dom";
import SidebarKaryawan from "../../components/SidebarKaryawan";
import NavbarKaryawan from "../../components/navbarKaryawan";

export default function KaryawanLayout() {
  return (
    <div className="flex">
      <SidebarKaryawan />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <NavbarKaryawan />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
