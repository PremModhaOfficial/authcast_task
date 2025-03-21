"use client"
import { useEffect, useRef } from 'react';
import DoneTodos from "@/componets/DoneTodos";
import PendingTodos from "@/componets/PendingTodos";
import { TodoAdder } from "@/componets/TodoAdder";
import dragula from 'react-dragula';
import { useTodoStore } from '@/TaskStore';

export default function Home() {
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const { toggleTodo } = useTodoStore();

  useEffect(() => {
    if (leftContainerRef.current && rightContainerRef.current) {
      const drake = dragula([
        leftContainerRef.current,
        rightContainerRef.current
      ]);

      // Handle drop events
      drake.on('drop', (el: Element, target: Element, source: Element) => {
        // Get the todo title from the dragged element
        const todoTitle = el.textContent?.trim();

        if (todoTitle) {
          // Find the todo index in the store based on the title
          const todos = useTodoStore.getState().todos;
          const todoIndex = todos.findIndex(todo => todo.title === todoTitle);

          if (todoIndex !== -1) {
            // Check if the target container is different from the source
            const isDoneContainer = target.id === "left";
            const isPendingContainer = target.id === "right";
            const currentIsDone = todos[todoIndex].done;

            // Only toggle if moving between done/pending containers
            // and the status needs to change
            if ((isDoneContainer && !currentIsDone) || (isPendingContainer && currentIsDone)) {
              toggleTodo(todoIndex);
            }
          }
        }
      });

      // Clean up
      return () => drake.destroy();
    }
  }, [toggleTodo]);

  return (
    <>
      <div className="m-5 p-2">
        <div className="flex flex-row">
          <div className="outline-1 outline-amber-600 w-full" id="left">
            <div className="text-3xl ">
              DONE
            </div>
            <div ref={leftContainerRef}>
              <DoneTodos />
            </div>
          </div>
          <div className="outline-1 outline-amber-600 w-full" id="right">
            <div className="text-3xl ">
              Pending!!
            </div>
            <div ref={rightContainerRef}>
              <PendingTodos />
            </div>
          </div>
        </div>
        <TodoAdder />
      </div>
    </>
  );
}
