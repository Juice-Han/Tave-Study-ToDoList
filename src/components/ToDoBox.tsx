import type { ToDoType } from "../pages/MainPage";
import clsx from "clsx";

interface ToDoBoxProps {
  toDo: ToDoType;
  checkToDo: (toDo: ToDoType) => void;
  fixToDo: (toDo: ToDoType, newContent: string) => void;
  deleteToDo: (toDo: ToDoType) => void;
}

const ToDoBox = ({ toDo, checkToDo, fixToDo, deleteToDo }: ToDoBoxProps) => {
  const handleFixButtonClick = () => {
    const input = prompt("할 일을 수정합니다.", toDo.content);
    if (!input) return;
    fixToDo(toDo, input);
  };

  const handleDeleteButtonClick = () => {
    const isSure = confirm("정말 삭제하시겠습니까?");
    if (!isSure) return;
    deleteToDo(toDo);
  };
  return (
    <>
      <div className="w-full h-10 shrink-0 border shadow rounded border-gray-500 flex items-center">
        <div className="flex-1 text-center">
          <input
            type="checkbox"
            checked={toDo.isCompleted}
            onChange={() => checkToDo(toDo)}
          />
        </div>
        <div className="flex-8 min-w-0">
          <div
            className={`w-full truncate ${clsx(
              toDo.isCompleted && "line-through"
            )}`}
          >
            {toDo.content}
          </div>
        </div>
        <div className="flex-2 min-w-0 flex gap-1 justify-center">
          <button onClick={handleFixButtonClick}>✏️</button>
          <button onClick={handleDeleteButtonClick}>❌</button>
        </div>
      </div>
    </>
  );
};

export default ToDoBox;
