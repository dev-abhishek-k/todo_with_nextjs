import { prisma } from "@/lib/db";
import type { CreateTodoInput, UpdateTodoInput } from "@/server/services/todo.schema";
export async function create(data: CreateTodoInput) {
  return prisma.todo.create({
    data,
  });
}

export async function findMany() {
  return prisma.todo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function findById(id:number) {
  return prisma.todo.findUnique({
    where: {
      id,
    },
  });
}

export async function update(id: number, data: UpdateTodoInput) {
  return prisma.todo.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTodo(id: number) {
  return prisma.todo.delete({
    where: {
      id,
    },
  });
}
export async function toggleComplete(id:number){
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },  
  })
}