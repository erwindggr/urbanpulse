import { Flex, Image, Text, Heading } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function Content(props) {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();

    return (
        <Flex w={isPhoneScreen ? '100%' : '90%'} h={isPhoneScreen ? '400px' : '830px'} bg='gray' m='0px auto 100px' position='relative'>
            <Image
                src={props.source}
                w='100%' objectFit='cover'
            />
            <Flex
                w={isPhoneScreen ? '50%' : '20%'}
                m='0 auto'
                position='absolute'
                justifyContent='center' alignItems='center'
                right={props.rightPercentage} top={props.topPercentage}
                flexDirection='column'
            >
                <Heading color='#2D9596' fontFamily="'Red Hat Display', sans-serif">
                    {props.title}
                </Heading>
                <Text fontSize='20px' fontFamily="'Lexend', sans-serif" color='grey' mt={2}>
                    {props.message}
                </Text>
            </Flex>
        </Flex>
    )
}