import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("api/auth/login", { nik, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "hrd") navigate("/hrd");
      else if (role === "kepala_sekolah") navigate("/kepala");
      else navigate("/karyawan");

    } catch (err) {
      alert(err.response?.data?.message || "Login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="h-screen w-screen flex items-center justify-center bg-[#11315B]">
    <div className="bg-[#ffffff12] backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-[420px]">

      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-5">

        {/* NIK */}
        <div>
          <label className="text-white text-sm">NIK</label>
          <input
            type="text"
            placeholder="Masukkan NIK"
            className="input input-bordered w-full mt-1 bg-white text-black"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="input input-bordered w-full mt-1 bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 mt-3 rounded-lg font-semibold text-white 
    ${loading ? "bg-[#4B2EED] opacity-60 cursor-not-allowed" : "bg-[#4B2EED] hover:bg-[#4027cc]"}
  `}
>
  {loading ? "Loading..." : "Login"}
</button>

      </form>

      <p className="text-center text-white text-sm mt-6">
        Belum punya akun?  
        <Link to="/register" className="ml-1 text-green-400 hover:underline">
          Daftar
        </Link>
      </p>

    </div>
  </div>
);

}
