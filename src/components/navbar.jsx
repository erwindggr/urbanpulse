import { useState, useEffect } from 'react';
import {
    useColorModeValue, useColorMode, Box, Avatar, Image,
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

export default function Navbar() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const userToken = localStorage.getItem("userToken");
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
                                                {/* {data ? (
                                                    <>
                                                        <Flex w='430px' justifyContent='space-between' ml={5}>
                                                            {
                                                                data.slice().reverse().map((category, index) => (
                                                                    <Link key={index} fontWeight='bold'>
                                                                        <Text fontSize={16}>
                                                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                                                        </Text>
                                                                    </Link>
                                                                ))
                                                            }
                                                        </Flex>
                                                    </>
                                                ) : error ? (
                                                    <div>{error.message}</div>
                                                ) : (
                                                    <>
                                                        <Flex w='430px'>
                                                            <Flex m='0 auto'>
                                                                <Box>...</Box>
                                                            </Flex>
                                                        </Flex>
                                                    </>
                                                )} */}
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

                    {/* <Menu>
                        <MenuButton as={Avatar} bg='gray' boxSize={isSmallScreen ? '25px' : '35px'} />
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Setting</MenuItem>
                            <MenuItem>Log Out</MenuItem>
                        </MenuList>
                    </Menu> */}

                    <ToggleDarkMode />
                </Flex>
            </Flex>
        </Box >
    );
}