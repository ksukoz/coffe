import { takeLatest, put, call } from "redux-saga/effects";
import { getAutocomplete } from "../actions/catalogActions";
import { GET_SEARCH } from "../actions/types";

export function* fetchAutoCompleteSaga(item) {
  const { payload } = item;
  if (payload && payload.id) {
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/search/${encodeURI(
        payload.search
      )}/${payload.id}/both`
    );
    const { items } = yield response.json();
    yield put(getAutocomplete(items));
  }
}

export function* watchFetchAutoCompleteSaga() {
  yield takeLatest(GET_SEARCH, fetchAutoCompleteSaga);
}
