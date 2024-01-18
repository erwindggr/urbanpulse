import Navbar from "../components/navbar";
import HeroImage from "../components/heroImage";
import TagLine from "../components/tagline";
import { Image, Grid, GridItem, Flex, Heading, Button } from "@chakra-ui/react";
import ItemCard from "../components/itemCard";
import { useMediaQuery } from "@chakra-ui/react";
import Section from "../components/section";
import s1 from "../image/Section-Man.jpg";
import s2 from "../image/section-woman.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function Main() {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);

    const [isPhoneScreen] = useMediaQuery("(max-width: 800px)");
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 4,
            spacing: 10,
        },
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products/category/women's clothing");
                setProductData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchProduct();
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
                    <Image src={s2} w='100%' />
                </GridItem>
                <GridItem w={isPhoneScreen ? '100%' : '45%'} bg='blue.500' >
                    <Image src={s1} w='100%' />
                </GridItem>
            </Grid>

            <Section data={productData} productName={"Women Fashion"} buttonTitle={"Shop Women Fashion"} />
        </>
    )
}