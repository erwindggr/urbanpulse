import {
    Flex, Divider, Link, ListItem, Text,
    Input, UnorderedList, Image, Button,
    IconButton
} from "@chakra-ui/react";
import logoCircle from "../image/logo_circle.png";
import { RiInstagramFill, RiInstagramLine, RiTwitterFill, RiTwitterLine } from "react-icons/ri";

export default function Footer() {
    const listStyle = { listStyleType: 'none' };
    return (
        <Flex w='100%' h='550px' flexDirection='column' mt={10} >
            <Flex w='70%' flex={1} m='0 auto' justifyContent='space-between'>
                <Flex w='250px' justifyContent='space-between'>
                    <Flex h='100%' alignItems='center'>
                        <UnorderedList style={listStyle}>
                            <ListItem><Link>Outfit</Link></ListItem>
                            <ListItem><Link>Mission</Link></ListItem>
                            <ListItem><Link>Find Store</Link></ListItem>
                        </UnorderedList>
                    </Flex>
                    <Flex h='100%' alignItems='center'>
                        <UnorderedList style={listStyle}>
                            <ListItem><Link>FAQ</Link></ListItem>
                            <ListItem><Link>Retailer Login</Link></ListItem>
                            <ListItem><Link>Contact</Link></ListItem>
                        </UnorderedList>
                    </Flex>
                </Flex>
                <Flex>
                    <Image src={logoCircle} w='200px' h='200px' />
                </Flex>
            </Flex>

            <Divider />

            <Flex w='70%' flex={0.7} m='0 auto'>
                <Flex w='400px' flexDir='column' justifyContent='center' >
                    <Flex mb={5}>
                        <Text>Subscribe to our mailing list</Text>
                    </Flex>
                    <Flex >
                        <Input bg='white' placeholder='Basic usage' />
                        <Button ml={5}>Subscribe</Button>
                    </Flex>
                </Flex>

                <Flex ml='100px' flexDir='column' justifyContent='center'>
                    <Flex>
                        <Text>Follow Us</Text>
                    </Flex>
                    <Flex w='70px' justifyContent='space-between'>
                        {/* <IconButton icon={<RiInstagramFill/>} size='sm' />
                        <IconButton icon={<RiTwitterFill/>} size='sm' ml={2} /> */}
                        <Link>
                            <RiInstagramFill size='30px' />
                        </Link>
                        <Link>
                            <RiTwitterFill size='30px' />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

            <Divider />

            <Flex w='70%' flex={0.5} m='0 auto' alignItems='center' justifyContent='space-between'>
                <Flex>
                    <Text>
                        Urbania 456 Style Street,, Batam City, Indonesia
                    </Text>
                </Flex>
                <Flex w='400px' justifyContent='space-between'>
                    <Flex>
                        <Text>
                            +62 778 1234 5678
                        </Text>
                    </Flex>
                    <Flex>
                        <Text>
                            info@urbanpulsefashion.co.id
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}