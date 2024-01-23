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
    Image
} from "@chakra-ui/react";
import logo from "../image/logo_circle.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username: userName,
                password: password,
            });

            // Assuming the response contains a token
            const token = response.data.token;

            // Save token to local storage
            localStorage.setItem("userToken", token);
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
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.200", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack mb={5} align={"center"} bg="gray.300" borderRadius={50}>
                        <Image src={logo} w="200px" />
                    </Stack>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
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
                                <Checkbox>Remember me</Checkbox>
                                <Text color={"blue.400"}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={handleLogin}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        {error && (
                            <Text color={"red.500"} fontSize={"sm"}>
                                {error}
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
