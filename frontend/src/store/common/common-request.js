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
