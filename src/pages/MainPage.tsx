const MainPage = () => {
  return <>
    <p className="text-5xl font-bold text-blue-900 mb-4">To Do List</p>
    <div className="w-[400px] h-[500px] shadow-xl bg-neutral-50 flex flex-col items-center justify-start gap-2 p-2">
      <div className="w-full h-10 flex justify-around border">
        <button>모두보기</button>
        <button>실행전</button>
        <button>실행완료</button>
      </div>
      <div className="w-full border h-[400px] p-2">
        <div className="w-full h-10 border flex items-center">
          <div className="flex-1 text-center">
            <input type="checkbox" />
          </div>
          <div className="flex-8 min-w-0">
            <input className="w-full truncate" type="text" value={'할일a111111111111111111111111111111111111111'}/>
          </div>
          <div className="flex-2 min-w-0 flex gap-1 justify-center">
            <button>✏️</button>
            <button>❌</button>
          </div>
        </div>
      </div>
      <div className="w-full h-10 flex items-center border">
        <div className="flex-8 min-w-0">
          <input className="w-full border" type="text" placeholder="할 일을 추가하세요"/>  
        </div>
        <div className="flex-2 text-center">
          <button className="border">
            추가
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default MainPage;
