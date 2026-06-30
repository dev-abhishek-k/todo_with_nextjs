import * as TodoRepository from "@/server/services/todo.repository";
import type { CreateTodoInput, UpdateTodoInput } from "@/server/services/todo.schema";
export async function createTodo(data: CreateTodoInput) {
  // Business Logic

  if (!data.title.trim()) {
    throw new Error("Title is required");
  }

  return TodoRepository.create(data);
}
export async function getTodos() {
  return TodoRepository.findMany();
}
export async function getTodoById(id: number) {
  const todo = await TodoRepository.findById(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
}
export async function updateTodo(id: number, data: UpdateTodoInput) {
  const todo = await TodoRepository.findById(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return TodoRepository.update(id, data);
}
export async function deleteTodo(id: number) {
  const todo = await TodoRepository.findById(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return TodoRepository.deleteTodo(id);
}
export async function toggleComplete(id: number) {
  const todo = await TodoRepository.findById(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return TodoRepository.update(id, {
    completed: !todo.completed,
  });
}