import {
    IconButton,
    Drawer, Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    DrawerCloseButton,
    Image, Tooltip
} from "@chakra-ui/react";
import { Flex, Heading, Text, Divider } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext } from "react";
import { LuShoppingCart } from "react-icons/lu";
// import { removeFromCart, incrementCartItem, decrementCartItem } from "../redux/Action/CartAction";
import { FiShoppingBag, FiX, FiTrash2 } from "react-icons/fi";
import { CartContext } from "../context/cartContext";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export default function ShoppingCart(props) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isNarrowScreen] = useMediaQuery("(max-width: 1450px)");
    // const cart = store.getState();
    const btnRef = useRef();
    const { cart, removeFromCart, clearCart, increaseAmount, decreaseAmount } = useContext(CartContext);

    useEffect(() => {
        setIsSmallScreen(isNarrowScreen);
    }, [isNarrowScreen]);

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + item.amount * item.price;
        }, 0).toFixed(2);
    };

    return (
        <>
            <IconButton
                icon={<FiShoppingBag size={isSmallScreen ? '22px' : '29px'} />}
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
                    <DrawerHeader bg='#2D9596'>
                        <DrawerCloseButton color='white' pos='absolute' top={4} />
                        <Flex justifyContent='space-between' w='full' >
                            <Heading size='lg' color='white'>Shopping Cart</Heading>
                            {/* <Text fontWeight='bold' color='white' mr={10}>{cart.cart.cart.length} Items</Text> */}
                        </Flex>
                    </DrawerHeader>
                    <Divider />

                    <DrawerBody>
                        {/* <Flex w='full' bg='darkgrey' flexDir='column' justifyContent='space-between'> */}
                        {cart.map(item => (
                            <Flex h='120px' w='full' key={item.id} justifyContent='space-between' alignItems='center' mb={2} borderBottom='1px solid gray' fontFamily="'Red Hat Display', sans-serif">
                                <Image bg='white' src={item.image} w='20%' h='90px' objectFit='scale-down' ml={2} borderRadius='10' />
                                <Flex w='60%' flexDir='column'>
                                    <Text fontWeight={500}>
                                        {
                                            item.title.length > 25 ?
                                                `${item.title.slice(0, 25)}...`
                                                :
                                                `${item.title}`
                                        }
                                    </Text>
                                    <Text fontSize='14px' fontWeight='400' color='grey'>$ {item.price}</Text>
                                    <Flex justifyContent='space-between'>
                                        <Flex p={1}>
                                            <IconButton size='xs' borderRadius='full' icon={<IoIosRemove />} bg='none' onClick={() => decreaseAmount(item.id)} />
                                            <Text mx={3} px={5} borderBottom='1px solid #2D9596'>
                                                {item.amount}
                                            </Text>
                                            <IconButton size='xs' borderRadius='full' icon={<IoIosAdd />} bg='none' onClick={() => increaseAmount(item.id)} />
                                        </Flex>
                                        <Text fontWeight='500' fontSize='14px'>
                                            $ {parseFloat(item.amount * item.price).toFixed(2)}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <IconButton onClick={() => removeFromCart(item.id)} mr={2} size='xs' icon={<FiX />} borderRadius='full' bg='none' />
                            </Flex>
                        ))}
                        {/* <Flex>
                            {
                                cart.map((item) => {
                                    return <Flex>
                                        item
                                    </Flex>
                                })
                            }
                        </Flex> */}
                    </DrawerBody>

                    <DrawerFooter borderTop='1px solid gray'>
                        <Flex w='full' flexDir='column' fontFamily="'Red Hat Display', sans-serif">
                            <Flex w='full' justifyContent='space-between' py={5}>
                                <Text fontWeight={500}>
                                    Subtotal
                                </Text>

                                {
                                    calculateTotal() == 0 ? (
                                        <></>
                                    ) : (
                                        <Text fontWeight='500'>
                                            $ {calculateTotal()}
                                        </Text>
                                    )
                                }

                            </Flex>

                            <Flex alignItems='center'>
                                <Button
                                    bg='#2D9596' color='white'
                                    w='full' my={5} fontWeight={300}
                                    _hover={{ bg: 'white', color: '#2D9596', border: '1px solid #2D9596' }}
                                >
                                    Checkout
                                </Button>
                                <Tooltip label='Clear all' bg='maroon' hasArrow fontSize='md' placement="top-start">
                                    <IconButton
                                        color='white' icon={<FiTrash2 />}
                                        ml={5} bg='maroon' onClick={() => clearCart()}
                                        _hover={{ bg: 'white', color: 'maroon', border: '1px solid maroon' }}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}