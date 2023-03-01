import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span className="text-lg font-medium mr-6">{text}</span>
      {category !== "DOING" && (
        <button
          className="btn btn-secondary mr-2"
          name={"DOING"}
          onClick={onClick}
        >
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button
          className="btn btn-secondary mr-2"
          name={"TO_DO"}
          onClick={onClick}
        >
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button
          className="btn btn-secondary mr-2"
          name={"DONE"}
          onClick={onClick}
        >
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
