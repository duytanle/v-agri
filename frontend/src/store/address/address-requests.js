import axios from "../../api/axios";

export const requestAddressUpdate = () => {
    return axios.get("/common/get-address");
};
