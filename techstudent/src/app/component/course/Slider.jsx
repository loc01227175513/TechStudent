"use client";
import { Flex, Box, Image, keyframes } from '@chakra-ui/react';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const images = [
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126647/13_jmgxo8.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126637/12_tm0xts.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126629/11_t1fwzm.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126621/10_tkgxsm.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126611/09_i4yvcq.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126601/08_v0jlvy.svg",
];

export default function HorizontalScrollImages() {
  return (
    <Flex justify="center" align="center" minH="10vh" overflow="hidden" w="600px" mx="auto">
      <Flex
        animation={`${scroll} 20s linear infinite`}
        minW="200%" // Double width to fit duplicate images
        align="center"
      >
        {[...images, ...images].map((src, index) => (
          <Box key={index} mx={3}>
            <Image src={src} alt={`icon-${index}`} boxSize="9rem" />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
