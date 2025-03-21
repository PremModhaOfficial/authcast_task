import { ITodo, useTodoStore } from '@/TaskStore'
import React, { useState } from 'react'

export const TodoAdder = () => {
    const [todo, setTodo] = useState<string>()
    const addTodo = useTodoStore(state => state.addTodo)
    return (
        <div>
            <div className="flex flex-row justify-center items-center w-full">
                <input type="text" className='m-2 p-2 outline-1 outline-emerald-400 hover:outline-emerald-900 w-full' placeholder={todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <button className='m-2 p-2 outline-1 outline-emerald-400 hover:outline-emerald-900 w-full'
                    onClick={() => {
                        if (!todo) { return } else { addTodo(todo) }
                    }}
                >+</button>
            </div>
        </div>
    )
}
