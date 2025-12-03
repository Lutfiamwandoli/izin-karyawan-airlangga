import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function JabatanAdd() {
  const [nama, setNama] = useState("");
  const [atasanId, setAtasanId] = useState(""); // <- tambahan
  const [atasanList, setAtasanList] = useState([]);

  const navigate = useNavigate();

  // Load daftar atasan
  const loadAtasan = async () => {
    try {
      const res = await api.get("/api/admin/atasan");
      setAtasanList(res.data);
    } catch (err) {
      console.error("Gagal load atasan:", err);
    }
  };

  useEffect(() => {
    loadAtasan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/admin/jabatan", {
        nama: nama,
        atasan_id: atasanId ? Number(atasanId) : null,
      });

      navigate("/admin/jabatan");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tambah Jabatan</h2>

      <form onSubmit={handleSubmit}>
        {/* Nama Jabatan */}
        <label>Nama Jabatan</label>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />


        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
