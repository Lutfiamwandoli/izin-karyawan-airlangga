import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function RiwayatIzin() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);


  const [filter, setFilter] = useState({
    mulai: "",
    selesai: "",
  });

  // AMBIL DATA RIWAYAT (izin saya)
  useEffect(() => {
    api.get("api/izin/saya")
      .then(res => {
        setData(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const applyFilter = () => {
    if (!filter.mulai || !filter.selesai) {
      setFiltered(data);
      return;
    }

    const start = new Date(filter.mulai);
    const end = new Date(filter.selesai);

    const result = data.filter((item) => {
      const tglMulai = new Date(item.tanggal_mulai);
      return tglMulai >= start && tglMulai <= end;
    });

    setFiltered(result);
  };
const openDetail = (item) => {
  setSelected(item);
};

const closeDetail = () => {
  setSelected(null);
};

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Riwayat Izin</h1>

      {/* FILTER */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={filter.mulai}
          onChange={(e) => setFilter({ ...filter, mulai: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={filter.selesai}
          onChange={(e) => setFilter({ ...filter, selesai: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={applyFilter}
        >
          Tampilkan
        </button>

        <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <span>🖨</span> Cetak
        </button>
      </div>

      {/* TABEL */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 w-10">NO</th>
            <th className="border p-2">Periode</th>
            <th className="border p-2">Jenis</th>
            <th className="border p-2">Status</th>
            <th className="border p-2 w-20">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-500">
                Tidak ada data
              </td>
            </tr>
          ) : (
            filtered.map((item, i) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{i + 1}</td>

                <td className="border p-2 text-center">
                  {item.tanggal_mulai?.slice(0, 10)} / {item.tanggal_selesai?.slice(0, 10)}
                </td>

                <td className="border p-2 text-center">
                  {item.jenis_izin?.nama_izin}
                </td>

                <td className="border p-2 text-center">
                  {item.status_izin}
                </td>

                <td className="border p-2 text-center">
                    <button className="btn bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => openDetail(item)}
                    >
                    Detail
                    </button>
                </td>
              </tr>
            ))
          )}
           {selected && (
            
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg border">

      {/* HEADER */}
      <div className="bg-blue-600 text-white text-center py-3 rounded-t-lg text-xl font-semibold">
        Detail Izin
      </div>

      <div className="p-6">

        {/* DATA KARYAWAN */}
        <h2 className="text-center font-semibold mb-2">DATA KARYAWAN</h2>

        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <div>Nama</div><div>: {selected.user?.nama}</div>
          <div>NIK</div><div>: {selected.user?.nik}</div>
          <div>Status</div><div>: {selected.user?.role}</div>
          <div>Divisi</div><div>: {selected.user?.divisi}</div>
          <div>TMM/TMT</div><div>: {selected.user?.tmm_tmt?.slice(0, 10)}</div>
          <div>Jabatan</div><div>: {selected.user?.jabatan?.nama}</div>
          <div>Telp/HP</div><div>: {selected.user?.telp}</div>
        </div>

        {/* GARIS */}
        <div className="my-4 border-b"></div>

        {/* IJIN YANG DIMINTA */}
        <h2 className="text-center font-semibold mb-2">IJIN YANG DIMINTA</h2>

        <div className="text-sm leading-relaxed">
          <p><b>Jenis Ijin</b> : {selected.jenis_izin?.nama_izin}</p>

          <p className="mt-2 mb-1"><b>Keterangan :</b></p>

          <div className="ml-6">
            <p>1. Jumlah Hari Ijin : <b>{selected.jumlah_hari} Hari</b> 
              &nbsp; (Tgl : {selected.tanggal_mulai?.slice(0,10)} - {selected.tanggal_selesai?.slice(0,10)})
            </p>

            <p>2. Tanggal Masuk Kembali : {selected.tanggal_masuk_kembali?.slice(0,10)}</p>

            <p>3. Keperluan : {selected.keperluan}</p>

            <p>4. Bukti yang dilampirkan : 
              {selected.bukti ? selected.bukti : "Tidak ada"}
            </p>
          </div>
        </div>

        {/* TTD */}
        <div className="mt-6 border-t pt-4 text-center text-sm">
          <div className="grid grid-cols-3">
            <div>Kepala Divisi</div>
            <div>HRD Divisi</div>
            <div>Atasan Langsung</div>

            <div className="mt-10 font-semibold">Muhammad Yani, S.Kom., M.T.I.</div>
            <div className="mt-10 font-semibold">Fardiyansyah Ibrahim, S.Kom</div>
            <div className="mt-10 font-semibold">{selected.user.jabatan.atasan?.nama}</div>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="flex justify-center gap-4 p-4 border-t">
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          🖨 Cetak
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={closeDetail}
        >
          Tutup
        </button>
      </div>

    </div>
  </div>
)}
        </tbody>
      </table>
     

    </div>
    
  );
}
