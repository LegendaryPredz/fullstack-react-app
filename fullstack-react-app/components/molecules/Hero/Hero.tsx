import { Container, Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"

export const Hero = () => {
  return <Flex
    w="100%"
    background="linear-gradient(90deg, #1A2A6C 0%, #B21F1F 50%, #FDBB2D 100%);">
    <Container py="64px">
      <Heading>
        Increase your productivity
        <br />
        Make your app in minutes
      </Heading>
      <Text mt="8px" fontSize="26px" color="gray.700">
        Your Fullstack React App
      </Text>
    </Container>
  </Flex>
}
