import React from "react"
import { Flex, HStack, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { MenuItem } from "../../molecules/MenuItem/MenuItem"

export const TopBar = () => (
  <Flex width="100%" flexDirection="row" alignContent="center" p="8px 16px">
    <Text
      fontSize="36px"
      fontWeight="bold"
      lineHeight="42px"
      color="#CD1111"
      flexGrow={1}
    >
      SuperApp
    </Text>
    <HStack spacing="16px" alignContent="center">
      <MenuItem text="Blog" href="/blog" />
      <MenuItem text="Product" href="/product" />
      <MenuItem text="Pricing" href="/pricing" />
    </HStack>
    <Flex marginLeft="82px">
      <Button variant="solid" colorScheme="red">
        Get started
      </Button>
    </Flex>
  </Flex>
)
