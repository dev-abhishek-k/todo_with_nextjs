import TodoEdit from "@/Todo/components/Todo-edit";
import * as TodoRepository from "@/server/services/todo.repository";  

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const todo = await TodoRepository.findById(Number(id));

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <TodoEdit todo={todo} />
    </div>
  );
}