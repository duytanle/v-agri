import { requestAddressUpdate } from "./address-requests.js";
import { addressUpdate } from "./address-slice";
import { call, put } from "redux-saga/effects";
function* handleAddressUpdate() {
    try {
        const response = yield call(requestAddressUpdate);

        if (response.data.status === true) {
            yield put(
                addressUpdate({
                    province: response.data.result.province,
                    district: response.data.result.district,
                    commune: response.data.result.commune,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}

export { handleAddressUpdate };
