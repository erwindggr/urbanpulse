import { useState, useEffect, useContext } from 'react';
import {
    Badge, useColorMode, Box, Avatar, Image,
    Flex, Link, Menu, MenuButton, MenuList, MenuItem, Text,
    Button,
    useToken
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
import { CartContext } from '../context/cartContext';

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const userToken = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    const userDataParsed = JSON.parse(userData);
    const location = useLocation();
    const { colorMode } = useColorMode();
    const logoSrc = colorMode === 'light' ? logo_light : logo_dark;

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
        localStorage.removeItem("userData");
        window.location.reload();
        window.location.href = "/";
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Flex w='100%' flexDir='column'>
            {
                userToken ? (
                    <Flex w='100%' h='30px' bg='#2D9596' justifyContent='center' alignItems='center'>
                        <Text color='white' fontFamily="'Lexend', sans-serif" fontWeight={200}>
                            Welcome, {capitalizeFirstLetter(userDataParsed.name.firstname)}{" "}
                            {capitalizeFirstLetter(userDataParsed.name.lastname)}
                        </Text>
                    </Flex>
                ) :
                    (
                        <>
                        </>
                    )
            }

            <Flex w='100%' px={isVertical ? 5 : 10} m='0 auto' justifyContent='space-between' alignItems='center' py={5} bg='#f7f7f5'>
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
                                                <Flex ml={5}>
                                                    <Link
                                                        fontWeight='600' href="/shop/women's%20clothing"
                                                        style={{
                                                            color: isLinkActive("/shop/women's%20clothing") ? '#2D9596' : 'inherit',
                                                            fontWeight: isLinkActive("/shop/women's%20clothing") ? 'bold' : 'none',
                                                            textDecoration: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <Text fontSize={20} mr={5} fontFamily="'Red Hat Display', sans-serif">
                                                            Women
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='600' href="/shop/men's%20clothing" style={{
                                                        color: isLinkActive("/shop/men's%20clothing") ? '#2D9596' : 'inherit',
                                                        fontWeight: isLinkActive("/shop/men's%20clothing") ? 'bold' : 'none',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <Text fontSize={20} mr={5} fontFamily="'Red Hat Display', sans-serif">
                                                            Men
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='600' href="/shop/jewelery" style={{
                                                        color: isLinkActive("/shop/jewelery") ? '#2D9596' : 'inherit',
                                                        fontWeight: isLinkActive("/shop/jewelery") ? 'bold' : 'none',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <Text fontSize={20} mr={5} fontFamily="'Red Hat Display', sans-serif">
                                                            Jewelery
                                                        </Text>
                                                    </Link>
                                                    <Link fontWeight='600' href="/shop/electronics" style={{
                                                        color: isLinkActive("/shop/electronics") ? '#2D9596' : 'inherit',
                                                        fontWeight: isLinkActive("/shop/electronics") ? 'bold' : 'none',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <Text fontSize={20} fontFamily="'Red Hat Display', sans-serif">
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


                <Flex justifyContent='space-between' alignItems='center'>
                    {
                        userToken ? (
                            <Menu>
                                <MenuButton
                                    mr={isPhoneScreen ? '3' : '5'}
                                    as={Avatar}
                                    bg="gray.300"
                                    boxSize={isSmallScreen ? "25px" : "35px"}
                                    style={{
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                                <MenuList>
                                    <MenuItem _hover={{ bg: "#2D9596", color: "white" }} onClick={logout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <>
                                <Link href="/login" mr={5} style={{
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <Text fontSize={15} fontWeight={600} fontFamily="'Lexend', sans-serif">Sign in</Text>
                                </Link>
                            </>
                        )
                    }
                    <Flex position='relative'>
                        <ShoppingCart />
                        {
                            cart.length > 0 ? (
                                <Badge
                                    borderRadius="full"
                                    bg="teal.500"
                                    color="white"
                                    py="1" px="2"
                                    position='absolute'
                                    left={5}
                                    top={-2}
                                >
                                    <Text fontSize='10px'>
                                        {
                                            cart.reduce((total, item) => {
                                                return total + item.amount;
                                            }, 0)
                                        }
                                    </Text>
                                </Badge>
                            ) : (<></>)
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    );
}