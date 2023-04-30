import axios from "../../api/axios";
export const requestGetCategory = () => {
    return axios.get("/common/get-category");
};

export const requestGetProducts = (queryParams) => {
    return axios.get(`/common/get-product-filter?${queryParams}`);
};

export const requestGetUnitDetail = (id) => {
    return axios.get(`/common/get-unit/${id}`);
};

export const requestDNGetOrder = ({ token, DN_MaQL }) => {
    if (!token) return;
    return axios.get("/dn/get-order", {
        headers: { Authorization: `Bearer ${token}` },
        params: { DN_MaQL },
    });
};

export const requestHTXGetOrder = ({ token, DV_MaDV }) => {
    if (!token) return;
    return axios.get("/htx/get-order", {
        headers: { Authorization: `Bearer ${token}` },
        params: { DV_MaDV },
    });
};

export const requestGetUnitProduct = (id) => {
    return axios.get(`/common/get-unit-product/${id}`);
};

export const requestGetProductDetail = (id) => {
    return axios.get(`/common/get-product-detail/${id}`);
};
