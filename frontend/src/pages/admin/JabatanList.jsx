import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

export default function JabatanList() {
  const [jabatan, setJabatan] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/api/admin/jabatan");
      setJabatan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Data Jabatan</h1>

        <Link to="/admin/jabatan/add" className="btn btn-primary">
          + Tambah Jabatan
        </Link>
      </div>

      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Jabatan</th>
            <th>Atasan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {jabatan.map((j, i) => (
            <tr key={j.id}>
              <td>{i + 1}</td>
              <td>{j.nama}</td>
              <td>{j.atasan?.nama || "-"}</td>
              <td>
                <Link
                  to={`/admin/jabatan/edit/${j.id}`}
                  className="btn btn-sm btn-warning mr-2"
                >
                  Edit
                </Link>

                <button
  className="btn btn-sm btn-error"
  onClick={async () => {
    if (confirm("Hapus jabatan ini?")) {
      await api.delete(`/api/admin/jabatan/${j.id}`);
      fetchData();
    }
  }}
>
  Hapus
</button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
