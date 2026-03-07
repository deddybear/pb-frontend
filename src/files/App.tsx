import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public pages (Navbar + Footer) ── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Route>

        {/* ── Auth pages (standalone, no Navbar/Footer) ── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ── Dashboard pages (Sidebar layout) ── */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* <Route index element={<DashboardOverview />} /> */}
          {/* <Route path="analytics" element={<Analytics />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
