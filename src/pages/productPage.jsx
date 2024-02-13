import { Flex, Text, Image, Heading, Badge, Box, Button, useToast, useConst } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { usePhoneScreenMediaQuery, useTabletScreenMediaQuery } from "../mediaQuery/mediaQueries";
// import store from "../redux/Stores/CartStore";
import { CartContext } from "../context/cartContext";

export default function ProductPage() {
    const { addToCart } = useContext(CartContext)
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const toast = useToast();
    const { id } = useParams();
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [isTabletScreen] = useTabletScreenMediaQuery();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProductData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchProduct();
    }, []);

    const renderDescriptionLines = () => {
        if (!productData || !productData.description) {
            return null;
        }

        const descriptionLines = productData.description.split(',').map((line, index) => (
            <Text fontSize='sm' key={index}>{line.trim()}</Text>
        ));

        return descriptionLines;
    };

    // const handleAddToCart = () => {
    //     const userToken = localStorage.getItem("userToken");

    //     if (!userToken) {
    //         toast({
    //             title: "Please login first",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         });
    //         return;
    //     }
    //     store.dispatch(addToCart(productData));
    //     toast({
    //         title: "Successfully added to cart",
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //     });
    // };

    return (
        <Flex flexDir='column' minH='100vh'>
            <Navbar />

            <Flex w='65%' minH='30vh' m='0 auto' justifyContent='space-between' my={20}>
                {
                    productData ? (
                        <Flex w='full' justifyContent='space-between' flexDir={isPhoneScreen ? 'column' : 'row'}>
                            <Flex w={isPhoneScreen ? '100%' : '40%'}>
                                <Image w='100%' h='500' objectFit='scale-down' src={productData.image} />
                            </Flex>

                            <Flex w={isPhoneScreen ? '100%' : '50%'} p={isPhoneScreen ? 'none' : 10} mt={isPhoneScreen ? 10 : 0} flexDir='column' justifyContent='space-between'>
                                <Box>
                                    <Heading size='md'>
                                        {productData.title}
                                    </Heading>
                                    <Flex w='full' my={3}>
                                        <Badge variant="subtle" colorScheme="green">
                                            {productData.rating.rate} ★
                                        </Badge>
                                        <Text ml={2}>{productData.rating.count} reviews</Text>
                                    </Flex>
                                    <Text fontSize='lg' fontWeight='bold'>
                                        $ {productData.price}
                                    </Text>
                                    <Flex flexDir='column' mt={5}>
                                        {renderDescriptionLines()}
                                    </Flex>
                                </Box>

                                <Flex mt={isPhoneScreen ? 8 : 0} align="center" flexDir='column'>

                                    <Button m='0 auto' colorScheme='teal' variant='outline' w='full'
                                        onClick={() => addToCart(productData, productData.id)}
                                    >
                                        Add to cart
                                    </Button>
                                </Flex>

                            </Flex>
                        </Flex>
                    ) : (
                        <>
                        </>
                    )
                }
            </Flex>

            <Footer />
        </Flex>
    )
}