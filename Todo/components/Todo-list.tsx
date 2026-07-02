"use client";
import { Todo } from "@/lib/todos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation"; 
import { deleteTodo, toggleComplete } from "@/lib/todos";   
type TodoListProps = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: TodoListProps) {
  const router = useRouter();
  async function handleToggle(id: number) {
    await toggleComplete(id);

    router.refresh();
  }
  async function handleDelete(id: number) {
  await deleteTodo(id);
  router.refresh();
}
  if (initialTodos.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-8 text-center text-muted-foreground">
          No todos found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {initialTodos.map((todo, index) => (
        <Card key={todo.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <h3 className="font-semibold">
                #{index+1} {todo.title}
              </h3>

              <Badge variant={todo.completed ? "default" : "secondary"}>
                {todo.completed ? "Completed" : "Pending"}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleToggle(todo.id)}>
                {todo.completed ? "Undo" : "Complete"}
              </Button>
              <Button variant="outline" onClick={() => router.push(`/api/todos/${todo.id}/edit`)}>Edit</Button>   
              <Button
                variant="destructive"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
