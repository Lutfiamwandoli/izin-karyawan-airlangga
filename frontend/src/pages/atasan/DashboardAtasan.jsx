import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function DashboardAtasan() {
  const [data, setData] = useState([]);
  const [jenis, setJenis] = useState([]);

  const [stats, setStats] = useState({
    totalSaya: 0,
    totalBawahan: 0,
    disetujui: 0,
    ditolak: 0,
    belum: 0,
  });

  useEffect(() => {
    // --- Ambil izin milik atasan ---
    api.get("api/izin/saya").then((res) => {
      setData(res.data);

      setStats((prev) => ({
        ...prev,
        totalSaya: res.data.length,
        disetujui: res.data.filter(i => i.status_izin === "disetujui").length,
        ditolak: res.data.filter(i => i.status_izin === "ditolak").length,
        belum: res.data.filter(i => i.status_izin === "diajukan").length,
      }));
    });

    // --- Ambil total izin bawahan ---
    api.get("api/izin/bawahan").then((res) => {
      setStats((prev) => ({
        ...prev,
        totalBawahan: res.data.length,
      }));
    });

    // --- Jenis izin ---
    api.get("api/izin/jenis-izin").then((res) => {
      setJenis(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* BOX STATISTIK */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Box title="Jumlah Izin" value={stats.totalSaya} />
        <Box title="Jumlah Pengajuan" value={stats.totalBawahan} />
        <Box title="Izin Disetujui" value={stats.disetujui} />
        <Box title="Belum Disetujui" value={stats.belum} />
      </div>

      <h2 className="mt-8 text-lg font-semibold">Riwayat Izin Saya</h2>
      <table className="mt-3 w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">NO</th>
            <th className="p-2 border">Jenis</th>
            <th className="p-2 border">Periode</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, idx) => (
            <tr key={i.id} className="text-center">
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{i.jenis_izin.nama_izin}</td>
              <td className="border p-2">
                {i.tanggal_mulai?.slice(0, 10)} / {i.tanggal_selesai?.slice(0, 10)}
              </td>
              <td className="border p-2 capitalize">{i.status_izin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-blue-600 text-white rounded-xl p-5 text-center shadow">
      <div className="text-4xl font-bold">{value}</div>
      <div>{title}</div>
    </div>
  );
}
