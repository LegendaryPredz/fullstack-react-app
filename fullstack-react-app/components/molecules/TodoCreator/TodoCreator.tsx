import React from "react"
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import axios from "axios"

type TodoCreatedProps = {
  onTodoCreated: () => void
}

export const TodoCreator: React.FC<TodoCreatedProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = React.useState("")
  const [isLoading, setLoading] = React.useState(false)

  const onCreate = () => {
    setLoading(true)
    axios.post("api/todo", {
      title
    }).then(() => {
      onTodoCreated()
    })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Flex flexDirection="column" py="16px">
      <Heading size="md" mb="4px">Create Todo</Heading>
      <Flex>
        <Input
          placeholder='Something to do...'
          onChange={(e) => setTitle(e.target.value)}
        />

        <IconButton
          icon={<AddIcon />}
          variant="solid"
          colorScheme="blue"
          aria-label="Create todo"
          ml="4px"
          onClick={onCreate}
          isLoading={isLoading}
        />
      </Flex>
    </Flex>
  )
}
