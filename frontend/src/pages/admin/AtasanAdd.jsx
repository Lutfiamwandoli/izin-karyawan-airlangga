import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AtasanAdd() {
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/admin/atasan", {
        nama: nama,
      });

      navigate("/admin/atasan");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tambah Atasan</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nama Atasan</label>

        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Masukkan nama atasan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          type="submit"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
