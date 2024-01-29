export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const removeFromCart = (productId) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: productId
    };
};

export const clearCart = () => {
    return {
        type: 'CLEAR_CART',
    };
};

export const incrementCartItem = (productId) => {
    return {
        type: 'INCREMENT_CART_ITEM',
        payload: productId
    };
};

export const decrementCartItem = (productId) => {
    return {
        type: 'DECREMENT_CART_ITEM',
        payload: productId
    };
};
