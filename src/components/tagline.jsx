// TagLine.js

import React from 'react';
import { Flex, Box, Text, Divider } from '@chakra-ui/react';

export default function TagLine() {
    return (
        <Flex
            align="center"
            justify="center"
            height="200px" // Adjust the height based on your design preferences
        >
            {/* Item 1 */}
            <Box textAlign="center" p={4} w='350px'>
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Craftsmanship
                </Text>

                <Text fontSize="sm">
                    Elevate your style with meticulously handcrafted frames.
                </Text>
            </Box>
            <Divider orientation="vertical" mx={4} height='100px' />
            {/* Item 2 */}
            <Box textAlign="center" p={4} w='350px'>
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Cutting-Edge Fashion
                </Text>

                <Text fontSize="sm">
                    Stay ahead of trends with our fashion-forward frames and accessories.
                </Text>
            </Box>
            <Divider orientation="vertical" mx={4} height='100px' />
            {/* Item 3 */}
            <Box textAlign="center" p={4} w='350px'>
                <Text fontWeight="bold" mb={2}>
                    Smart Style
                </Text>
                <Text fontSize="sm">
                    Elevate your look and contribute to a sustainable future with our eco-conscious fashion.
                </Text>
            </Box>
        </Flex>
    );
}
