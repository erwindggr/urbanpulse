import {
    Flex, Divider, Link, ListItem, Text,
    Input, UnorderedList, Image, Button,
    IconButton
} from "@chakra-ui/react";
import logoCircle from "../image/logo_circle.png";
import { usePhoneScreenMediaQuery } from "../mediaQuery/mediaQueries";

export default function Footer() {
    const listStyle = { listStyleType: 'none' };
    const [isPhoneScreen] = usePhoneScreenMediaQuery();
    return (
        <Flex color='white' w='100%' h='400px' flexDirection='column' pt={4} bg='#607274'>
            <Flex w='70%' flex={1} m='0 auto' align={isPhoneScreen ? 'center' : 'center'} justifyContent={isPhoneScreen ? 'center' : "space-between"} borderBottom='1px solid white' flexDir={isPhoneScreen ? 'column' : 'row'}>
            {
                    isPhoneScreen ? 
                    (
                        <Flex>
                            <Image src={logoCircle} w='150px' h='150px' />
                        </Flex>
                    ) :
                    (
                        <></>
                    )
                }
                <Flex w={isPhoneScreen ? '100%' : '220px'} justifyContent={isPhoneScreen ? 'flex-start' : 'space-between'}>
                    <Flex h='100%' alignItems='center' fontFamily="'Red Hat Display', sans-serif">
                        <UnorderedList style={listStyle}>
                            <ListItem><Link>Outfit</Link></ListItem>
                            <ListItem><Link>Mission</Link></ListItem>
                            <ListItem><Link>Find Store</Link></ListItem>
                        </UnorderedList>
                    </Flex>
                    <Flex h='100%' alignItems='center' fontFamily="'Red Hat Display', sans-serif">
                        <UnorderedList style={listStyle}>
                            <ListItem><Link>FAQ</Link></ListItem>
                            <ListItem><Link>Retailer Login</Link></ListItem>
                            <ListItem><Link>Contact</Link></ListItem>
                        </UnorderedList>
                    </Flex>
                </Flex>
                {
                    isPhoneScreen ? (
                        <></>
                    ) : (
                        <Flex>
                            <Image src={logoCircle} w='200px' h='200px' />
                        </Flex>
                    )
                }

            </Flex>

            <Flex 
            fontFamily="'Red Hat Display', sans-serif" w='70%' flex={0.4} 
            pb={isPhoneScreen ? 10 : 0} m='0 auto' alignItems='center' 
            justifyContent={isPhoneScreen ? 'flex-start' : 'space-between'} 
            flexDir={isPhoneScreen ? 'column' : 'row'}
            mt={isPhoneScreen ? '5' : '0'}
            >
                <Flex w={isPhoneScreen ? 'full' : 'none'}>
                    <Text>
                        Urbania 456 Style Street,, Batam City, Indonesia
                    </Text>
                </Flex>
                <Flex w={isPhoneScreen ? 'full' : '400px'} justifyContent='space-around' flexDir={isPhoneScreen ? 'column' : 'row'}>
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