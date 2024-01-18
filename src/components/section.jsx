import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Flex, Heading, Button } from "@chakra-ui/react";
import ItemCard from "./itemCard";
import { useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";

export default function Section(props) {
    const [isPhoneScreen] = useMediaQuery("(max-width: 1200px)")
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: isPhoneScreen ? 6 : 4,
            spacing: 10,
        },
    })

    return (
        <Flex w='1440px' p="30px 0 50px 0" m='0 auto' flexDirection='column'>
            <Flex w={isPhoneScreen ? '96%' : '95%'} h='60px' m='0 auto' alignItems='center' justifyContent='start' mb={10}>
                <Heading textAlign='center'>{props.productName}</Heading>
                <Button mx={isPhoneScreen ? '4' : '10'} borderRadius={30} border='2px solid black'>{props.buttonTitle}</Button>
            </Flex>

            {
                props.data ? (
                    <Flex w='90%' m='0 auto' className="keen-slider" ref={sliderRef}>
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

        </Flex>
    )
}