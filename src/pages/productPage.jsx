import { Flex, Text, Image, Heading, Badge, Box, Button, useToast, useConst, ButtonGroup } from "@chakra-ui/react";
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
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorClick = (color) => {
        setSelectedColor(color === selectedColor ? null : color);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size === selectedSize ? null : size);
    };

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

        const descriptionLines = productData.description.split(/[,\.]/).map((line, index) => (
            <Text ml={5} fontSize='sm' key={index}>{line.trim()}</Text>
        ));

        return descriptionLines;
    };

    return (
        <Flex flexDir='column' minH='100vh'>
            <Navbar />

            <Flex w={isPhoneScreen ? '90%' : isTabletScreen ? '90%' : '65%'} minH='30vh' m='0 auto' justifyContent='space-between' my={20}>
                {
                    productData ? (
                        <Flex w='full' justifyContent='space-between' flexDir={isPhoneScreen ? 'column' : 'row'}>
                            <Flex w={isPhoneScreen ? '100%' : '40%'}>
                                <Image w='100%' h='500' objectFit='scale-down' src={productData.image} />
                            </Flex>

                            <Flex w={isPhoneScreen ? '100%' : '50%'} p={isPhoneScreen ? 'none' : 10} mt={isPhoneScreen ? 10 : 0} flexDir='column' justifyContent='space-between'>
                                <Box>
                                    <Heading size='lg'>
                                        {productData.title}
                                    </Heading>
                                    <Flex w='full' my={3}>
                                        <Badge variant="solid" colorScheme="green">
                                            {productData.rating.rate} ★
                                        </Badge>
                                        <Text ml={2} fontSize='xs' fontWeight='500' color='gray'>{productData.rating.count} reviews</Text>
                                    </Flex>
                                    <Text fontSize='lg' fontWeight='bold'>
                                        ${productData.price}
                                    </Text>
                                    {/* Color */}
                                    <Flex mt={3} flexDir='column'>
                                        <Text fontSize='sm' mr={2} fontWeight={500} >{selectedColor}</Text>
                                        <ButtonGroup spacing="3" mt={2}>
                                            <Button
                                                size='xs'
                                                bg="bisque"
                                                rounded="full"
                                                borderWidth={selectedColor === "Bisque" ? "2px" : "1px"}
                                                borderColor={selectedColor === "Bisque" ? "green" : "black"}
                                                
                                                onClick={() => handleColorClick("Bisque")}
                                            />
                                            <Button
                                                size='xs'
                                                bg="skyblue"
                                                rounded="full"
                                                borderWidth={selectedColor === "SkyBlue" ? "2px" : "1px"}
                                                borderColor={selectedColor === "SkyBlue" ? "green" : "black"}
                                                onClick={() => handleColorClick("SkyBlue")}
                                            />
                                            <Button
                                                size='xs'
                                                bg="gray"
                                                rounded="full"
                                                borderWidth={selectedColor === "Gray" ? "2px" : "1px"}
                                                borderColor={selectedColor === "Gray" ? "green" : "black"}
                                                onClick={() => handleColorClick("Gray")}
                                            />
                                        </ButtonGroup>
                                    </Flex>
                                    {/* Size */}
                                    <Flex mt={3} flexDir='column'>
                                        <Text fontSize='sm'>Available Sizes:</Text>
                                        <ButtonGroup spacing="4" mt={2}>
                                            {["XXS", "XS", "S", "M", "L", "XL"].map((size, index) => (
                                                <Button
                                                    key={index}
                                                    size='xs'
                                                    variant="ghost"
                                                    fontWeight={selectedSize === size ? "bold" : "normal"}
                                                    onClick={() => handleSizeClick(size)}
                                                    _hover={{ color: "green" }}
                                                >
                                                    {size}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Flex>

                                    <Flex mt={isPhoneScreen ? 8 : 0} align="center" flexDir='column'>

                                    <Button m='0 auto' colorScheme='teal' variant='solid' mt={3} w='full'
                                        onClick={() => addToCart(productData, productData.id)}
                                    >
                                        Add to cart
                                    </Button>
                                </Flex>

                                    <Flex flexDir='column' mt={5}>
                                        <Text color='gray' mb={4}>Descriptions : </Text>
                                        {renderDescriptionLines()}
                                    </Flex>
                                </Box>

                                {/* <Flex mt={isPhoneScreen ? 8 : 0} align="center" flexDir='column'>

                                    <Button m='0 auto' colorScheme='teal' variant='outline' w='full'
                                        onClick={() => addToCart(productData, productData.id)}
                                    >
                                        Add to cart
                                    </Button>
                                </Flex> */}

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