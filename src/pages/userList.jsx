import { Flex, Text, Box } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [users, setUsers] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getAllUser = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/users");
            setUsers(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])
    return (
        <Flex w='100%' minH='100vh' bg='gray' alignItems='center'>
            <Flex px={5} py={10} overflowY='auto' w={isPhoneScreen ? '95%' : '500px'} h='700px' bg='white' m='0 auto' flexDir='column'>
                {
                    users?.map((user, index) => (
                        <Box key={index}>
                            <Flex w='full' >
                                <Flex w='5%' alignItems='center' ml={3} h='40px'>
                                    <Text>{index + 1 + "."}</Text>
                                </Flex>
                                <Flex alignItems='center' ml={3}>
                                    <Text>{capitalizeFirstLetter(user.name.firstname) + " " + capitalizeFirstLetter(user.name.lastname)}</Text>
                                </Flex>
                            </Flex>
                            <Flex w='full' mb={5} h='60px' borderBottom='1px solid black'>
                                <Flex w='full' flexDir='column'>
                                    <Text ml={11}>
                                        Username = {user.username}
                                    </Text>
                                    <Text ml={11}>
                                        Password = {user.password}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                    ))
                }
            </Flex>
        </Flex>
    )
}