import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Flex, Heading, Button, Link } from "@chakra-ui/react";
import ItemCard from "./itemCard";
import { useEffect } from "react";
import { usePhoneScreenMediaQuery, useTabletScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function Section(props) {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [isTabletScreen] = useTabletScreenMediaQuery();
    const [sliderRef] = useKeenSlider({
        loop: isTabletScreen ? true : (isPhoneScreen ? true : false),
        mode: "free-snap",
        slides: {
            perView: props.data > 4 ? (isPhoneScreen ? 2 : 3) : 3,
            spacing: 5,
        },
    })

    return (
        <Flex w='1400px' p="30px 0 50px 0" m='70px auto' flexDirection='column' >
            <Flex w='95%' m='0 auto' alignItems={isPhoneScreen ? 'start' : 'center'} justifyContent='start' flexDirection={isPhoneScreen ? 'column' : 'row'} mb={10}>
                <Heading textAlign='center' size={isPhoneScreen ? 'md' : '2xl'} fontFamily="'Red Hat Display', sans-serif">Top Picks</Heading>
                {
                    isPhoneScreen ? (
                        <></>
                    ) : (
                        <Link href="/shop/women's%20clothing">
                            <Button
                                mx={isPhoneScreen ? '0' : '10'}
                                my={isPhoneScreen ? '2' : '0'}
                                bg='none'
                                borderRadius={30}
                                border='1px solid black'
                                fontWeight='400' fontSize='13px'
                                _hover={{ bg: 'none', borderColor: '#2D9596', color: '#2D9596' }}
                                fontFamily="'Lexend', sans-serif"
                            >
                                {props.buttonTitle}
                            </Button>
                        </Link>
                    )
                }

            </Flex>

            {
                props.data ? (
                    <Flex w='90%' m='0 auto' className="keen-slider" ref={sliderRef} >
                        {
                            props.data?.slice().map((item, index) => (
                                <Flex className="keen-slider__slide" key={index}>
                                    {/* <Link href={`/product/${item.id}`}> */}
                                    <ItemCard key={index} data={item} />
                                    {/* </Link> */}
                                </Flex>
                            ))
                        }
                    </Flex>
                ) : (
                    <></>
                )
            }

            <Flex w='95%' m='0 auto' mt={5}>
                {
                    isPhoneScreen ? (
                        <Link href="/shop/women's%20clothing">
                            <Button
                                mx={isPhoneScreen ? '0' : '10'}
                                my={isPhoneScreen ? '2' : '0'}
                                bg='none'
                                borderRadius={30}
                                border='1px solid black'
                                fontWeight='400' fontSize='13px'
                                _hover={{ bg: 'none', borderColor: '#2D9596', color: '#2D9596' }}
                            >
                                {props.buttonTitle}
                            </Button>
                        </Link>
                    ) : (
                        <></>
                    )
                }
            </Flex>
        </Flex>
    )
}