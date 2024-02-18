import React, { useState } from "react";
import axios from "axios";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Image,
    Link
} from "@chakra-ui/react";
import logo from "../image/logo_circle.png";
import { useNavigate } from "react-router-dom";
import bg from '../image/loginBG.jpg';

export default function Login() {
    const [userName, setUserName] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username: userName,
                password: password,
            });
            const users = await axios.get("https://fakestoreapi.com/users");

            const user = users.data.find(x => x.username === userName && x.password === password);
            // Assuming the response contains a token
            const token = response.data.token;
            // Save token to local storage
            localStorage.setItem("userToken", token);
            localStorage.setItem("userData", JSON.stringify(user));
            console.log(localStorage.getItem("userData"));
            navigate("/");
            // Handle any other logic, such as redirecting to another page
        } catch (error) {
            // Handle error
            console.error("Login failed:", error.message);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Flex
            w='100%' minH='100vh'
            bgImage={bg} bgPosition='center'
            justifyContent='center' alignItems='center'
            flexDir='column'
        >
            <Flex
                w='400px' flexDir='column'
                justifyContent='center' alignItems='center'
                bg='white' py={20}
            >
                <Flex bg='#2D9596' borderRadius='full' mb={5}>
                    <Image src={logo} w='200px' />
                </Flex>
                <Stack w='80%'>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Stack spacing={10}>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                        >
                        </Stack>
                        <Button
                            bg={"#2D9596"}
                            color={"white"}
                            _hover={{
                                bg: "#206a6b",
                            }}
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>

                    </Stack>
                    <Link href="/users" target="_blank">
                        <Text textAlign='center'>
                            See list of user
                        </Text>
                    </Link>
                    {error && (
                        <Text color={"red.500"} fontSize={"sm"}>
                            {error}
                        </Text>
                    )}
                </Stack>
            </Flex>
        </Flex>
    );
}
