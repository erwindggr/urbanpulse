import { useState } from "react";
import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import '../css/heroImage.css';
import heroImg1 from "../image/horizontal-01.jpg";
import heroImg2 from "../image/horizontal-02.jpg";
import heroImg3 from "../image/horizontal-03.jpg";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const animation = { duration: 3500, easing: (t) => t }

export default function HeroImage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.moveToIdx(slider.track.details.abs + 1, true, animation)
                        // slider.next()
                    }, 3000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    );
    return (
        <>
            <Box position='relative' >
                <Flex ref={sliderRef} className="keen-slider">
                    <Box className="keen-slider__slide">
                        <Image w='100%' h='auto' minH='65vh' src={heroImg1} objectFit='cover' />
                        {/* <Box
                            position='absolute'
                            top='70%'
                            left='50%'
                            transform='translate(-50%, -50%)'
                            textAlign='center'
                        >
                            <Heading fontSize='3xl'>Your Heading</Heading>
                            <Text fontSize='md'>Your Subheading</Text>
                        </Box> */}
                    </Box>
                    <Box className="keen-slider__slide">
                        <Image w='100%' h='auto' minH='65vh' src={heroImg2} objectFit='cover' objectPosition='left' />
                        {/* <Box
                            position='absolute'
                            top='50%'
                            left='50%'
                            transform='translate(-50%, -50%)'
                            textAlign='center'
                        >
                            <Heading fontSize='3xl'>Your Heading</Heading>
                            <Text fontSize='md'>Your Subheading</Text>
                        </Box> */}
                    </Box>
                    <Box className="keen-slider__slide">
                        <Image w='100%' h='auto' minH='65vh' src={heroImg3} objectFit='cover' objectPosition='right' />
                        {/* <Box
                            position='absolute'
                            top='50%'
                            left='50%'
                            transform='translate(-50%, -50%)'
                            textAlign='center'
                        >
                            <Heading fontSize='3xl'>Your Heading</Heading>
                            <Text fontSize='md'>Your Subheading</Text>
                        </Box> */}
                    </Box>
                </Flex>

                {loaded && instanceRef.current && (
                    <Flex
                        className="dots" p="10px 0" justifyContent='center'
                        position='absolute'
                        bottom='10'
                        width='100%'
                    >
                        {[
                            ...Array(instanceRef.current.track.details.slides.length).keys(),
                        ].map((idx) => {
                            return (
                                <Button
                                    border='2px solid gray' size='xs'
                                    bg='none' borderRadius='50%'
                                    padding='5px' cursor='pointer'
                                    key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx)
                                    }}
                                    className={"dot" + (currentSlide === idx ? " active" : "")}
                                ></Button>
                            )
                        })}
                    </Flex>
                )}
            </Box>


        </>
    )
}