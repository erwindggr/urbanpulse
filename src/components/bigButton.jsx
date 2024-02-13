import { Button, Link } from "@chakra-ui/react"

export default function BigButton(props) {

    const buttonStyles = {
        bg: "#2D9596",
        color: "white",
        px: "5",
        py: "6",
        borderRadius: "30",
        fontSize: "md",
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
