import { FiBell, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";

export default function NavbarAtasan() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-blue-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard Izin Karyawan</h1>

      <div className="flex items-center gap-6">
        <NotificationDropdown />


        <div
          className="bg-white text-blue-900 rounded-full p-2 cursor-pointer"
          onClick={() => navigate("/atasan/profil")}
        >
          <FiUser size={18} />
        </div>
      </div>
    </div>
  );
}
