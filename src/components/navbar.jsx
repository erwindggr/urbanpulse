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
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const userToken = localStorage.getItem("userToken");
    const navigate = useNavigate();

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
                            <Image src={logoSrc} h={isSmallScreen ? "30px" : "40px"} />
                        </>
                    ) :
                        (
                            <Flex h='100%' alignItems='center'>
                                <Image src={logoSrc} h={isSmallScreen ? "30px" : "40px"} />

                                <Flex alignItems="center">
                                    {
                                        isVertical ? (
                                            <>
                                                <CategoryMenu categories={data} />
                                            </>
                                        ) : (
                                            <Box as='ul' display="flex">
                                                {data ? (
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
                                                        <Box>data kosong</Box>
                                                    </>
                                                )}
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