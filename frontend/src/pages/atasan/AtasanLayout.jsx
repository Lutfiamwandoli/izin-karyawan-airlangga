import { Outlet } from "react-router-dom";
import SidebarAtasan from "../../components/SidebarAtasan";
import NavbarAtasan from "../../components/navbarAtasan";

export default function AtasanLayout() {
  return (
    <div className="flex">
      <SidebarAtasan />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <NavbarAtasan />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
