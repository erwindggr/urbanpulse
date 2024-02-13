import { Flex, Text, Heading } from "@chakra-ui/react";
import bg from '../image/aboutSVG.svg';
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function About() {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    return (
        <Flex w='100%' justifyContent='center' alignItems='center' bg='#f7f7f5' bgImage={bg}>
            <Flex w={isPhoneScreen ? '350px' : '550px'} flexDirection='column' my={20}>
                <Heading textAlign="left" size={isPhoneScreen ? 'md' : 'lg'} fontWeight="700" mb="4" fontFamily="'Red Hat Display', sans-serif" >
                    About Us
                </Heading>
                <Text textAlign="left" fontSize={isPhoneScreen ? '13px' : '16px'} fontWeight={400} fontFamily="'Lexend', sans-serif" >
                    Greetings, Urban Explorers! Welcome to the realm of Urban Pulse, a sanctuary where the rhythm of the city harmonizes with an understated elegance. In the urban symphony, we gracefully navigate the juxtaposition of style and ecological responsibility.
                </Text>
                <Text textAlign="left" fontSize={isPhoneScreen ? '13px' : '16px'} mt={isPhoneScreen ? '3' : '7'} fontWeight={400} fontFamily="'Lexend', sans-serif">
                    Journey with us into the essence of urban mystery. Redefine your style with a conscious cadence. In its quiet profundity, <br /> Urban Pulse - Your Urban Statement.
                </Text>
            </Flex>
        </Flex >
    )
}