import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";

export default function PengajuanIzin() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusIzin, setStatusIzin] = useState("");




  // Fetch data from backend
  const fetchData = async () => {
    
    try {
      const res = await api.get("api/izin/bawahan", {
        
        
      });
      
      setData(res.data);
      console.log("API DATA:", res.data);

    } catch (err) {
      console.error("Error load data izin:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    fetchData();
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`/api/izin/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
const openModal = (row) => {
  setSelected(row);
  setStatusIzin(row.status_izin); // <--- ini penting
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  setSelected(null);
};
const handleCetakk = (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token tidak ditemukan, login ulang.");
    return;
  }

  window.open(
    `http://localhost:5000/api/izin/cetak/${id}?token=${token}`,
    "_blank"
  );
};
const updateStatus = async () => {
  try {
    await api.put(`/api/izin/verifikasi/${selected.id}`, {
      status_izin: statusIzin,
    });

    alert("Status berhasil diperbarui!");
    fetchData();
    closeModal();
  } catch (error) {
    console.error("Update status error:", error);
    alert("Gagal memperbarui status");
  }
};

  const handleCetak = () => {
    window.print();
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Pengajuan Izin</h2>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Tampilkan
        </button>

        
      </div>

      {/* Limit */}
      <div className="flex items-center gap-2 mb-2">
        <span>Show</span>
        <select
          className="border p-1 rounded"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
        <span>entries</span>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">NO</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Periode</th>
            <th className="border p-2">Jenis</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, limit).map((row, index) => (
            <tr key={row.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{row.user?.nama}</td>
              <td className="border p-2">
                {row.tanggal_mulai.split("T")[0]} / {row.tanggal_selesai.split("T")[0]}
              </td>
              <td className="border p-2">{row.jenis_izin?.nama_izin}</td>
              <td className="border p-2">{row.status_izin}</td>
              <td className="border p-2 text-center flex gap-1 justify-center">
                <button
  className="btn px-3 py-1 bg-blue-500 text-white rounded"
  onClick={() => openModal(row)}
>
  Detail
</button>

                <button
                  className="btn px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(row.id)}
                >
                  <i className="fa fa-trash">Hapus</i>
                </button>
              </td>
            </tr>
            
          ))}
        </tbody>
        
      </table>
      {showModal && selected && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-[450px] rounded-lg shadow-lg relative">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center font-semibold text-lg">
        Detail Izin
      </div>

      {/* BODY */}
      <div className="p-4 text-sm space-y-3">

        {/* DATA KARYAWAN */}
        <div>
          <h3 className="font-bold text-center">DATA KARYAWAN</h3>
          <p><b>Nama :</b> {selected.user?.nama}</p>
          <p><b>NIK :</b> {selected.user?.nik}</p>
          <p><b>Status :</b> {selected.user?.status}</p>
          <p><b>Jabatan :</b> {selected.user?.jabatan?.nama_jabatan}</p>
          <p><b>Divisi :</b> {selected.user?.divisi}</p>
          <p><b>Telp/HP :</b> {selected.user?.no_hp}</p>
        </div>

        <hr />

        {/* IZIN DIMINTA */}
        <div>
          <h3 className="font-bold text-center">IZIN YANG DIMINTA</h3>
          <p><b>Jenis Izin :</b> {selected.jenis_izin?.nama_izin}</p>
          <p><b>Jumlah Hari :</b> {selected.jumlah_hari || "-"} Hari</p>
          <p><b>Tanggal :</b> {selected.tanggal_mulai.split("T")[0]} - {selected.tanggal_selesai.split("T")[0]}</p>
          <p><b>Keperluan :</b> {selected.keterangan || "-"}</p>
          <p><b>Bukti :</b> {selected.bukti || "Tidak Ada"}</p>
        </div>

        <hr />

        {/* STATUS */}
        {/* STATUS */}
<div>
  <p><b>Status Perizinan Saat Ini :</b> {selected.status_izin}</p>

  <label className="block mt-2 font-semibold">Ubah Status:</label>
  <select
    className="border p-2 rounded w-full"
    value={statusIzin}
    onChange={(e) => setStatusIzin(e.target.value)}
  >
    <option value="diajukan">Diajukan</option>
    <option value="disetujui">Disetujui</option>
    <option value="ditolak">Ditolak</option>
  </select>
</div>


      </div>

      {/* FOOTER BUTTON */}
     <div className="flex justify-between p-3 border-t">

  <button
    onClick={updateStatus}
    className="px-4 py-2 bg-green-600 text-white rounded"
  >
    Simpan Perubahan
  </button>

  <button
  className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
  onClick={() => handleCetakk(selected.id)}
>
  🖨 Cetak
</button>

  <button
    onClick={closeModal}
    className="px-4 py-2 bg-gray-400 text-white rounded"
  >
    Tutup
  </button>
</div>


    </div>
  </div>
)}

    </div>
  );
}
