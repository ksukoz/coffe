import { take, takeLatest, all, put, call, fork } from "redux-saga/effects";
import { setDelivery } from "../actions/commonActions";
import { GET_DELIVERY_COST } from "../actions/types";

export function* fetchDeliverySaga(city, delivery, courier) {
  if (city && delivery && courier) {
    let formData = new FormData();
    let data = new FormData();
    formData.append("username", "+380675635155");
    formData.append("password", "test");

    data.append("city", city);
    data.append("delivery", delivery);
    data.append("courier", courier);

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
      `http://kawaapi.gumione.pro/api/catalog/delivery_cost`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + token
        }),
        body: data
      }
    );

    const { cost } = yield response2.json();
    yield put(
      setDelivery([
        {
          delivery: delivery === 1 ? "np" : delivery === 2 ? "up" : "es",
          courier: courier,
          cost: cost
        }
      ])
    );
  }
}

export function* getDeliverySaga(item) {
  if (item.payload) {
    yield all([
      fork(() => fetchDeliverySaga(item.payload, 1, 1)),
      fork(() => fetchDeliverySaga(item.payload, 1, "0")),
      fork(() => fetchDeliverySaga(item.payload, 2, 1)),
      fork(() => fetchDeliverySaga(item.payload, 2, "0")),
      fork(() => fetchDeliverySaga(item.payload, 3, 1)),
      fork(() => fetchDeliverySaga(item.payload, 3, "0"))
    ]);
  }
}

export function* watchDeliverySaga() {
  yield takeLatest(GET_DELIVERY_COST, getDeliverySaga);
}
