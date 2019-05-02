import { combineReducers } from "redux";
import productosReducer from "../productos/reducer";

export default combineReducers({
  productos: productosReducer
});
