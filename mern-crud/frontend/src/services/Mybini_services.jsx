import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getAll = () => {
    return http.get("/mybini");
};

const get = (id) => {
    return http.get(`/mybini/${id}`);
};

const create = (data) => {
    return http.post("/mybini", data);
};

const update = (id, data) => {
    return http.put(`/mybini/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/mybini/${id}`);
};

const removeAll = () => {
    return http.delete(`/mybini`);
};

const findByTitle = (title) => {
    return http.get(`/mybini?title=${title}`);
};

const Mybiniservices = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default Mybiniservices;