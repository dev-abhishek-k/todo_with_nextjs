import * as TodoService from "@/server/services/todo.service";
import { updateTodoSchema } from "@/server/services/todo.schema";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id:number }> }
) {
  const { id } = await params;

  const todo = await TodoService.getTodoById(Number(id));

  return Response.json(todo);
}



export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  const body = await request.json();

  const result = updateTodoSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: result.error.flatten(),
      },
      {
        status: 400,
      }
    );
  }

  const todo = await TodoService.updateTodo(Number(id), result.data);

  return Response.json(todo);
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await TodoService.deleteTodo(Number(id));

  return Response.json({
    success: true,
  });
}
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
   const { id } = await params; 

   await TodoService.toggleComplete(Number(id));
   return Response.json({
      success: true
   });
}