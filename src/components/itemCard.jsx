import React from "react";
import { Flex, Text, Image, filter } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function ItemCard(props) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPhoneScreen] = usePhoneScreenMediaQuery();

    const truncatedTitle = props.data.title.length > 55
        ? `${props.data.title.slice(0, 55)}...`
        : props.data.title;

    return (
        <Flex
            w={isPhoneScreen ? "250px" : "300px"} h={isPhoneScreen ? "350px" : "400px"} mx={7} flexDirection='column'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cursor={isHovered ? "pointer" : 'auto'}
            filter={isHovered ? "brightness(0.9)" : "brightness(1)"}
            transition="filter 0.3s ease-in-out"
        >
            <Flex
                w='100%' h='70%' justifyContent='center' bg='white'  p={5}
                overflow='hidden' borderRadius={10}
            >
                <Image
                    w='auto' h='100%' src={props.data.image} objectFit='cover'
                    transition="transform 0.3s ease-in-out"
                    transform={isHovered ? "scale(1.05)" : "scale(1)"}
                />
            </Flex>
            <Flex w='100%' h='100px' flexDirection='column' py={2} justifyContent='space-between'>

                <Flex w='90%' h='50px' m='0 auto' overflow='hidden'>
                    <Text fontWeight='medium'>{truncatedTitle}</Text>
                </Flex>
                <Flex w='90%' m='0 auto' overflow='hidden' pt={1}>
                    <Text fontWeight='bold' fontSize='lg'>$ {props.data.price}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}