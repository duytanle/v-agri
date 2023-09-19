import axios from "../../api/axios.js";
export const requestGetDashboard = (token) => {
    if (!token) return;
    return axios.get("/qtvbd/get-dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const requestGetProductVerify = (token) => {
    if (!token) return;
    return axios.get("/qtvbd/get-product-verify", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const requestConfirmVerify = ({ token, data }) => {
    if (!token) return;
    return axios.put("/qtvbd/confirm-verify", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// export const requestGetAccounts = ({ token, query }) => {
//     if (!token) return;
//     return axios.get(`/qtv/get-accounts/?${query}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const requestGetUnits = ({ token, query }) => {
//     if (!token) return;
//     return axios.get(`/qtv/get-units/?${query}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };
