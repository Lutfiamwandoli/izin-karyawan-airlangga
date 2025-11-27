import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilSaya() {
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    jabatan: "",
    atasan: "",
    role: "",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/izin/profil", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const d = res.data;

        setForm({
          nik: d.nik || "",
          nama: d.nama || "",
          jabatan: d.jabatan?.nama || "",
          atasan: d.jabatan?.atasan?.nama || "",
          role: d.role || "",
        });

        if (d.foto) {
          setPreview(`http://localhost:5000/uploads/foto/${d.foto}`);
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("nik", form.nik);
    formData.append("nama", form.nama);

    if (foto) formData.append("foto", foto);

    await axios.put("http://localhost:5000/api/izin/profil", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="p-5 bg-white rounded-md shadow">
      <h2 className="font-semibold text-lg mb-4">Profil Saya</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={preview || "https://via.placeholder.com/100"}
          className="w-24 h-24 object-cover rounded-full border"
        />
        <label className="mt-3 bg-gray-200 px-3 py-1 rounded cursor-pointer">
          Pilih Foto
          <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">

        <div>
          <label className="text-sm font-semibold">NIK</label>
          <input
            name="nik"
            value={form.nik}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Jabatan</label>
          <input
            name="jabatan"
            value={form.jabatan}
            className="border w-full px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Atasan</label>
          <input
            name="atasan"
            value={form.atasan}
            className="border w-full px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Role</label>
          <input
            name="role"
            value={form.role}
            className="border w-full px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Simpan
          </button>

          <button
            onClick={() => window.history.back()}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Batal
          </button>
        </div>

      </div>
    </div>
  );
}
