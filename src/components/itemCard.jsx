import React, { useContext } from "react";
import { Flex, Text, Image, Button, Link } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";
import { CartContext } from "../context/cartContext";

export default function ItemCard(props) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const { addToCart } = useContext(CartContext);
    const { id, image, category, title, price } = props.data;

    const truncatedTitle = props.data.title.length > 55
        ? `${props.data.title.slice(0, 55)}...`
        : props.data.title;

    return (
        <Flex flexDir='column'>
            <Link href={`/product/${props.data.id}`} _hover={{ textDecoration: 'none' }}>
                <Flex
                    w={isPhoneScreen ? "280px" : "300px"} h={isPhoneScreen ? "350px" : "400px"} mx={7} flexDirection='column'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    cursor={isHovered ? "pointer" : 'auto'}
                    transition="filter 0.3s ease-in-out"
                >
                    <Flex
                        w='100%' h='70%' justifyContent='center' bg='white' p={5}
                        overflow='hidden' borderRadius={10}
                    >
                        <Image
                            w='auto' h='100%' src={props.data.image} objectFit='scale-down'
                            transition="transform 0.3s ease-in-out"
                            transform={isHovered ? "scale(1.05)" : "scale(1)"}
                        />
                    </Flex>
                    <Flex w='100%' h='100px' flexDirection='column' py={2} justifyContent='space-between'>

                        <Flex w='90%' h='50px' m='0 auto' overflow='hidden'>
                            <Text fontWeight='medium' fontFamily="'Red Hat Display', sans-serif">{truncatedTitle}</Text>
                        </Flex>
                        <Flex w='90%' m='0 auto' overflow='hidden' pt={1}>
                            <Text fontWeight='bold' fontSize='lg' fontFamily="'Red Hat Display', sans-serif">$ {props.data.price}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <Flex w='85%' m='0 auto'>
                <Button w='95%' m='0 auto' fontWeight={300} color='white' bg='#2D9596' onClick={() => addToCart(props.data, props.data.id)} _hover={{ bg: '#1b6f71' }} fontFamily="'Red Hat Display', sans-serif">
                    Add to Cart
                </Button>
            </Flex>
        </Flex>
    )
}