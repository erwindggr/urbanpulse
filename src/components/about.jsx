import { Flex, Text, Heading } from "@chakra-ui/react"

export default function About() {
    return (
        <Flex w='100%' justifyContent='center' alignItems='center' bg='#FAEF9B'>
            <Flex w='700px' flexDirection='column' my={20}>
                <Heading textAlign="left" size='lg' fontWeight="500" mb="4">
                    About Us
                </Heading>
                <Text textAlign="left" fontSize="20px" >
                    Greetings, Urban Explorers! Welcome to the realm of Urban Pulse, a sanctuary where the rhythm of the city harmonizes with an understated elegance. In the urban symphony, we gracefully navigate the juxtaposition of style and ecological responsibility.
                </Text>
                <Text textAlign="left" fontSize="20px" mt="7">
                    Journey with us into the essence of urban mystery. Redefine your style with a conscious cadence. In its quiet profundity, <br /> Urban Pulse - Your Urban Statement.
                </Text>
            </Flex>
        </Flex >
    )
}