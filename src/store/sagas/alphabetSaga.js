import { takeLatest, put, call } from "redux-saga/effects";
import { getAlphabet } from "../actions/commonActions";
import { SET_LANG } from "../actions/types";

export function* fetchAlphabetSaga(item) {
  const { payload } = item;
  if (payload) {
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/letters/${payload.lang}${
        payload.id ? `/${payload.id}` : ""
      }`
    );
    const response2 = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/letters/${
        payload.lang === 1 ? 2 : 1
      }${payload.id ? `/${payload.id}` : ""}`
    );
    let { letters } = yield response.json();

    if (letters.length > 0) {
      yield put(getAlphabet(letters));
    } else {
      letters = yield response2.json();
      yield put(getAlphabet(letters.letters));
    }
  }
}

export function* watchAlphabetSaga() {
  yield takeLatest(SET_LANG, fetchAlphabetSaga);
}
