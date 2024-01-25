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
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";
import { ChevronDownIcon } from "@chakra-ui/icons";


export default function Shop() {
    const { category } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [sortOrder, setSortOrder] = useState("normal");

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

            <Flex w={isPhoneScreen ? '100%' : '1400px'} mx='auto' flexDir='column' minH='30vh' my={20} >
                <Heading py={5} size='lg'>
                    {category ? `All ${category}` : "Test Category"}
                </Heading>
                <Flex mb={20}>
                    <Menu>
                        <MenuButton as={Button} colorScheme="teal" mb={4}>
                            Sort by Price
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleSortChange("normal")}>Reset</MenuItem>
                            <MenuItem onClick={() => handleSortChange("Ascending")}>Low to high</MenuItem>
                            <MenuItem onClick={() => handleSortChange("Descending")}>High to low</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                {sortedData ? (
                    <Grid w={isPhoneScreen ? '100%' : '1400px'} m='0 auto' templateColumns={isPhoneScreen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'} gap={6} >
                        {sortedData.map((item, index) => (
                            <Flex className="keen-slider__slide" key={index}>
                                <Link href={`/product/${item.id}`}>
                                    <ItemCard key={index} data={item} />
                                </Link>
                            </Flex>
                        ))}
                    </Grid>
                ) : (
                    <Grid w={isPhoneScreen ? '100%' : '1400px'} m='0 auto' templateColumns={isPhoneScreen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'} gap={6}>
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                    </Grid>
                )}
            </Flex>

            <Footer />
        </Flex >
    )
}