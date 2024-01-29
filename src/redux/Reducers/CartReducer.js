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
        case 'INCREMENT_CART_ITEM':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                )
            };

        case 'DECREMENT_CART_ITEM':
            return {
                ...state,
                cart: state.cart.reduce((acc, item) => {
                    if (item.id === action.payload) {
                        // If the current item's ID matches the ID in the action payload (the item to decrement)
                        const updatedQuantity = Math.max(0, item.quantity - 1);
                        if (updatedQuantity > 0) {
                            // If the updated quantity is greater than 0, update the quantity and keep the item in the cart
                            acc.push({ ...item, quantity: updatedQuantity });
                        }
                        // If updated quantity is 0, don't add the item back to the cart (remove it)
                    } else {
                        // If the current item's ID doesn't match the ID in the action payload, keep it in the cart
                        acc.push(item);
                    }
                    return acc;
                }, [])
            };
        default:
            return state;
    }
};

export default cartReducer;
