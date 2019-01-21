import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { initSagas } from "./initSagas";

const initialState = {};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware, thunk];
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleWares)
  );
  initSagas(sagaMiddleware);
  return store;
};

export default configureStore;
