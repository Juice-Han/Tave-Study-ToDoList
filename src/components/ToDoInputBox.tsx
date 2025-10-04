import { useRef, useState } from "react";

interface ToDoInputProps {
  addToDo: (toDo: string) => void;
}

const ToDoInputBox = ({ addToDo }: ToDoInputProps) => {
  const [toDo, setToDo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddToDo = (toDo: string) => {
    addToDo(toDo);
    setToDo("");
    inputRef.current?.focus();
  };
  return (
    <div className="w-full h-10 flex items-center">
      <div className="flex-8 min-w-0">
        <input
          ref={inputRef}
          className="w-full px-3 py-1.5 border rounded focus:outline-none text-sm"
          type="text"
          placeholder="할 일을 추가하세요"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && handleAddToDo(toDo)}
        />
      </div>
      <div className="flex-2 text-center">
        <button
          className="text-sm px-4 py-2 text-white rounded-xl bg-blue-800 hover:opacity-80 hover:cursor-pointer"
          onClick={() => handleAddToDo(toDo)}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default ToDoInputBox;
