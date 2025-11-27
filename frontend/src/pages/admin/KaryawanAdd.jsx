import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../utils/api";

export default function AddKaryawan() {
  const [jabatan, setJabatan] = useState([]);
  const [atasan, setAtasan] = useState([]);
  const roles = ["admin", "karyawan", "hrd", "atasan"]; // enum

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    jabatan_id: "",
    atasan_id: "",
    divisi: "",
    status: "",
    telp: "",
    tmm_tmt: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    api.get("api/admin/jabatan").then((res) => {
      setJabatan(res.data);
    });

    api.get("api/admin/atasan").then((res) => {
      setAtasan(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    jabatan_id: form.jabatan_id ? parseInt(form.jabatan_id) : null,
    atasan_id: form.atasan_id ? parseInt(form.atasan_id) : null,
  };

  await api.post("api/admin/karyawan", payload);

  alert("Karyawan berhasil ditambahkan!");

  // 🔥 Reset form
  setForm({
    nik: "",
    nama: "",
    jabatan_id: "",
    atasan_id: "",
    divisi: "",
    status: "",
    telp: "",
    tmm_tmt: "",
    role: "",
    password: "",
  });
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="nik"
        placeholder="NIK"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        type="text"
        name="nama"
        placeholder="Nama"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      {/* select jabatan dari database */}
      <select
        name="jabatan_id"
        className="border p-2 w-full"
        onChange={handleChange}
      >
        <option value="">-- Pilih Jabatan --</option>
        {jabatan.map((j) => (
          <option key={j.id} value={j.id}>
            {j.nama}
          </option>
        ))}
      </select>

      {/* select atasan dari database */}
      <select
        name="atasan_id"
        className="border p-2 w-full"
        onChange={handleChange}
      >
        <option value="">-- Pilih Atasan --</option>
        {atasan.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nama}
          </option>
        ))}
      </select>

      {/* select role enum */}
      <select
        name="role"
        className="border p-2 w-full"
        onChange={handleChange}
      >
        <option value="">-- Pilih Role --</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="status"
        placeholder="Status"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        type="text"
        name="telp"
        placeholder="Nomor Telepon"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        type="date"
        name="tmm_tmt"
        className="border p-2 w-full"
        onChange={handleChange}
      />
  
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <button
        className="btn bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Simpan
      </button>
    </form>
  );
}
