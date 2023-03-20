import axios from "../../api/axios";

export const requestHTXUpdateInfo = ({ token, data }) => {
    if (!token) return;
    return axios.post("/htx/update-info", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateImage = ({ token, imageFile }) => {
    if (!token) return;
    return axios.post("/htx/upload-image", imageFile, {
        headers: {
            contentType: false,
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateImages = ({ token, imagesFile }) => {
    if (!token) return;
    return axios.post("/htx/upload-images", imagesFile, {
        headers: {
            contentType: false,
            Authorization: `Bearer ${token}`,
        },
    });
};

export const requestCreateProduct = ({ token, product }) => {
    if (!token) return;
    return axios.post("/htx/create-product", product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
