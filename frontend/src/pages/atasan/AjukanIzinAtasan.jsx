import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AjukanIzinAtasan() {
  const [jenis, setJenis] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    jabatan: "",
    tmt: "",
    jenis_izin_id: "",
    jumlah_hari: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    tanggal_masuk_kembali: "",
    keperluan: "",
  });

  const [bukti, setBukti] = useState(null);

useEffect(() => {
  api.get("api/izin/userbytoken")
    .then(res => {
      const u = res.data; 

      setForm(prev => ({
        ...prev,
        nama: u?.nama || "",
        nik: u?.nik || "",
        jabatan: u?.jabatan?.nama || "",
        role: u?.role?.role || "",
        tmt: u?.tmm_tmt?.slice(0, 10) || "",
      }));
    })
    .catch(err => console.error(err));
}, []);



 
  useEffect(() => {
    api.get("api/izin/jenis-izin").then((res) => setJenis(res.data));
  }, []);

  useEffect(() => {
    if (form.tanggal_mulai && form.tanggal_selesai) {
      const start = new Date(form.tanggal_mulai);
      const end = new Date(form.tanggal_selesai);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (diff > 0) {
        const kembali = new Date(end);
        kembali.setDate(kembali.getDate() + 1);

        setForm((prev) => ({
          ...prev,
          jumlah_hari: diff,
          tanggal_masuk_kembali: kembali.toISOString().slice(0, 10),
        }));
      }
    }
  }, [form.tanggal_mulai, form.tanggal_selesai]);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (bukti) fd.append("bukti", bukti);

    const res = await api.post("api/izin/ajukan", fd);
    console.log(res);
    
    alert(res.data.message);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Ajukan Izin</h1>

      <form onSubmit={submit} className="space-y-4">

        {/* GRID 3 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Nama */}
          <div>
            <label className="font-medium">Nama</label>
            <input
              className="w-full border rounded p-2 bg-gray-100"
              value={form.nama}
              readOnly
            />
          </div>

          {/* NIK */}
          <div>
            <label className="font-medium">NIK</label>
            <input
              className="w-full border rounded p-2 bg-gray-100"
              value={form.nik}
              readOnly
            />
          </div>

          <div></div>

          {/* Jabatan */}
          <div>
            <label className="font-medium">Jabatan</label>
            <input
              className="w-full border rounded p-2 bg-gray-100"
              value={form.jabatan}
              readOnly
            />
          </div>



          {/* TMT */}
          <div>
            <label className="font-medium">TMT / TMT</label>
            <input
              type="date"
              className="w-full border rounded p-2 bg-gray-100"
              value={form.tmt}
              readOnly
            />
          </div>
        </div>

          {/* Jenis Izin */}
          <div>
            <label className="font-medium">Jenis Izin</label>
            <select
              className="w-full border rounded p-2"
              value={form.jenis_izin_id}
              onChange={(e) =>
                setForm({ ...form, jenis_izin_id: e.target.value })
              }
            >
              <option value="">Pilih jenis izin</option>
              {jenis.map(j => (
                <option key={j.id} value={j.id}>
                  {j.nama_izin}
                </option>
              ))}
            </select>
          </div>
          {/* Jumlah Hari
          <div>
            <label className="font-medium">Jumlah Hari</label>
            <input
              className="w-full border rounded p-2 bg-gray-100"
              value={form.jumlah_hari}
              readOnly
            />
          </div> */}
        

        {/* Tanggal Mulai */}
        <div>
          <label className="font-medium">Tanggal Mulai</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.tanggal_mulai}
            onChange={(e) => setForm({ ...form, tanggal_mulai: e.target.value })}
          />
        </div>

        {/* Tanggal Selesai */}
        <div>
          <label className="font-medium">Tanggal Selesai</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.tanggal_selesai}
            onChange={(e) => setForm({ ...form, tanggal_selesai: e.target.value })}
          />
        </div>

        {/* Tanggal Masuk Kembali */}
        <div>
          <label className="font-medium">Tanggal Masuk Kembali</label>
          <input
            type="date"
            className="w-full border rounded p-2 bg-gray-100"
            value={form.tanggal_masuk_kembali}
            readOnly
          />
        </div>

        {/* Keperluan */}
        <div>
          <label className="font-medium">Keperluan</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={form.keperluan}
            onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
          />
        </div>

        {/* Bukti */}
        <div>
          <label className="font-medium">Bukti (Upload)</label>
          <input
            type="file"
            className="w-full border rounded p-2"
            onChange={(e) => setBukti(e.target.files[0])}
          />
        </div>

        {/* BUTTON */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Kirim Pengajuan
          </button>

          <button
            type="button"
            className="border px-4 py-2 rounded text-blue-600 hover:bg-blue-50"
          >
            Preview Cetak
          </button>
        </div>
      </form>
    </div>
  );
}
