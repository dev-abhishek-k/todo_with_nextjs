
import * as TodoService from "@/server/services/todo.service";
import {TodoApp} from "@/Todo/components/Todo-app"

export default async function Home(){
const todos=await TodoService.getTodos();

  return (
    <div>
    <TodoApp initialTodos={todos}/>
    </div>
  )
}

