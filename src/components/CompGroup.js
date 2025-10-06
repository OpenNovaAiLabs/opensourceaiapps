import React from "react";
import { Box, Divider, Link, Tooltip, Text, SimpleGrid } from "@chakra-ui/core";
import AltListItem from "./AltListItem";
import { LoadMore } from "./LoadMore";

// Shuffles an array in-place using Durstenfeld shuffle algorithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function CompGroup({ comp, commercial, alts }) {
  const shuffled = shuffle(alts);

  return (
    <Box
      mb={12}
      width={{ base: "100%", md: "48%" }}
      mx={{ base: 0, md: 2 }}
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      bg="white"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      {/* Commercial Apps */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="bold" mb={2} fontSize="md" color="gray.600">
          Commercial Apps
        </Text>
        <Box display="flex" flexWrap="wrap">
          {commercial.map((com, index) => (
            <Tooltip
              key={index}
              label={com.main}
              bg="gray.700"
              color="white"
              placement="top"
              borderRadius="md"
              fontSize="sm"
            >
              <Link href={com.website} isExternal mx={1} my={1}>
                <Box
                  as="img"
                  src={com.svg}
                  alt={com.main}
                  height="3rem"
                  width="3rem"
                  borderRadius="md"
                  boxShadow="md"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.1)" }}
                  bg="white"
                  p={1}
                />
              </Link>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Open Source Alternatives */}
      <Box p={4}>
        <Text fontWeight="bold" mb={2} fontSize="md" color="gray.600">
          Open Source Alternatives
        </Text>
        <Divider borderColor="gray.200" mb={3} />
        {shuffled.length <= 5 ? (
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
            {shuffled.map((alt) => (
              <AltListItem key={alt.name} alt={alt} />
            ))}
          </SimpleGrid>
        ) : (
          <LoadMore alts={shuffled} />
        )}
      </Box>
    </Box>
  );
}
