import { ITodo } from "@/TaskStore";

export default function Todo(todo: ITodo) {
    return (
        <div
            className="bg-green-500 p-5 m-2 draggable-item"
            id="container"
            data-todo-title={todo.title}
        >
            {todo.title}
        </div>
    )
}
