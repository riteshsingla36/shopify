import { GET_CART_ITEMS } from "./actionTypes"

const initialState = {
    cartItems: []
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_CART_ITEMS:
            return { ...state, cartItems: payload }

        default:
            return state
    }
}


export default cartReducer