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
