import {
  take,
  takeLatest,
  all,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import { setDelivery, setMassDelivery } from "../actions/commonActions";
import { GET_DELIVERY_COST, GET_DELIVERY_COST_SINGLE } from "../actions/types";

const getToken = state => state.user.token;
const getCity = state => state.common.city;
const getProduct = state => state.common.product;
const getCart = state => state.cart.items;

export function* fetchDeliverySaga(city, delivery, courier) {
  if (city && delivery && courier) {
    const token = yield select(getToken);

    let data = new FormData();

    data.append("city", city);
    data.append("delivery", delivery);
    data.append("courier", courier);

    const response = yield call(
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

    const { cost } = yield response.json();
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

export function* getMassDeliverySaga(item) {
  const city = yield select(getCity);
  const cart = yield select(getCart);
  const token = yield select(getToken);
  let data = new FormData();

  data.append("city", city);
  cart.map(item => data.append("id", item.id));
  cart.map(item => data.append("q", item.qty));

  const response = yield call(
    fetch,
    `http://kawaapi.gumione.pro/api/catalog/delivery_cost_mass`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token
      }),
      body: data
    }
  );
  const { cost } = yield response.json();
  console.log(cost);
  yield put(setMassDelivery(cost));
}

export function* getSingleDeliverySaga(item) {
  const product = yield select(getProduct);
  const token = yield select(getToken);
  let data = new FormData();

  data.append("city", product.city);
  data.append("id", product.item.id);
  data.append("q", product.item.qty);

  const response = yield call(
    fetch,
    `http://kawaapi.gumione.pro/api/catalog/delivery_cost_mass`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token
      }),
      body: data
    }
  );
  const { cost } = yield response.json();

  yield put(setMassDelivery(cost));
}

export function* watchDeliverySaga() {
  yield takeLatest(GET_DELIVERY_COST, getDeliverySaga);
  yield takeLatest(GET_DELIVERY_COST, getMassDeliverySaga);
  yield takeLatest(GET_DELIVERY_COST_SINGLE, getSingleDeliverySaga);
}
