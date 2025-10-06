import React from "react";
import { Box, Badge, Icon, Text, Tooltip, Flex, Link } from "@chakra-ui/core";
import { deployLogo } from "./deployLogo";

export default function AltListItem({ alt }) {
  return (
    <Box
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      p={4}
      m={2}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
      width={{ base: "100%", sm: "48%" }}
    >
      <Flex align="center">
        {/* Logo */}
        <Box
          as="img"
          src={alt.svg}
          alt={alt.name}
          height="56px"
          width="56px"
          borderRadius="md"
          boxShadow="sm"
          mr={4}
        />

        {/* Info */}
        <Box flex="1">
          <Text fontWeight="600" fontSize="md">
            {alt.name}
          </Text>

          <Flex align="center" mt={1} flexWrap="wrap">
            {/* Stars */}
            <Flex align="center" mr={3} color="yellow.400" fontWeight="600">
              <Icon name="star" mr={1} />
              {alt.stars || 0}
            </Flex>

            {/* Language */}
            {alt.language && (
              <Tooltip label="Language" placement="top">
                <Badge bg="blue.100" color="blue.800" mr={2} mb={1}>
                  {alt.language}
                </Badge>
              </Tooltip>
            )}

            {/* License */}
            {alt.license && (
              <Tooltip label="License" placement="top">
                <Badge bg="green.100" color="green.800" mr={2} mb={1}>
                  {alt.license}
                </Badge>
              </Tooltip>
            )}
          </Flex>
        </Box>

        {/* Actions */}
        <Flex align="center" ml={4} display={{ base: "none", sm: "flex" }}>
          {/* Deploy */}
          <Link href={alt.deploy || "#"} target="_blank" mx={1}>
            {alt.deploy ? (
              deployLogo(alt.deploy)
            ) : (
              <Tooltip label="No Deploy Instructions" placement="top">
                <Box as="span">
                  <Icon name="warning" color="gray.400" />
                </Box>
              </Tooltip>
            )}
          </Link>

          {/* Repo */}
          {alt.repo && (
            <Link href={`https://github.com/${alt.repo}`} target="_blank" mx={1}>
              <Tooltip label="Repository" placement="top">
                <Icon name="external-link" color="gray.600" />
              </Tooltip>
            </Link>
          )}

          {/* Site */}
          {alt.site && (
            <Link href={alt.site} target="_blank" mx={1}>
              <Tooltip label="Website" placement="top">
                <Icon name="link" color="gray.600" />
              </Tooltip>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
