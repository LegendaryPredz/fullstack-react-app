import React, { ReactElement } from "react"
import { Checkbox, Flex, Heading, Input } from "@chakra-ui/react";
import { Todo } from "@prisma/client";

type TodosProps = {
  todos: Todo[]
  onTodoBlur: (todoId: string, newTitle: string) => Promise<void>
  onTodoCompleteToggle: (todoId: string, isCompleted: boolean) => Promise<void>
}

export const Todos: React.FC<TodosProps> = ({ todos, onTodoBlur, onTodoCompleteToggle }) => {
  return (
    <>
      <Heading size="md" mb="16px" mt="24px">Todos</Heading>
      {todos.map((todo) => (
        <Flex key={todo.id} my="4px">
          <Input
            defaultValue={todo.title}
            variant="unstyled"
            readOnly={todo.isCompleted}
            color={todo.isCompleted ? "gray.500" : "gray.700"}
            textDecoration={todo.isCompleted ? "line-through" : "none"}
            onBlur={(event) => {
              if (todo.title === event.target.value) {
                return
              }
              onTodoBlur(todo.id, event.target.value)
            }}
          />
          <Checkbox isChecked={todo.isCompleted} onChange={(e) => onTodoCompleteToggle(todo.id, e.target.checked)} />
        </Flex>
      ))
      }
    </>
  )
}
