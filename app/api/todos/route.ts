import * as TodoService from "@/server/services/todo.service";
import { createTodoSchema } from "@/server/services/todo.schema";
export async function GET() {
  const todos = await TodoService.getTodos();

  return Response.json(todos);
}
export async function POST(request: Request) {
  const body = await request.json();

  const data = createTodoSchema.parse(body);

  const todo = await TodoService.createTodo(data);

  return Response.json(todo, {
    status: 201,
  });
}

