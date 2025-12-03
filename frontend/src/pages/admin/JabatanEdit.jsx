import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function JabatanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [atasanId, setAtasanId] = useState("");
  const [atasan, setAtasan] = useState([]);

  const loadData = async () => {
    const res = await api.get(`/api/admin/jabatan/${id}`);
    const a = await api.get("/api/admin/atasan");

    setNama(res.data.nama);
    setAtasanId(res.data.atasan_id || "");
    setAtasan(a.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/admin/jabatan/${id}`, {
      nama,
      atasan_id: atasanId ? Number(atasanId) : null,
    });

    navigate("/admin/jabatan");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Jabatan</h1>

      <form onSubmit={handleSubmit}>
        <label>Nama Jabatan</label>
        <input
          className="input input-bordered w-full mb-3"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

       

        <button className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
}
