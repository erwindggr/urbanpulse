import {
    useColorMode, Box
} from "@chakra-ui/react";
import { useState } from "react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isSlid, setIsSlid] = useState(false);
    const themeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
    const themeBg = colorMode === 'light' ? 'white' : '#1a202c';
    const themeButton = colorMode === 'light' ? '#1a202c' : '#424b5c';
    const themeBorder = colorMode === 'light' ? '2px solid black' : '2px solid white';

    const handleToggle = () => {
        toggleColorMode();
        setIsSlid(!isSlid);
    };

    const slideStyles = {
        transition: 'transform 0.3s ease-in-out',
        transform: isSlid ? 'translateX(10px)' : 'translateX(0)',
    };

    const scaledStyles = {
        transform: 'scale(0.6)',
    };

    return (
        <Box borderRadius={50} w='65px' h='39px' border={themeBorder} bg={themeButton} style={scaledStyles}>
            <Box as='button' w='51px' h="35px" onClick={handleToggle} style={slideStyles} borderRadius={50} bg={themeBg}>
                {themeIcon}
            </Box>
        </Box>
    )
}