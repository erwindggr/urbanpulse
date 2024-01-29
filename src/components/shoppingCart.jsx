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
import { ChevronLeftIcon, ChevronRightIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { store } from "../redux/Stores/CartStore";
import { removeFromCart, incrementCartItem, decrementCartItem } from "../redux/Action/CartAction";

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
        handleDecrement();
        handleIncrement();
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

    const handleIncrement = (productId) => {
        store.dispatch(incrementCartItem(productId));
    };

    const handleDecrement = (productId) => {
        store.dispatch(decrementCartItem(productId));
    };

    const calculateTotal = () => {
        return cart.cart.cart.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
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
                        {/* <Flex w='full' bg='darkgrey' flexDir='column' justifyContent='space-between'> */}
                        {cart.cart.cart.map(item => (
                            <Flex h='120px' w='full' key={item.id} justifyContent='space-between' alignItems='center' mb={2}>
                                <Image bg='white' src={item.image} w='20%' h='90px' objectFit='scale-down' ml={2} borderRadius='10' />
                                <Flex w='60%' flexDir='column'>
                                    <Text>
                                        {
                                            item.title.length > 25 ?
                                                `${item.title.slice(0, 25)}...`
                                                :
                                                `${item.title}`
                                        }
                                    </Text>
                                    <Text>{item.price}</Text>
                                    <Flex justifyContent='flex-end'>
                                        <Flex border='1px solid black' borderRadius={5} p={1}>
                                            <IconButton size='xs' borderRadius='full' onClick={() => handleDecrement(item.id)} icon={<ChevronLeftIcon />} />
                                            <Text mx={3}>
                                                {item.quantity}
                                            </Text>
                                            <IconButton size='xs' borderRadius='full' onClick={() => handleIncrement(item.id)} icon={<ChevronRightIcon />} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <IconButton mr={2} size='xs' icon={<SmallCloseIcon/>} onClick={() => handleRemoveAndRefresh(item.id)} borderRadius='full' bg='red' color='white' />
                            </Flex>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Flex w='full' flexDir='column'>
                            <Flex w='full' justifyContent='space-between' py={2}>
                                <Text>Total</Text>

                                {
                                    calculateTotal() == 0 ? (
                                        <></>
                                    ) : (
                                        <Text fontWeight='bold'>
                                            Total : {calculateTotal()}
                                        </Text>
                                    )
                                }

                            </Flex>

                            <Button colorScheme='blue' w='full' my={5}>
                                Checkout
                            </Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}