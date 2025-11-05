import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProjects from "../components/AdminProjects";

export default function AdminDashboard() {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 px-3 py-2 rounded">
            Déconnexion
          </button>
        </div>
        <AdminProjects />
      </div>
    </div>
  );
}
