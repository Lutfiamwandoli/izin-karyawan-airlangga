import { FiBell, FiUser } from "react-icons/fi";

export default function NavbarKaryawan() {
  return (
    <div className="w-full bg-blue-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard Izin Karyawan</h1>

      <div className="flex items-center gap-6">
        <FiBell size={20} className="cursor-pointer" />
        <div className="bg-white text-blue-900 rounded-full p-2">
          <FiUser size={18} />
        </div>
      </div>
    </div>
  );
}
