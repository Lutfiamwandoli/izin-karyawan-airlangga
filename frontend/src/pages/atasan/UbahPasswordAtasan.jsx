import { useState } from "react";
import axios from "axios";

export default function UbahPasswordAtasan() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const validatePassword = (pwd) => {
    return pwd.length >= 6 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd)
      ? true
      : false;
  };

  const handleSubmit = async () => {
    setMsg("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMsg("Semua field wajib diisi.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMsg("Password baru harus minimal 6 karakter dan mengandung huruf besar, kecil, serta angka.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/izin/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMsg(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold mb-2">Ubah Password</h2>

      <p className="text-gray-600 text-sm mb-6">
        Kata sandi Anda harus paling tidak 6 karakter dan harus menyertakan kombinasi huruf besar,
        huruf kecil dan angka.
      </p>

      {/* CURRENT PASSWORD */}
      <div className="mb-4">
        <label className="font-semibold">Kata sandi saat ini</label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            className="w-full border p-3 rounded mt-2"
            placeholder="masukkan kata sandi saat ini"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-5 cursor-pointer"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            👁️
          </span>
        </div>
      </div>

      {/* NEW PASSWORD */}
      <div className="mb-4">
        <label className="font-semibold">Kata sandi baru</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            className="w-full border p-3 rounded mt-2"
            placeholder="masukkan kata sandi baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-5 cursor-pointer"
            onClick={() => setShowNew(!showNew)}
          >
            👁️
          </span>
        </div>
      </div>

      {/* CONFIRM PW */}
      <div className="mb-6">
        <label className="font-semibold">Konfirmasi kata sandi baru</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full border p-3 rounded mt-2"
            placeholder="ketik ulang kata sandi baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-5 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            👁️
          </span>
        </div>
      </div>

      {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded disabled:bg-gray-400"
      >
        {loading ? "Memproses..." : "Ubah Password"}
      </button>
    </div>
  );
}
