import { Button, Link } from "@chakra-ui/react";
import { usePhoneScreenMediaQuery, useTabletScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function BigButton(props) {
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    const [isTabletScreen] = useTabletScreenMediaQuery();
    const buttonStyles = {
        bg: "#2D9596",
        color: "white",
        px: isPhoneScreen ? "4" : "5",
        py: isPhoneScreen ? "4" : "6",
        borderRadius: "30",
        fontSize: isPhoneScreen ? "xs" : isTabletScreen ? "sm" : "md",
        transition: "background-color 0.4s, color 0.5s"
    };

    const hoverStyles = {
        bg: "#FFF7F1",
        color: "#2D9596",
        border: "2px solid #2D9596"
    };

    const buttonHoverStyles = {
        ...buttonStyles,
        _hover: hoverStyles
    };

    return (
        <Link href={props.link}>
            <Button {...buttonHoverStyles} fontFamily="'Lexend', sans-serif">
                {props.text}
            </Button>
        </Link>
    )
}
