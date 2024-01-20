import { Flex, Image, Text, Heading } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function Content(props) {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();

    return (
        <Flex w={isPhoneScreen ? '100%' : '85%'} h={isPhoneScreen ? '400px' : '830px'} bg='gray' m='0px auto 50px' position='relative'>
            <Image
                src={props.source}
                w='100%' objectFit='cover'
            />
            <Flex position='absolute' justifyContent='center' alignItems='center' left={props.leftPercentage} top={props.topPercentage} flexDirection='column'>
                <Heading>
                    {props.title}
                </Heading>
                <Text>
                    {props.message}
                </Text>
            </Flex>
        </Flex>
    )
}