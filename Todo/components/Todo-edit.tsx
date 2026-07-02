"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";  
import { updateTodo } from "@/lib/todos";

type TodoEditProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function TodoEdit({ todo }: TodoEditProps) {
  const router = useRouter();
  const [title, setTitle] = useState(todo.title);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }
    try {
      await updateTodo(todo.id, trimmedTitle);
    router.push("/");
    } catch (error) {
      console.error("Failed to update todo:", error);
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Todo</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Todo ID</Label>

              <Input
                value={todo.id}
                disabled
              />
            </div>

            <div>
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                placeholder="Enter todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()} 
              >
                Cancel
              </Button>

              <Button type="submit" >
                Update Todo
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}