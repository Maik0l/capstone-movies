import {
  Box,
  Heading,
  Text,
  Image,
  Link,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

interface InfoCardProps {
  name: string;
  description: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

const InfoCard = ({
  name,
  description,
  image,
  linkedin,
  email,
}: InfoCardProps) => {
  return (
    <Box
      w="100%"
      bg="#3C0101"
      color="white"
      padding="20px"
      textAlign="center"
      border="1px solid black"
    >
      <Image src={image} border="1px solid black" borderRadius="100%" />
      <Heading>{name}</Heading>
      <Text>{description}</Text>
      <Box fontSize="14px">
        <Flex alignItems="center">
          <AiFillLinkedin />
          <Link href={linkedin} isExternal>
            Linkedin
          </Link>
        </Flex>
        <Flex alignItems="center">
          <AiOutlineMail />
          <Menu>
            <MenuButton>Email</MenuButton>
            <MenuList color="black">{email}</MenuList>
          </Menu>
        </Flex>
      </Box>
    </Box>
  );
};

export default InfoCard;
