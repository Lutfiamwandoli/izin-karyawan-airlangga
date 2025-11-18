import { Link } from "react-router-dom";
import { FiLogOut, FiFileText, FiKey, FiPlusCircle, FiHome } from "react-icons/fi";

export default function SidebarKaryawan() {
  return (
    <div className="w-64 bg-white shadow-md h-screen px-6 py-5 flex flex-col">
      <h2 className="font-bold text-lg mb-6">YAYASAN AIRLANGGA</h2>

      <nav className="flex flex-col gap-4 text-[15px]">
        <Link to="/karyawan" className="flex gap-3 items-center hover:text-blue-700">
          <FiHome /> Dashboard
        </Link>

        <Link to="/karyawan/izin/ajukan" className="flex gap-3 items-center hover:text-blue-700">
          <FiPlusCircle /> Ajukan Izin
        </Link>

        <Link to="/karyawan/izin" className="flex gap-3 items-center hover:text-blue-700">
          <FiFileText /> Riwayat Izin
        </Link>

        <Link to="/karyawan/password" className="flex gap-3 items-center hover:text-blue-700">
          <FiKey /> Ubah Password
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="flex gap-3 items-center text-red-600 hover:text-red-800">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
