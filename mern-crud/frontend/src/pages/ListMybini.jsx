import { useState, useEffect } from "react";
import Mybiniservices from "../services/Mybini_services";
import { Link } from "react-router-dom";

function ListMybini() {
    const [mybinis, setMybinis] = useState([]);
    const [currentMybini, setCurrentMybini] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveMybinis();
    }, []);

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    }

    const retrieveMybinis = () => {
        Mybiniservices.getAll()
            .then((response) => {
                setMybinis(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveMybinis();
        setCurrentMybini(null);
        setCurrentIndex(-1);
    };

    const setActiveMybini = (mybini, index) => {
        setCurrentMybini(mybini);
        setCurrentIndex(index);
    };

    const removeAllMybini = () => {
        Mybiniservices.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        Mybiniservices.findByTitle(searchTitle)
            .then((response) => {
                setMybinis(response.data);
                setCurrentMybini(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* KOLOM KIRI: SEARCH + LIST */}
            <div className="lg:cool-span-5 space-y-6">
                <div className="relative group">
                    <input
                        type="text"
                        className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Cari nama Bini..."
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    ></input>
                    <button
                        className="absolute right-2 top-1 bg-indigo-600 text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        onClick={findByTitle}
                    >Cari</button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                        <h4 className="font-bold text-lg mb-2">List My Bini</h4>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {mybinis &&
                            mybinis.map((mybini, index) => (
                                <li
                                    className={
                                        "px-5 py-4 cursor-pointer transition-all flex items-center justify-between hover: bg-indigo-50/50" +
                                        (index === currentIndex ? " bg-indigo-50 border-l-4 border-indigo-600" : "")
                                    }
                                    key={index}
                                    onClick={() => setActiveMybini(mybini, index)}
                                >
                                    <span className={`font-medium ${index === currentIndex ? "text-indigo-700" : "text-slate-600"}`}>
                                        {mybini.title}
                                    </span>
                                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </li>
                            ))}
                    </ul>
                </div>
                <button
                    className="w-full py-3 text-red600 font-medium text-sm hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                    onClick={removeAllMybini}
                >Hapus Semua Data Mybini</button>
            </div>
            {/* KOLOM KANAN: DETAIL */}
            <div className="lg:col-span-7">
                {currentMybini ? (
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-3xl font-extrabold text-slate-800 mb-1">{currentMybini.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentMybini.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                    {currentMybini.published ? "Published" : "Pending"}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4 text-slate-600 mb-8">
                            <p className="leading-relaxed"><strong className="text-slate-400 block text-xs uppercase mb-1">Deskripsi</strong>{currentMybini.description}</p>
                        </div>
                        <Link to={`/mybini/${currentMybini.id}`}>
                            <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                                Edit Profil Bini
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-slate-400">
                        <p>Silakan pilih bini untuk melihat detail</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListMybini;