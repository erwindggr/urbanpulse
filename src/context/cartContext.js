import React, { createContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const toast = useToast()
    const [cart, setCart] = useState([]);

    const addToCart = (product, id) => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
            toast({
                position: "top",
                title: "Please log in first",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newItem = { ...product, amount: 1 }

        const cartItem = cart.find(item => {
            return item.id === id;
        });

        if (cartItem) {
            const newCart = [...cart].map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, newItem])
        }
    }

    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        })
        setCart(newCart)
    }

    const clearCart = () => {
        setCart([]);
    }

    const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id == id);
        addToCart(cartItem, id);
    }

    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => {
            return item.id == id
        });
        if (cartItem) {
            const newCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount - 1 }
                } else {
                    return item;
                }
            })
            setCart(newCart);
        }
        if (cartItem.amount < 2) {
            removeFromCart(id);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount }}>
            {children}
        </CartContext.Provider>
    )
};