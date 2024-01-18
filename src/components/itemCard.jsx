import { Flex, Text, Image, filter, Center } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function ItemCard(props) {
    const [isPhoneScreen] = useMediaQuery("(max-width: 1200px)");

    return (
        <Flex w={isPhoneScreen ? "200px" : "300px"} h={isPhoneScreen ? "300px" : "400px"} mx={7} flexDirection='column'>
            <Flex w='100%' h='70%' justifyContent='center' bg='white' border='1px solid gray' p={5} >
                <Image w='auto' h='100%' src={props.data.image} objectFit='cover' />
            </Flex>
            <Flex w='full' h='full' flexDirection='column' py={2}>

                <Flex w='90%' h='50px' m='0 auto' overflow='hidden'>
                    <Text>{props.data.title}</Text>
                </Flex>
                <Flex w='90%' h='50px' m='0 auto' overflow='hidden'>
                    <Text fontWeight='bold'>$ {props.data.price}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}