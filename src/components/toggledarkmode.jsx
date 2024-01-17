import {
    useColorMode, Box, Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isSlid, setIsSlid] = useState(false);
    const themeIcon = colorMode === 'light' ? <MoonIcon boxSize='10px' /> : <SunIcon boxSize='12px' />;
    const themeBg = colorMode === 'light' ? '#BFCFE7' : 'orange';
    const themeButton = colorMode === 'light' ? '#3D3B40' : '#FAEF9B';
    const themeBorder = colorMode === 'light' ? '2px solid #332941' : '2px solid #FF6868';

    const handleToggle = () => {
        toggleColorMode();
        setIsSlid(!isSlid);
    };

    const slideStyles = {
        transition: 'transform 0.3s ease-in-out',
        transform: isSlid ? 'translateX(8px)' : 'translateX(0)',
    };

    return (
        <Box borderRadius={50} w='40px' h='23px' border={themeBorder} bg={themeButton}>
            <Flex as='button' w='28px' h="19px" onClick={handleToggle} style={slideStyles} borderRadius={50} bg={themeBg} alignItems='center' justifyContent='center'>
                {themeIcon}
            </Flex>
        </Box>
    )
}