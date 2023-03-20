import axios from "../../api/axios.js";

export const requestAuthRegister = (data) => {
    return axios.post("/auth/register", { ...data });
};

export const requestAuthLogin = (data) => {
    return axios.post("/auth/login", { ...data });
};

export const requestAuthGetUser = (token) => {
    if (!token) return;
    return axios.get("/auth/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestAuthRefreshToken = (token) => {
    if (!token) return;
    return axios.post("/auth/refresh_token", { refreshToken: token });
};

export const requestAuthGetUserUnit = (token) => {
    if (!token) return;
    return axios.get("/auth/get-user-unit", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
