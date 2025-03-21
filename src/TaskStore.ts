import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ITodo {
    title: string
    done: boolean
}

type State = {
    todos: ITodo[]
}

type Actions = {
    toggleTodo: (idx: number) => void
    addTodo: (title: string) => void
}

export const useTodoStore = create<State & Actions>()(
    immer((set) => ({
        todos: [
            {
                title: 'Learn Zustand',
                done: false,
            },
            {
                title: 'Learn Jotai',
                done: false,
            },
            {
                title: 'Learn Valtio',
                done: false,
            },
            {
                title: 'Learn Signals',
                done: true,
            },
        ],
        addTodo(title) {
            set((state) => {
                const allTitles = state.todos.map(t => t.title)
                for (const t of allTitles) {
                    console.log(t, title)
                    if (t === title) {
                        return
                    }
                }
                state.todos.push({ title, done: false })
            })

        },
        toggleTodo: (idx: number) =>
            set((state) => {
                state.todos[idx].done = !state.todos[idx].done
            }),
    })),
)


