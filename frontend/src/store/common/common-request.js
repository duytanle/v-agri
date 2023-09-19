import axios from "../../api/axios";

export const requestGetAnnounce = ({ id, token }) => {
    if (!token) return;
    return axios.get(`/common/get-announce/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestGetDashboard = ({ id, token }) => {
    if (!token) return;
    return axios.get(`/common/get-dashboard/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestGetAssessProduct = (query) => {
    return axios.get(`/common/get-product-assess?${query}`);
};
export const requestGetUnitAssess = (query) => {
    return axios.get(`/common/get-unit-assess?${query}`);
};
