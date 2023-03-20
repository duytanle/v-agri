import { call, put } from "redux-saga/effects";
import { requestCreateProduct, requestHTXUpdateInfo } from "./htx-request";
import { toast } from "react-toastify";

function* handleHTXUpdateInfo({ payload }) {
    try {
        const response = yield call(requestHTXUpdateInfo, payload);

        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } catch (error) {}
}
function* handleHTXCreateProduct({ payload }) {
    try {
        const response = yield call(requestCreateProduct, payload);
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } catch (error) {
        console.log(error);
    }
}
export { handleHTXUpdateInfo, handleHTXCreateProduct };
