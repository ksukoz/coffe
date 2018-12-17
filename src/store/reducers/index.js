import { combineReducers } from "redux";
import catalogReducer from "./catalogReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  catalog: catalogReducer,
  common: commonReducer
});
