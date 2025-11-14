import SidebarAdmin from "../../components/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
