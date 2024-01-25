import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function CategoryMenu() {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='none' fontWeight='bold' _hover={{ bgColor: 'none' }} _active={{ bgColor: 'none' }}>
                Category
            </MenuButton>
            <MenuList>
                <MenuItem fontWeight='bold'>Womens' Clothing</MenuItem>
                <MenuItem fontWeight='bold'>Mens' Clothing</MenuItem>
                <MenuItem fontWeight='bold'>Jewelery</MenuItem>
                <MenuItem fontWeight='bold'>Electronics</MenuItem>
            </MenuList>
        </Menu>
    )
};