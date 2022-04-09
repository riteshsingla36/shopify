import { GET_CART_ITEMS } from "./actionTypes"

const initialState = {
    cartItems: JSON.parse(sessionStorage.getItem("items")) || []
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_CART_ITEMS:
            return { ...state, cartItems: JSON.parse(sessionStorage.getItem("items")) }

        default:
            return state
    }
}


export default cartReducer