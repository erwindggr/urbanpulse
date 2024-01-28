import {
    Drawer,
    DrawerBody,
    DrawerFooter, Text,
    DrawerHeader, Link,
    DrawerOverlay, Flex,
    DrawerContent, useColorMode,
    DrawerCloseButton, Button, Image,
    IconButton, useDisclosure, Box, Divider
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo_dark from "../image/logo_dark.png";
import logo_light from "../image/logo_light.png";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NavDrawer(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const btnRef = React.useRef();

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

    return (
        <>
            <IconButton size='sm' ref={btnRef} bg='none' onClick={onOpen} icon={<HamburgerIcon boxSize='20px' />} _hover={{ bgColor: 'none' }} _active={{ bgColor: 'none' }} />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Image src={logoSrc} h='30px' />
                    </DrawerHeader>

                    <DrawerBody>
                        <Flex flexDirection='column' mt={5}>
                            {
                                data?.slice().reverse().map((category, index) => (
                                    <Box key={index}>
                                        <Link >
                                            <Text fontWeight='bold' fontSize='xl' my={3}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </Text>
                                        </Link>
                                        <Divider />
                                    </Box>
                                ))
                            }
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}