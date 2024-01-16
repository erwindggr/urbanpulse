import { useState, useEffect } from 'react';
import {
    useColorModeValue, useColorMode, Box, Avatar, Image,
    Flex, Link, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import logo_dark from "../image/logo_dark.png";
import logo_light from "../image/logo_light.png";
import axios from 'axios';
import { useMediaQuery } from "@chakra-ui/react";
import ToggleDarkMode from './toggledarkmode';
import CategoryMenu from './categoryMenu';
import ShoppingCart from './shoppingCart';

export default function Navbar() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { colorMode } = useColorMode();
    const bg = useColorModeValue('rgba(255, 255, 255, 0.56)', 'rgba(26, 32, 44, 0.75)')
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box w='100vw' h={isSmallScreen ? "60px" : "70px"} bg={isScrolled ? bg : 'transparent'} boxShadow={isScrolled ? '0 4px 30px rgba(0,0,0, 0.1)' : 'none'} backdropFilter={isScrolled ? 'blur(8.2px)' : 'none'}>
            <Flex w={isSmallScreen ? "85%" : "1400px"} h='100%' m='0 auto' justifyContent='space-between' alignItems='center'>
                <Image src={logoSrc} boxSize={isSmallScreen ? "55px" : "65px"} />

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
                                        <Flex w='600px' justifyContent='space-between'>
                                            {
                                                data.slice().reverse().map((category, index) => (
                                                    <Link key={index} fontWeight='bold'>{category.charAt(0).toUpperCase() + category.slice(1)}</Link>
                                                ))
                                            }
                                        </Flex>
                                    </>
                                ) : error ? (
                                    <div>Error: {error.message}</div>
                                ) : (
                                    <>
                                    </>
                                )}
                            </Box>
                        )
                    }

                </Flex>

                <Flex w='150px' justifyContent='space-between' alignItems='center'>
                    <ShoppingCart />

                    <Menu>
                        <MenuButton as={Avatar} bg='#f0daa4' boxSize={isSmallScreen ? '25px' : '35px'} />
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Setting</MenuItem>
                            <MenuItem>Log Out</MenuItem>
                        </MenuList>
                    </Menu>

                    <ToggleDarkMode />
                </Flex>
            </Flex>
        </Box>
    );
}