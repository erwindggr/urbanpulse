import Navbar from "../components/navbar";
import HeroImage from "../components/heroImage";
import TagLine from "../components/tagline";
import { Image, Grid, GridItem, Flex, Heading, Button, Text } from "@chakra-ui/react";
import Section from "../components/section";
import s1 from "../image/S2.jpg";
import s2 from "../image/S1.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";
import Content from "../components/content";
import About from "../components/about";
import Footer from "../components/footer";
import content01 from "../image/content-01.jpg";
import content02 from "../image/content-02.jpg";
import BigButton from "../components/bigButton";

export default function Main() {
    const [productData, setProductData] = useState(null);
    const [productData2, setProductData2] = useState(null);
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);

    const [isPhoneScreen] = usePhoneScreenMediaQuery();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing");
                setProductData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchProduct2 = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
                setProductData2(response.data);
            } catch (error) {
                setError2(error);
            }
        };

        fetchProduct2();
    }, []);



    return (
        <>
            <Navbar />
            <HeroImage />
            <TagLine />

            <Grid
                templateColumns='repeat(2, 1fr)' gap={6} display='flex'
                justifyContent='Center' m='0 auto' pb={10} alignItems='center'
                flexDirection={isPhoneScreen ? "column" : "row"}
            >
                <GridItem w={isPhoneScreen ? '100%' : '45%'} bg='blue.500' >
                    <Flex w='100%' pos='relative'>
                        <Image src={s2} w='100%' />
                        <Flex mb={20} h='130px' flexDir='column' pos='absolute' bottom={2} w='100%' justifyContent='space-between' alignItems='center'>
                            <Heading size='2xl' color='white' mb={5} fontFamily="'Red Hat Display', sans-serif">Women's</Heading>
                            <BigButton text={"Explore"} link={"/shop/women's%20clothing"} />
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem w={isPhoneScreen ? '100%' : '45%'} bg='blue.500' >
                    <Flex w='100%' pos='relative'>
                        <Image src={s1} w='100%' />
                        <Flex mb={20} h='130px' flexDir='column' pos='absolute' bottom={2} w='100%' justifyContent='space-between' alignItems='center'>
                            <Heading size='2xl' color='white' mb={5} fontFamily="'Red Hat Display', sans-serif">Men's</Heading>
                            <BigButton text={"Explore"} link={"/shop/men's%20clothing"} />
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Flex w='100%' overflow='hidden'>
                <Section data={productData} productName={"Women's Fashion"} buttonTitle={"Shop Women's Fashion"} />
            </Flex>

            <Content
                source={content01} title='Experience Unmatched Quality in Every Thread'
                message=
                'Discover Superior Fabrics Crafted for Excellence' 
                rightPercentage={isPhoneScreen ? '40%' : '75%'}
                topPercentage={isPhoneScreen ? '10%' : '20%'}
            />

            {/* <Flex w='100%' overflow='hidden'>
                <Section data={productData2} productName={"Men's Fashion"} buttonTitle={"Shop Men's Fashion"} />
            </Flex>
            <Content
                source={content02} title='jewelery cool!'
                message='hehehehe' leftPercentage='10%'
                topPercentage='70%'
            /> */}
            <About />
            <Footer />
        </>
    )
}