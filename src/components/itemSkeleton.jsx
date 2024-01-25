import React from "react";
import { Flex, Stack, Skeleton } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function ItemSkeleton() {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();

    return (
        <Flex
            w={isPhoneScreen ? "250px" : "350px"} h={isPhoneScreen ? "350px" : "400px"} mx={7} flexDirection='column'
        >
            <Skeleton
                w='100%' h='70%' justifyContent='center' bg='white' p={5}
                overflow='hidden' borderRadius={10}
            />
            <Flex w='full' p={3}>
                <Stack w='full'>
                    <Skeleton w='full' h='10px' />
                    <Skeleton w='80%' h='10px' />
                    <Skeleton w='20%' h='15px' />
                </Stack>
            </Flex>
        </Flex>
    )
}