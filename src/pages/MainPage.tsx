import React, { useCallback, useEffect, useMemo, useState } from "react";
import FilterButton from "../components/FilterButton";
import ToDoBox from "../components/ToDoBox";
import ToDoInputBox from "../components/ToDoInputBox";
interface FilterType {
  title: string;
  isActive: boolean;
}

export interface ToDoType {
  content: string;
  isCompleted: boolean;
}
const MainPage = () => {
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState<FilterType[]>([
    { title: "모두보기", isActive: true },
    { title: "실행전", isActive: false },
    { title: "실행완료", isActive: false },
  ]);

  const [toDoList, setToDoList] = useState<ToDoType[]>(() => {
    const savedToDoList = window.localStorage.getItem("toDoList");
    return savedToDoList ? JSON.parse(savedToDoList) : [];
  });

  useEffect(() => {
    const toDoListString = window.localStorage.getItem("toDoList");
    if (toDoListString) {
      const toDoList = JSON.parse(toDoListString);
      setToDoList(toDoList);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const handleFilterChange = useCallback((activeTitle: string) => {
    const changedFilters = filters.reduce<FilterType[]>(
      (acc, filter: FilterType) => {
        acc.push({
          title: filter.title,
          isActive: filter.title === activeTitle,
        });
        return acc;
      },
      []
    );
    setFilter(activeTitle);
    setFilters(changedFilters);
  }, []);

  const addToDo = (content: string) => {
    if (content.trim() === "") return;
    setToDoList([...toDoList, { content: content, isCompleted: false }]);
  };

  const checkToDo = (targetToDo: ToDoType) => {
    setToDoList(
      [...toDoList].map((toDo) => ({
        content: toDo.content,
        isCompleted:
          toDo === targetToDo ? !targetToDo.isCompleted : toDo.isCompleted,
      }))
    );
  };

  const fixToDo = (targetToDo: ToDoType, newContent: string) => {
    if (newContent.trim() === "") return;
    setToDoList(
      [...toDoList].map((toDo) => ({
        content: toDo === targetToDo ? newContent : toDo.content,
        isCompleted: toDo.isCompleted,
      }))
    );
  };

  const deleteToDo = (targetToDo: ToDoType) => {
    setToDoList([...toDoList].filter((toDo) => toDo !== targetToDo));
  };

  const filteredToDoList = useMemo(() => {
    return toDoList.filter((toDo) => {
      if (filter === "실행전") return !toDo.isCompleted;
      else if (filter === "실행완료") return toDo.isCompleted;
      else return true;
    });
  }, [toDoList, filter]);

  return (
    <>
      <p className="text-5xl font-bold text-blue-900 mb-4">To Do List</p>
      <div className="w-[400px] shadow-xl bg-neutral-50 flex flex-col items-center justify-start gap-2 p-2">
        <div className="w-full h-12 flex justify-around items-center">
          {filters.map(({ title, isActive }) => (
            <FilterButton
              key={title}
              title={title}
              isActive={isActive}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </div>
        <div className="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-scroll">
          {toDoList.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              현재 할 일이 없습니다
            </div>
          ) : (
            filteredToDoList.map((toDo, idx) => (
              <ToDoBox
                key={toDo.content + idx}
                toDo={toDo}
                checkToDo={checkToDo}
                fixToDo={fixToDo}
                deleteToDo={deleteToDo}
              />
            ))
          )}
        </div>
        <ToDoInputBox addToDo={addToDo} />
      </div>
    </>
  );
};

export default MainPage;
