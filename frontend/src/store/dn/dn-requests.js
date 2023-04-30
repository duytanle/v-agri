import axios from "../../api/axios";

export const requestCreateProduct = ({ token, product }) => {
    if (!token) return;
    return axios.post("/dn/create-product", product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const requestAddToCart = ({ token, data }) => {
    if (!token) return;
    return axios.post("/dn/add-to-cart", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestGetCart = (token) => {
    if (!token) return;
    return axios.get("/dn/get-cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestUpdateCartItem = ({ token, data }) => {
    if (!token) return;
    return axios.put("/dn/update-cart-item", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestOrderProduct = ({ token, data }) => {
    if (!token) return;
    return axios.post("/dn/order", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestReceive = ({ token, data }) => {
    if (!token) return;
    return axios.put("/dn/receive-order", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestDNGetIntro = ({ token, ND_MaND, DV_MaDV }) => {
    if (!token) return;
    return axios.get("/dn/get-intro", {
        headers: { Authorization: `Bearer ${token}` },
        params: { ND_MaND, DV_MaDV },
    });
};

export const requestDNUpdateProduct = ({ token, data }) => {
    if (!token) return;
    return axios.put("/dn/update-product", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
