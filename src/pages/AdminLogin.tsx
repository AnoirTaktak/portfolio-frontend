import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const handle = (e: any) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      localStorage.setItem("token", "mock-token");
      nav("/admin/dashboard");
    } else alert("Identifiants invalides (admin/admin)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handle} className="bg-slate-800 p-6 rounded w-80">
        <h2 className="text-lg font-bold text-white mb-4">Admin Login</h2>
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Utilisateur" className="w-full p-2 mb-2 rounded bg-slate-700" />
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Mot de passe" className="w-full p-2 mb-4 rounded bg-slate-700" />
        <button className="w-full p-2 bg-blue-600 rounded">Se connecter</button>
      </form>
    </div>
  );
}
