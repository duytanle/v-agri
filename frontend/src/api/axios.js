import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:3001/api",
});

export const axiosPrivate = axios.create({
    baseURL: "http://127.0.0.1:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
});
