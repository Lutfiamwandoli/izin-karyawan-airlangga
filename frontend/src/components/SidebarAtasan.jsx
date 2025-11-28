import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiFileText, FiKey, FiPlusCircle, FiHome } from "react-icons/fi";

export default function SidebarAtasan() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token login
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigate("/");
  };
  

  return (
    <div className="w-64 bg-white shadow-md h-screen px-6 py-5 flex flex-col">
      <h2 className="font-bold text-lg mb-6">SMK TI AIRLANGGA</h2>

      <nav className="flex flex-col gap-4 text-[15px]">
        <Link to="/atasan" className="flex gap-3 items-center hover:text-blue-700">
          <FiHome /> Dashboard
        </Link>

        <Link to="/atasan/izin/ajukan" className="flex gap-3 items-center hover:text-blue-700">
          <FiPlusCircle /> Ajukan Izin
        </Link>

        <Link to="/atasan/izin" className="flex gap-3 items-center hover:text-blue-700">
          <FiFileText /> Riwayat Izin
        </Link>

        <Link to="/atasan/pengajuan" className="flex gap-3 items-center hover:text-blue-700">
          <FiFileText /> Pengajuan Izin
        </Link>

        <Link to="/atasan/password" className="flex gap-3 items-center hover:text-blue-700">
          <FiKey /> Ubah Password
        </Link>
      </nav>

      <div className="btn mt-auto">
        <button
          onClick={handleLogout}
          className="flex gap-3 items-center text-red-600 hover:text-red-800"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
