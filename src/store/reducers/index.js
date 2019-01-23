import { combineReducers } from "redux";
import catalogReducer from "./catalogReducer";
import commonReducer from "./commonReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

export default combineReducers({
  catalog: catalogReducer,
  common: commonReducer,
  cart: cartReducer,
  user: userReducer
});
