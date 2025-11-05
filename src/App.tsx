import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress"; // ✅ barre de progression du scroll
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen relative">
      {/* ✅ Barre de progression de scroll toujours visible */}
      <ScrollProgress />

      {/* ✅ Navbar persistante */}
      <Navbar />

      {/* ✅ Routage des pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* ✅ Footer commun à toutes les pages */}
      <Footer />
   <div className="bg-white dark:bg-slate-900 text-black dark:text-white p-4">
  Mode test
</div>

    </div>
    
  );
}
