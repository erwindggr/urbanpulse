// TagLine.js

import React from 'react';
import { Flex, Box, Text, Divider } from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react";

export default function TagLine() {
    const [isPhoneScreen] = useMediaQuery("(max-width: 1200px)");

    return (
        <Flex
            flexDirection={isPhoneScreen ? "column" : "row"}
            // py={isPhoneScreen ? "25px" : "none"}
            p={10}
            align="center"
            justify="center"
            // height={isPhoneScreen ? "550px" : "400px"} // Adjust the height based on your design preferences
        >
            {/* Item 1 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%'>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                        Craftsmanship
                    </Text>

                    <Text fontSize="md">
                        Sustainability Meets Artistry – 100% Original, Handcrafted for You
                    </Text>
                </Box>
                <Divider orientation={isPhoneScreen ? "horizontal" : "vertical"} h={isPhoneScreen ? "0px" : "100px"} mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} />
            </Flex>
            {/* Item 2 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%'>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                        Artistry Showcase
                    </Text>

                    <Text fontSize="md">
                        Elevate Fashion Sustainably with Originality
                    </Text>
                </Box>
                <Divider orientation={isPhoneScreen ? "horizontal" : "vertical"} h={isPhoneScreen ? "0px" : "100px"} mt={isPhoneScreen ? "20px" : "0"} mx={isPhoneScreen ? "0" : "20px"} />
            </Flex>
            {/* Item 3 */}
            <Flex textAlign="center" p={4} w={isPhoneScreen ? '95%' : '350px'} flexDirection={isPhoneScreen ? "column" : "row"}>
                <Box w='100%' h='100px'>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                        Personal Style
                    </Text>

                    <Text fontSize="md">
                        Unwrap the Future of Style, Where Your Style Meets the Planet
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}
