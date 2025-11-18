import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function AtasanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");

  const loadData = async () => {
    const res = await api.get(`/api/admin/atasan/${id}`);
    setNama(res.data.nama);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/admin/atasan/${id}`, { nama });
    navigate("/admin/atasan");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Atasan</h1>

      <form onSubmit={handleSubmit}>
        <label>Nama Atasan</label>
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
