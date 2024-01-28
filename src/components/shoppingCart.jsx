import {
    IconButton,
    Drawer, Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure, Image
} from "@chakra-ui/react";
import { Flex, Heading, Text, Divider } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { LuShoppingCart } from "react-icons/lu";
// import store from "../redux/Stores/CartStore";
import { store } from "../redux/Stores/CartStore";
import { removeFromCart } from "../redux/Action/CartAction";

export default function ShoppingCart(props) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cartItems = store.getState().cart.cart;
    const [localCart, setLocalCart] = useState([]);
    const [isNarrowScreen] = useMediaQuery("(max-width: 1450px)");
    const cart = store.getState();
    const btnRef = useRef();

    useEffect(() => {
        setLocalCart(cartItems);
    }, [cartItems]);

    useEffect(() => {
        setIsSmallScreen(isNarrowScreen);
    }, [isNarrowScreen]);

    const handleRemoveAndRefresh = (itemId) => {
        // Dispatch the action to remove the item from the cart
        store.dispatch(removeFromCart(itemId));

        // Update local state to trigger re-render of the cart items
        setLocalCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

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
                                <Text fontWeight='bold'>{cart.cart.cart.length}</Text>
                                <Text fontWeight='bold'>Items</Text>
                            </Flex>
                        </Flex>
                    </DrawerHeader>
                    <Divider />

                    <DrawerBody>
                        <Flex w='full' h='1000px' bg='darkgrey' flexDir='column' justifyContent='space-between'>
                            {cart.cart.cart.map(item => (
                                <Flex h='100px' w='full' key={item.id} justifyContent='space-between' alignItems='center' mb={2}>
                                    <Flex >
                                        <Image src={item.image} w='100px' h='100px' />
                                        <Text>
                                            {
                                                item.title.length > 40 ? 
                                                `${item.title.slice(0, 40)}...`
                                                :
                                                `${item.title}`
                                            }
                                        </Text>
                                        {/* <Text>{truncatedTitle}</Text> */}
                                    </Flex>
                                    <Button onClick={() => handleRemoveAndRefresh(item.id)} >X</Button>
                                </Flex>
                            ))}

                            <Flex w='100%' h='400px' bg='red'>

                            </Flex>
                        </Flex>
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