import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import Mybini from "./pages/Mybini";
import ListMybini from "./pages/ListMybini";
import AddMybini from "./pages/AddMybini";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        { /* Navbar Modern */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-8">
            <h2 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              Website Daftar Mybini
            </h2>
            <div className="flex space-x-6">
              <Link to="/mybini" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Daftar Bini
              </Link>
              <Link to="/tambah" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                + Tambah Baru
              </Link>
            </div>
          </div>
        </nav>

        { /* Main Content Container */}
        <main className="max-w-6xl mx-auto p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<ListMybini />} />
            <Route path="/mybini" element={<ListMybini />} />
            <Route path="/tambah" element={<AddMybini />} />
            <Route path="/mybini/:id" element={<Mybini />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;