import React, { ReactElement } from "react"
import { Flex, Heading } from "@chakra-ui/react";
import { Todo } from "@prisma/client";

type TodosProps = {
  todos: Todo[]
}

export const Todos = React.FC<TodosProps> = ({ todos }) => {
  return (
    <>
      <Heading size="md" mb="16px" mt="24px">Todos</Heading>
      {todos.map((todo) => (
        <Flex key={todo.id}>{todo.title}</Flex>
      ))
      }
    </>
  )
}
