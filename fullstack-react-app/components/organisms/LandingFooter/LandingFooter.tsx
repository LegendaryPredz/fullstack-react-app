import React from "react"
import { Box, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"

export const LandingFooter = () => {
  return (
    <Box
      as="footer"
      backgroundColor="#D32F2F"
      py="40px"
      width="100vw"
      display="flex"
      justifyContent="center"
    >
      <Flex w={['100%', '100%', '100%', '80ch']}>
        <SimpleGrid columns={2} spacing={8} w="100%">
          <Box>SuperApp 2022</Box>
          <Flex flexDirection="column">
            <Text mb="16px">Follow us on</Text>
            <HStack spacing={4}>
              <Text>Twitter</Text>
              <Text>Instagram</Text>
              <Text>Facebook</Text>
            </HStack>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
