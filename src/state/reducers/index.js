import { combineReducers } from "redux";

import empty from "./empty";
import global from "./global";

const rootReducer = combineReducers({
  empty,
  global,
});

export default rootReducer;
