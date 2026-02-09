import { useState } from "react";
import Mybiniservices from "../services/Mybini_services";

function AddMybini() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const saveMybini = () => {
        const data = { title, description };
        Mybiniservices.create(data)
            .then(() => {
                console.log("Mybini berhasil ditambahkan.");
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const newMybini = () => {
        setTitle("");
        setDescription("");
        setSubmitted(false);
    };

    return (
        <div className="max-wd-md mx-auto mt-10">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="bg-indigo-600 px-8 py-6">
                    <h4 className="font-bold text-lg mb-2 text-white">Tambah Bini Baru</h4>
                    <p className="text-indigo-100 text-sm opacity-80">Lengkapi data untuk koleksi bini kamu</p>
                </div>
                <div className="p-8">
                    {submitted ? (
                        <div className="text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 className="font-bold text-green-600 mb-4">
                                Bini baru gweh berhasil ditambahkan!!
                            </h4>
                            <p className="text-slate-500 mb-6 text-sm">Data bini baru sudah tersimpan dengan aman.</p>
                            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all" onClick={newMybini}>
                                Tambah Bini Lagi
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama lengkap:</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all text-slate-800"
                                    value={title}
                                    placeholder="Masukkan nama bini..."
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi:</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all text-slate-800"
                                    value={description}
                                    placeholder="Ceritakan tentang bini kamu ini..."
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                                onClick={saveMybini}
                            >Simpan</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddMybini;