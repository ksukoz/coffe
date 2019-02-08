import {
  take,
  takeLatest,
  takeEvery,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import { GET_ORDER, GET_PAYER_INFO } from "../actions/types";
import { setOrder } from "../actions/orderActions";

const getToken = state => state.user.token;

export function* setOrderSaga(item) {
  const { payload, type } = item;
  const token = yield select(getToken);
  let data = new FormData();

  Object.keys(payload).forEach(key => data.append(key, payload[key]));

  const response = yield call(
    fetch,
    `http://kawaapi.gumione.pro/api/users/make_order`,
    {
      headers: new Headers({
        Authorization: "Bearer " + token
      }),
      method: "POST",
      body: data
    }
  );

  if (type === GET_ORDER) {
    const { id } = yield response.json();
    yield put(setOrder(id));
  }
}

export function* watchOrderSaga() {
  yield takeLatest(GET_ORDER, setOrderSaga);
  yield takeLatest(GET_PAYER_INFO, setOrderSaga);
}
