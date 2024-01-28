const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            console.log(state.cart);
            if (existingItem) {
                // Item with the same ID already exists, handle accordingly (e.g., update quantity)
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 } // Update quantity or take any other action
                            : item
                    )
                };
            } else {
                // Item with the ID doesn't exist, add it to the cart
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

export default cartReducer;
