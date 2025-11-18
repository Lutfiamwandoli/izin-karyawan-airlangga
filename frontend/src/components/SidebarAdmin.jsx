import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <div className="w-64 bg-[#11315B] text-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">ADMIN</h2>

      <ul className="space-y-3">
        <li>
          <Link to="/admin" className="block hover:text-green-300">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/karyawan" className="block hover:text-green-300">Data Karyawan</Link>
        </li>

        <li>
          <Link to="/admin/jabatan" className="block hover:text-green-300">Data Jabatan</Link>
        </li>
        <li>
          <Link to="/admin/atasan" className="block hover:text-green-300">Data Atasan</Link>
        </li>
      </ul>
    </div>
  );
}
