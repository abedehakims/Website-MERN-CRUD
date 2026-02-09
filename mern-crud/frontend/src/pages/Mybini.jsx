import { useState, useEffect } from "react";
import Mybiniservices from "../services/Mybini_services";
import { useParams, useNavigate } from "react-router-dom";

function Mybini() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentMybini, setCurrentMybini] = useState({
        id: null,
        title: "",
        description: "",
        published: false,
    });
    const [message, setMessage] = useState("");

    const getMybini = () => {
        Mybiniservices.get(id)
            .then((response) => {
                setCurrentMybini(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) getMybini(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentMybini({ ...currentMybini, [name]: value });
    };

    const updatePublished = (status) => {
        const data = {
            ...currentMybini,
            published: status,
        };
        Mybiniservices.update(currentMybini.id, data)
            .then(() => {
                setCurrentMybini({ ...currentMybini, published: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateMybini = () => {
        Mybiniservices.update(currentMybini.id, currentMybini)
            .then((response) => {
                console.log(response.data);
                setMessage("Mybini berhasil diperbarui.");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteMybini = () => {
        Mybiniservices.remove(currentMybini.id)
            .then((response) => {
                console.log(response.data)
                navigate("/mybini");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div className="max-w-2xl mx-auto">
            {currentMybini ? (
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                        <h4 className="text-xl font-bold text-slate-800">Edit Profil Bini</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentMybini.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100"}`}>{currentMybini.published ? "Published" : "Pending"}</span>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nama/Judul
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    id="mybini"
                                    name="title"
                                    value={currentMybini.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    id="deskripsi"
                                    name="description"
                                    value={currentMybini.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors" onClick={() => updatePublished(false)}>
                                {message}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-4">
                            {currentMybini.published ? (
                                <button
                                    className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                                    onClick={() => updatePublished(false)}
                                >Unpublish</button>
                            ) : (
                                <button
                                    className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-200 transition-colors"
                                    onClick={() => updatePublished(true)}
                                >Publish</button>
                            )}
                            <button className="px-6 py-2 bg-rose-50 text-rose-600 rounded-xl font-semibold hover:bg-rose-200 transition-colors"
                                onClick={deleteMybini}
                            >Hapus</button>
                            <button className="flex-1 px-6 bg-slate-900 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
                                onClick={updateMybini}
                            >Simpan</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Sedang loading data My bini...</p>
                </div>
            )}
        </div>
    );
}

export default Mybini;