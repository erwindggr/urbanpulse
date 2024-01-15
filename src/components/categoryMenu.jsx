import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function CategoryMenu(props) {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='none' fontWeight='bold' _hover={{ bgColor: 'none' }} _active={{ bgColor: 'none' }}>
                Category
            </MenuButton>
            <MenuList>
                {
                    props.categories.slice().reverse().map((category, index) => (
                        <MenuItem key={index} fontWeight='bold'>{category.charAt(0).toUpperCase() + category.slice(1)}</MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
};