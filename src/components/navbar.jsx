import { useState, useEffect } from 'react';
import {
    Badge, useColorMode, Box, Avatar, Image,
    Flex, Link, Menu, MenuButton, MenuList, MenuItem, Text,
    Button
} from "@chakra-ui/react";
import logo_dark from "../image/logo_dark.png";
import logo_light from "../image/logo_light.png";
import axios from 'axios';
import { useMediaQuery } from "@chakra-ui/react";
import ToggleDarkMode from './toggledarkmode';
import CategoryMenu from './categoryMenu';
import ShoppingCart from './shoppingCart';
import NavDrawer from './navbarDrawer';
import { useLocation } from "react-router-dom";
import { store } from '../redux/Stores/CartStore';
import { clearCart } from '../redux/Action/CartAction';

export default function Navbar() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const userToken = localStorage.getItem("userToken");
    const location = useLocation();
    const { colorMode } = useColorMode();
    const [badgeScale, setBadgeScale] = useState(1);
    const [prevCartItemCount, setPrevCartItemCount] = useState(0);
    const logoSrc = colorMode === 'light' ? logo_light : logo_dark;
    // const cartItemCount = store.getState();
    const [cartItemCount, setCartItemCount] = useState(store.getState().cart.cart.length);

    useEffect(() => {
        // Check if the cartItemCount has changed
        if (cartItemCount !== prevCartItemCount) {
            // Increase the scale to make the badge bigger
            setBadgeScale(1.5);

            // Set a timeout to return the badge to normal size after a short delay (e.g., 500ms)
            const timeoutId = setTimeout(() => {
                setBadgeScale(1);
            }, 500);

            // Update the previous cartItemCount value
            setPrevCartItemCount(cartItemCount);

            // Clean up the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
        }
    }, [cartItemCount, prevCartItemCount]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            // Update the local state when the Redux store changes
            setCartItemCount(store.getState().cart.cart.length);
        });

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products/categories');
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const isLinkActive = (targetRoute) => {
        return location.pathname === targetRoute;
    };

    const [isNarrowScreen] = useMediaQuery("(max-width: 1450px)");
    const [isPhoneScreen] = useMediaQuery("(max-width: 1200px)")

    useEffect(() => {
        setIsSmallScreen(isNarrowScreen);
    }, [isNarrowScreen]);

    useEffect(() => {
        setIsVertical(isPhoneScreen);
    }, [isPhoneScreen]);

    const logout = () => {
        localStorage.removeItem("userToken");
        store.dispatch(clearCart());
        window.location.reload();
    };

    return (
        <Box w='100%' h={isSmallScreen ? "60px" : "70px"} >
            <Flex w={isVertical ? "95%" : "90%"} h='100%' m='0 auto' justifyContent='space-between' alignItems='center'>
                {
                    isVertical ? (
                        <>
                            <NavDrawer categories={data} />
                            <Link href="/">
                                <Image src={logoSrc} h={isSmallScreen ? "30px" : "40px"} />
                            </Link>
                        </>
                    ) :
                        (
                            <Flex h='100%' alignItems='center'>
                                <Link href="/">
                                    <Image src={logoSrc} h={isSmallScreen ? "30px" : "40px"} />
                                </Link>

                                <Flex alignItems="center">
                                    {
                                        isVertical ? (
                                            <>
                                                <CategoryMenu />
                                            </>
                                        ) : (
                                            <Box as='ul' display="flex">
                                                <Flex w='450px' justifyContent='space-between' ml={5}>
                                                    <Link fontWeight='bold' href="/shop/women's%20clothing" style={{ color: isLinkActive("/shop/women's%20clothing") ? 'red' : 'inherit' }}>
                                                        <Text fontSize={16}>
                                                            Womens' Clothing
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='bold' href="/shop/men's%20clothing" style={{ color: isLinkActive("/shop/men's%20clothing") ? 'red' : 'inherit' }}>
                                                        <Text fontSize={16}>
                                                            Mens' Clothing
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='bold' href="/shop/jewelery" style={{ color: isLinkActive("/shop/jewelery") ? 'red' : 'inherit' }}>
                                                        <Text fontSize={16}>
                                                            Jewelery
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='bold' href="/shop/electronics" style={{ color: isLinkActive("/shop/electronics") ? 'red' : 'inherit' }}>
                                                        <Text fontSize={16}>
                                                            Electronics
                                                        </Text>
                                                    </Link>
                                                </Flex>
                                            </Box>
                                        )
                                    }
                                </Flex>
                            </Flex>
                        )
                }


                <Flex w='150px' justifyContent='space-between' alignItems='center'>
                    <ShoppingCart />
                    {
                        cartItemCount > 0 ? (
                            <Badge borderRadius="full" bg="teal.500" color="white" p="1"
                                style={{ transform: `scale(${badgeScale})`, transition: 'transform 0.5s' }}
                            >
                                {cartItemCount}
                            </Badge>
                        ) : (<></>)
                    }

                    {
                        userToken ? (
                            <Menu>
                                <MenuButton
                                    as={Avatar}
                                    bg="gray"
                                    boxSize={isSmallScreen ? "25px" : "35px"}
                                />
                                <MenuList>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>Setting</MenuItem>
                                    <MenuItem onClick={logout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button as={Link} bg='black' color="white">
                                <Link href="/login" >Login</Link>
                            </Button>
                        )}
                    <ToggleDarkMode />
                </Flex>
            </Flex>
        </Box >
    );
}