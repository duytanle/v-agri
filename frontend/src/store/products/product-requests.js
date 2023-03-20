import axios from "../../api/axios";
export const requestGetCategory = () => {
    return axios.get("/common/get-category");
};

export const requestGetProducts = () => {
    return axios.get("/common/get-products");
};

export const requestGetUnitDetail = (id) => {
    return axios.get(`/common/get-unit/${id}`);
};
