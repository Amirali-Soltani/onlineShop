import { combineReducers } from "redux";
import products from "./products"
import attributeItem from "./attributeItem"

export default combineReducers({
    apiProducts:products,
    apiattributeItem:attributeItem
});
