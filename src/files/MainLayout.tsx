import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * MainLayout — wraps public-facing pages with Navbar + Footer.
 * Usage: wrap <Route> elements that need the public nav.
 */
export default function MainLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
