import { takeLatest, takeEvery, take, put, call } from "redux-saga/effects";
import { GET_USER } from "../actions/types";
import {
  setUser
  // updateUser
} from "../actions/userActions";

export function* fetchUserSaga() {
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

  const response2 = yield call(
    fetch,
    `http://kawaapi.gumione.pro/api/profile/get`,
    {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }
  );

  const { profile } = yield response2.json();
  yield put(setUser(profile));
}

// export function* updateCartSaga(item) {
//   const { payload } = item;
//   if (payload) {
//     let formData = new FormData();
//     let data = new FormData();
//     formData.append("login", "info@wrevery.com");
//     formData.append("password", "testtest");

//     data.append("item_id", payload.id);
//     data.append("qty", payload.qty);

//     const response = yield call(
//       fetch,
//       `http://kawaapi.gumione.pro/api/auth/login`,
//       {
//         method: "POST",
//         body: formData
//       }
//     );
//     let { token } = yield response.json();

//     const response2 = yield call(
//       fetch,
//       `http://kawaapi.gumione.pro/api/catalog/cart_update`,
//       {
//         headers: new Headers({
//           Authorization: "Bearer " + token
//         }),
//         method: "POST",
//         body: data
//       }
//     );

//     yield call(fetchCartSaga);
//   }
// }

export function* watchUserSaga() {
  // yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(GET_USER, fetchUserSaga);
}
