import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Flex, Heading, Button } from "@chakra-ui/react";
import ItemCard from "./itemCard";
import { useEffect } from "react";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function Section(props) {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [sliderRef] = useKeenSlider({
        loop: isPhoneScreen ? true : false,
        mode: "free-snap",
        slides: {
            perView: isPhoneScreen ? 5 : 4,
            spacing: 10,
        },
    })

    return (
        <Flex w='1440px' p="30px 0 50px 0" m='70px auto' flexDirection='column' >
            <Flex w='95%' m='0 auto' alignItems={isPhoneScreen ? 'start' : 'center'} justifyContent='start' flexDirection={isPhoneScreen ? 'column' : 'row'} mb={10}>
                <Heading textAlign='center' size={isPhoneScreen ? 'md' : 'lg'}>{props.productName}</Heading>
                {
                    isPhoneScreen ? (
                        <></>
                    ) : (
                        <Button mx={isPhoneScreen ? '0' : '10'} my={isPhoneScreen ? '2' : '0'} borderRadius={30} border='2px solid black'>{props.buttonTitle}</Button>
                    )
                }

            </Flex>

            {
                props.data ? (
                    <Flex w='90%' m='0 auto' className="keen-slider" ref={sliderRef} >
                        {
                            props.data?.slice().map((item, index) => (
                                <Flex className="keen-slider__slide" key={index}>
                                    <ItemCard key={index} data={item} />
                                </Flex>
                            ))
                        }
                    </Flex>
                ) : (
                    <></>
                )
            }

            <Flex w='95%' m='0 auto'>
                {
                    isPhoneScreen ? (
                        <Button borderRadius={30} border='2px solid black' size='sm' my={2}>
                            {props.buttonTitle}
                        </Button>
                    ) : (
                        <></>
                    )
                }
            </Flex>
        </Flex>
    )
}