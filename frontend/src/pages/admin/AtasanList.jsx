import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export default function AtasanList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/api/admin/atasan");
      setData(res.data);
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
        <h1 className="text-2xl font-bold mb-4">Data Atasan</h1>
        <Link to="/admin/atasan/add" className="btn btn-primary">
          + Tambah Atasan
        </Link>
      </div>

      <table className="table w-full bg-white">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Atasan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a, i) => (
            <tr key={a.id}>
              <td>{i + 1}</td>
              <td>{a.nama}</td>

              <td>
                <Link
                  to={`/admin/atasan/edit/${a.id}`}
                  className="btn btn-sm btn-warning mr-2"
                >
                  Edit
                </Link>

<button
  className="btn btn-sm btn-error"
  onClick={async () => {
    if (confirm("Hapus atasan ini?")) {
      await api.delete(`/api/admin/atasan/${a.id}`);
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
