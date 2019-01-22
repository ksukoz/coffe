import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { getProductReviews } from "../actions/catalogActions";
import { GET_PRODUCT_ID, ADD_PRODUCT_REVIEW } from "../actions/types";

export function* fetchProductReviewsSaga() {
  // console.log(item);

  const item = yield take(GET_PRODUCT_ID);
  const { payload } = item;
  if (payload) {
    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/catalog/get_comments/${payload}`
    );
    const { comments } = yield response.json();
    console.log(comments);
    yield put(getProductReviews(comments.reverse()));
  }
}

export function* addProductReviewSaga(item) {
  const { payload } = item;
  if (payload) {
    let formData = new FormData();
    formData.append("login", "info@wrevery.com");
    formData.append("password", "testtest");

    const response = yield call(
      fetch,
      `http://kawaapi.gumione.pro/api/auth/login`,
      {
        method: "POST",
        body: formData
      }
    );
    let { token } = yield response.json();

    // const response2 = yield call(
    //   fetch,
    //   `http://kawaapi.gumione.pro/api/catalog/add_comment`,
    //   {
    //     headers: new Headers({
    //       Authorization: "Bearer " + token
    //     }),
    //     method: "POST",
    //     body: payload.data
    //   }
    // );

    // yield call(getProductID(payload.id));
  }
}

export function* watchFetchProductReviewsSaga() {
  yield takeLatest(ADD_PRODUCT_REVIEW, addProductReviewSaga);
  yield takeEvery(GET_PRODUCT_ID, fetchProductReviewsSaga);
}
