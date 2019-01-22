// import { take, takeLatest, all, put, call } from "redux-saga/effects";
// import { getAlphabet } from "../actions/commonActions";
// import { CHANGE_CART, GET_CART, ADD_TO_CART } from "../actions/types";
// import { setCart, getCart } from "../actions/cartActions";

// export function* fetchDeliverySaga(city, delivery, courier) {
//   let formData = new FormData();
//   let data = new FormData();
//   formData.append("username", "+380675635155");
//   formData.append("password", "test");

//   data.append("city", city);
//   data.append("delivery", delivery);
//   data.append("courier", courier);

//   const response = yield call(
//     fetch,
//     `http://kawaapi.gumione.pro/api/auth/login`,
//     {
//       method: "POST",
//       body: formData
//     }
//   );
//   let { token } = yield response.json();

//   const response2 = yield call(
//     fetch,
//     `http://kawaapi.gumione.pro/api/catalog/delivery_cost`,
//     {
//       headers: new Headers({
//         Authorization: "Bearer " + token
//       })
//     }
//   );

//   const { cost } = yield response2.json();
//   yield put(setCart([
//     {
//       delivery: delivery === 1 ? "np" : delivery === 2 ? "up" : "es",
//       courier: courier,
//       cost: cost
//     }
//   ]));
// }

// export function* watchCartSaga() {
//   yield all([call()])

//   yield takeLatest(ADD_TO_CART, addToCartSaga);
//   yield takeLatest(CHANGE_CART, updateCartSaga);
//   yield takeEvery(GET_CART, fetchCartSaga);
// }
