
import {Todo} from "@/lib/todos";
import {AddTodo} from "@/Todo/components/Todo-form-add";
import TodoList from "./Todo-list";
type TodoAppPages={
    initialTodos:Todo[]
}
export function TodoApp({initialTodos}:TodoAppPages){
    return(
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-200 gap-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <AddTodo />  
            <TodoList initialTodos={initialTodos}/>   
        </div>
)
}    