
import { combineReducers } from "redux";
import todos from "./todos";
import categories from "./categories";
export default combineReducers({
    todos,
    categories
});