// TagLine.js
import React from 'react';
import { Flex, Box, Text, Divider } from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery, useTabletScreenMediaQuery } from '../mediaQuery/mediaQueries';

export default function TagLine() {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [isTabletScreen] = useTabletScreenMediaQuery();

    return (
        <Flex
            flexDirection={isPhoneScreen ? "column" : "row"}
            // py={isPhoneScreen ? "25px" : "none"}
            p={isPhoneScreen ? 6 : 10}
            align="center"
            justify="center"
            mt={isPhoneScreen ? 5 : 10} mb={isPhoneScreen ? 5 : 10}
        // height={isPhoneScreen ? "550px" : "400px"} // Adjust the height based on your design preferences
        >
            {/* Item 1 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%'>
                    <Text fontWeight="bold" fontSize={isPhoneScreen? 'lg' : 'xl'} mb={isPhoneScreen ? 1 : 2} color='#2D9596' fontFamily="'Red Hat Display', sans-serif">
                        Craftsmanship
                    </Text>

                    <Text fontFamily="'Lexend', sans-serif" fontSize={isPhoneScreen? 'sm' : 'md'}>
                        Sustainability Meets Artistry – 100% Original, Handcrafted for You
                    </Text>
                </Box>
                <Flex w={isPhoneScreen ? '100%' : '0px'} h={isPhoneScreen ? '0px' : '100px'} borderTop='1px solid #2D9596' borderRight='1px solid #2D9596' mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} />
                {/* <Divider orientation={isPhoneScreen ? "horizontal" : "vertical"} h={isPhoneScreen ? "0px" : "100px"} mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} /> */}
            </Flex>
            {/* Item 2 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%'>
                    <Text fontWeight="bold" fontSize={isPhoneScreen? 'lg' : 'xl'} mb={isPhoneScreen ? 1 : 2} color='#2D9596' fontFamily="'Red Hat Display', sans-serif">
                        Artistry Showcase
                    </Text>

                    <Text fontSize={isPhoneScreen? 'sm' : 'md'} fontFamily="'Lexend', sans-serif">
                        Elevate Fashion Sustainably with Originality
                    </Text>
                </Box>
                <Flex w={isPhoneScreen ? '100%' : '0px'} h={isPhoneScreen ? '0px' : '100px'} borderTop='1px solid #2D9596' borderRight='1px solid #2D9596' mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} />
                {/* <Divider orientation={isPhoneScreen ? "horizontal" : "vertical"} h={isPhoneScreen ? "0px" : "100px"} mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} /> */}
            </Flex>
            {/* Item 3 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%' h='100px'>
                    <Text fontWeight="bold" fontSize={isPhoneScreen? 'lg' : 'xl'} mb={isPhoneScreen ? 1 : 2} color='#2D9596' fontFamily="'Red Hat Display', sans-serif">
                        Personal Style
                    </Text>

                    <Text fontSize={isPhoneScreen? 'sm' : 'md'} fontFamily="'Lexend', sans-serif">
                        Unwrap the Future of Style, Where Your Style Meets the Planet
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}
