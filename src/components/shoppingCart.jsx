import {
    IconButton,
    Drawer, Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure
} from "@chakra-ui/react";
import { Flex, Heading, Text, Divider } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { LuShoppingCart } from "react-icons/lu";

export default function ShoppingCart() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isNarrowScreen] = useMediaQuery("(max-width: 1450px)");
    const btnRef = useRef();
    useEffect(() => {
        setIsSmallScreen(isNarrowScreen);
    }, [isNarrowScreen]);
    return (
        <>
            <IconButton
                icon={<LuShoppingCart size={isSmallScreen ? '20px' : '25px'} />}
                size='sm' ref={btnRef} onClick={onOpen} bg='none'
                _hover={{ bgColor: 'none' }} _active={{ bgColor: 'none' }}
            />

            <Drawer
                isOpen={isOpen}
                size='md'
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader my='5'>
                        <Flex justifyContent='space-between'>
                            <Heading size='lg'>Shopping Cart</Heading>
                            <Flex w='75px' justifyContent='space-between' alignItems='end'>
                                <Text fontWeight='bold'>5</Text>
                                <Text fontWeight='bold'>Items</Text>
                            </Flex>
                        </Flex>
                    </DrawerHeader>
                    <Divider/>

                    <DrawerBody>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}