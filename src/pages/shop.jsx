import {
    Flex, Heading, Grid, Link, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ItemCard from "../components/itemCard";
import ItemSkeleton from "../components/itemSkeleton";
import { usePhoneScreenMediaQuery, useTabletScreenMediaQuery } from "../mediaQuery/mediaQueries";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";


export default function Shop() {
    const { category } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [isTabletScreen] = useTabletScreenMediaQuery();
    const [sortOrder, setSortOrder] = useState("normal");
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
    };

    const sortData = () => {
        switch (sortOrder) {
            case "Ascending":
                return data.slice().sort((a, b) => a.price - b.price);
            case "Descending":
                return data.slice().sort((a, b) => b.price - a.price);
            default:
                return data;
        }
    };

    const sortedData = data ? sortData() : null;

    return (
        <Flex w='100%' minH='100vh' flexDir='column'>
            <Navbar />

            <Flex w={isPhoneScreen ? '100%' : (isTabletScreen ? '90%' : '1400px')} mx='auto' flexDir='column' minH='30vh' my={20} fontFamily="'Red Hat Display', sans-serif">
                <Heading py={isPhoneScreen ? '2' : '5'} size='lg' ml={isPhoneScreen ? '8' : '0'} fontFamily="'Red Hat Display', sans-serif">
                    {category ? `All ${category}` : "*"}
                </Heading>
                <Flex mb={20} ml={isPhoneScreen ? '8' : '0'}>
                    <Menu >
                        <MenuButton
                            as={Button} bg='none'
                            border='1px solid #2D9596'
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            color='#2D9596' mb={4}
                            size='sm'
                            rightIcon={isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={handleClick}
                        >
                            Sort by Price
                        </MenuButton>
                        <MenuList>
                            <MenuItem _hover={{ bg: "#2D9596", color: "white" }} onClick={() => handleSortChange("normal")}>Reset</MenuItem>
                            <MenuItem _hover={{ bg: "#2D9596", color: "white" }} onClick={() => handleSortChange("Ascending")}>Low to high</MenuItem>
                            <MenuItem _hover={{ bg: "#2D9596", color: "white" }} onClick={() => handleSortChange("Descending")}>High to low</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                {sortedData ? (
                    <Grid
                        w={isPhoneScreen ? '100%' : (isTabletScreen ? '90%' : '1400px')}
                        m='0 auto'
                        templateColumns={isPhoneScreen ? 'repeat(1, 1fr)' : (isTabletScreen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)')}
                        gap={isPhoneScreen ? 2 : (isTabletScreen ? 3 : 4)}
                    >
                        {sortedData.map((item, index) => (
                            <Flex key={index} m='0 auto'>
                                {/* <Link href={`/product/${item.id}`}> */}
                                <ItemCard key={index} data={item} />
                                {/* </Link> */}
                            </Flex>
                        ))}
                    </Grid>
                ) : (
                    <Grid
                        w={isPhoneScreen ? '100%' : (isTabletScreen ? '90%' : '1400px')}
                        m='0 auto'
                        templateColumns={isPhoneScreen ? 'repeat(1, 1fr)' : (isTabletScreen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)')}
                        gap={isPhoneScreen ? 2 : (isTabletScreen ? 3 : 4)}
                    >
                        <Flex m='0 auto'>
                            <ItemSkeleton />
                        </Flex>
                        <Flex m='0 auto'>
                            <ItemSkeleton />
                        </Flex>
                        <Flex m='0 auto'>
                            <ItemSkeleton />
                        </Flex>
                    </Grid>
                )}
            </Flex>

            <Footer />
        </Flex >
    )
}