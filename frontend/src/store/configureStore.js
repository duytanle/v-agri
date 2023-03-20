import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import { reducer } from "./reducers";
import { logger } from "redux-logger";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer,
    middleware: (gDM) =>
        gDM({
            serializableCheck: false,
        }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
