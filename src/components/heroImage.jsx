import { useState } from "react";
import { Box, Flex, Heading, Text, Image, Button, Center } from "@chakra-ui/react";
import heroImg1 from "../image/h5-uw.jpg";
import heroImg2 from "../image/h4.jpg";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function HeroImage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        }
    );
    return (
        <Box position='relative'>
            <Flex ref={sliderRef} className="keen-slider">
                <Image className="keen-slider__slide" w='100%' h='auto' src={heroImg1} objectFit='contain' />
                <Image className="keen-slider__slide" w='100%' h='auto' src={heroImg2} objectFit='contain' />
            </Flex>

            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                </>
            )}
        </Box>


    )
}