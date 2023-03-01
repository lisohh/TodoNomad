import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  type IToDo,
  currentCategoryState,
  categoryOptionsState,
  toDoSelector,
  toDoState,
} from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  //const toDos = useRecoilValue(toDoState);
  //console.log(toDos);
  const filteredToDos = useRecoilValue(toDoSelector);
  const setTodos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoryOptionsState);
  const [category, setCategory] = useRecoilState(currentCategoryState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const deleteTodo = (targetId: IToDo["id"]) => {
    setTodos((old) => old.filter((toDo) => toDo.id !== targetId));
  };
  const deleteCategoryOption = (targetCategory: string) => {
    setCategories((old) =>
      old.filter((category) => category !== targetCategory)
    );
    setTodos((old) => old.filter((toDo) => toDo.category !== targetCategory));
  };

  return (
    <div>
      <div>
        {categories.map((categoryOption) => (
          <React.Fragment key={categoryOption}>
            <label>
              <input
                onChange={onChange}
                type="radio"
                name="category"
                value={categoryOption}
                checked={categoryOption === category}
              />
              {categoryOption}
            </label>
            <button
              onClick={(e) => {
                deleteCategoryOption(categoryOption);
              }}
            >
              delete
            </button>
          </React.Fragment>
        ))}
      </div>
      <hr />
      <CreateToDo />
      {filteredToDos?.map((toDo) => (
        <React.Fragment key={toDo.id}>
          <ToDo {...toDo} />
          <button
            onClick={(e) => {
              deleteTodo(toDo.id);
            }}
          >
            Delete
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ToDoList;
