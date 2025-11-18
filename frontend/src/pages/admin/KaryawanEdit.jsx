import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function KaryawanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    jabatan_id: "",
    divisi: "",
    status: "",
    telp: "",
    tmm_tmt: "",
  });

  const [jabatan, setJabatan] = useState([]);

  const loadData = async () => {
    const res = await api.get(`/api/admin/karyawan/${id}`);
    const j = await api.get("/api/admin/jabatan");

    setForm({
      nik: res.data.nik,
      nama: res.data.nama,
      jabatan_id: res.data.jabatan_id || "",
      divisi: res.data.divisi || "",
      status: res.data.status || "",
      telp: res.data.telp || "",
      tmm_tmt: res.data.tmm_tmt?.substring(0, 10) || "",
    });

    setJabatan(j.data);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/admin/karyawan/${id}`, form);
    navigate("/admin/karyawan");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Karyawan</h1>

      <form onSubmit={handleSubmit}>
        <label>NIK</label>
        <input
          name="nik"
          className="input input-bordered w-full mb-3"
          value={form.nik}
          onChange={handleChange}
        />

        <label>Nama</label>
        <input
          name="nama"
          className="input input-bordered w-full mb-3"
          value={form.nama}
          onChange={handleChange}
        />

        <label>Jabatan</label>
        <select
          name="jabatan_id"
          className="select select-bordered w-full mb-3"
          value={form.jabatan_id}
          onChange={handleChange}
        >
          <option value="">-- Pilih Jabatan --</option>
          {jabatan.map((j) => (
            <option key={j.id} value={j.id}>
              {j.nama}
            </option>
          ))}
        </select>

        <label>Divisi</label>
        <input
          name="divisi"
          className="input input-bordered w-full mb-3"
          value={form.divisi}
          onChange={handleChange}
        />

        <label>Status</label>
        <input
          name="status"
          className="input input-bordered w-full mb-3"
          value={form.status}
          onChange={handleChange}
        />

        <label>No Telepon</label>
        <input
          name="telp"
          className="input input-bordered w-full mb-3"
          value={form.telp}
          onChange={handleChange}
        />

        <label>TMT</label>
        <input
          type="date"
          name="tmm_tmt"
          className="input input-bordered w-full mb-3"
          value={form.tmm_tmt}
          onChange={handleChange}
        />

        <button className="btn btn-primary mt-3">Simpan Perubahan</button>
      </form>
    </div>
  );
}
