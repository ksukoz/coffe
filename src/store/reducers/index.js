import { combineReducers } from "redux";
import catalogReducer from "./catalogReducer";
import commonReducer from "./commonReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

export default combineReducers({
  catalog: catalogReducer,
  common: commonReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer
});
