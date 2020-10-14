import { combineReducers } from "redux";
import authorization from "./authorization"
import combineApi from './combineApi'
import addToCart from './addToCart'
import menu from "./burger-menu"

export default combineReducers({
  authorization:authorization,
  api:combineApi,
  addToCart:addToCart,
  menu:menu,
});
