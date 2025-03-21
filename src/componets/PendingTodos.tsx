import { useTodoStore } from "@/TaskStore"
import Todo from "./Todo"

export default function PendingTodos() {
    let todos = useTodoStore((state) => state.todos)
    todos = todos.filter(t => !t.done)
    return (
        <>
            {
                todos.map((todo, idx) => {
                    return (<Todo {...todo} key={idx} />)
                })
            }
        </>
    )
}
