"use client"
import { useEffect, useRef } from 'react';
import DoneTodos from "@/componets/DoneTodos";
import PendingTodos from "@/componets/PendingTodos";
import { TodoAdder } from "@/componets/TodoAdder";
import dragula from 'react-dragula';

export default function Home() {
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftContainerRef.current && rightContainerRef.current) {
      const drake = dragula([
        leftContainerRef.current,
        rightContainerRef.current
      ]);

      // Handle drop events
      drake.on('drop', (el: Element, target: Element, source: Element) => {
        // You might want to update your todo state here
        // For example, if a todo is moved from pending to done
        console.log('Element dropped:', el);
        console.log('Target container:', target.id);
        console.log('Source container:', source.id);

        // Here you would update your app state or make API calls
        // to reflect the changes in your data store
      });

      // Clean up
      return () => drake.destroy();
    }
  }, []);

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
