import { Button } from "@chakra-ui/react"

export default function BigButton(props) {

    const buttonStyles = {
        h: "50px",
        px: "8",
        py: "8",
        borderRadius: "35",
        fontSize: "md"
    };

    return (
        <Button {...buttonStyles} >
            {props.text}
        </Button>
    )
}