export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${getBaseUrl()}/api/todos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();

  return json.success ? json.todos : [];
}

export async function createTodo(title: string) {
  const res = await fetch(`${getBaseUrl()}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}
export async function deleteTodo(id: number) {
  const res = await fetch(`${getBaseUrl()}/api/todos/${id}`, {
    method: "DELETE",
  });  

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }  
}
export async function toggleComplete(id: number) {
  const res = await fetch(`${getBaseUrl()}/api/todos/${id}`, {
    method: "PUT",
  });  
  
  if (!res.ok) {
    throw new Error("Failed to toggle todo");
  }  
}

export async function updateTodo(id: number, title: string) {
  const res = await fetch(`${getBaseUrl()}/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });  
  
  if (!res.ok) {
    throw new Error("Failed to update todo");
  }  
}