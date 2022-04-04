import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
    cartReducer
});

const store = createStore(rootReducer)

export default store