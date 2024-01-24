import { Flex, Text, Image, Heading, Badge, Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ProductPage() {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

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
            <Text key={index}>{line.trim()}</Text>
        ));

        return descriptionLines;
    };

    return (
        <Flex flexDir='column' minH='100vh'>
            <Navbar />

            <Flex w='65%' h='700px' m='0 auto' justifyContent='space-between' my={20}>
                {
                    productData ? (
                        <Flex w='full' justifyContent='space-between'>
                            <Flex w='40%'>
                                <Image w='full' h='auto' objectFit='contain' src={productData.image} />
                            </Flex>

                            <Flex w='50%' p={10} flexDir='column' justifyContent='space-between'>
                                <Box>
                                    <Heading size='sm'>
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

                                <Flex mt={4} align="center" flexDir='column'>

                                    <Button m='0 auto' colorScheme='teal' variant='outline' w='full'>
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