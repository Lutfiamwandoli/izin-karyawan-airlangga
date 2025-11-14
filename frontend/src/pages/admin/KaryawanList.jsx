import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export default function KaryawanList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/api/admin/karyawan");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Data Karyawan</h1>
        <Link to="/admin/karyawan/add" className="btn btn-primary">
          + Tambah Karyawan
        </Link>
      </div>

      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((k) => (
            <tr key={k.id}>
              <td>{k.nik}</td>
              <td>{k.nama}</td>
              <td>{k.jabatan?.nama || "-"}</td>
              <td>
                <Link to={`/admin/karyawan/edit/${k.id}`} className="btn btn-sm btn-warning mr-2">
                  Edit
                </Link>
                <button className="btn btn-sm btn-error">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
