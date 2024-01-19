import React from "react";
import { Flex, Text, Image, filter } from "@chakra-ui/react";

export default function ItemCard(props) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Flex
            w='300px' h='400px' mx={7} flexDirection='column'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cursor={isHovered ? "pointer" : 'auto'}
        >
            <Flex
                w='100%' h='70%' justifyContent='center' bg='white' border='1px solid gray' p={5}

            >
                <Image
                    w='auto' h='100%' src={props.data.image} objectFit='cover'
                    transition="transform 0.3s ease-in-out"
                    transform={isHovered ? "scale(1.05)" : "scale(1)"}
                />
            </Flex>
            <Flex w='full' h='full' flexDirection='column' py={2}>

                <Flex w='90%' h='50px' m='0 auto' overflow='hidden'>
                    <Text fontWeight='medium'>{props.data.title}</Text>
                </Flex>
                <Flex w='90%' m='0 auto' overflow='hidden' pt={1}>
                    <Text fontWeight='bold' fontSize='lg'>$ {props.data.price}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}