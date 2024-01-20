import { Flex, Image, Text, Heading } from "@chakra-ui/react"

export default function Content(props) {
    return (
        <Flex w='95%' h='830px' bg='gray' m='0px auto 50px' position='relative'>
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