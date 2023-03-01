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
      <div className="flex justify-center gap-6 mb-4">
        {categories.map((categoryOption) => (
          <React.Fragment key={categoryOption}>
            <label>
              <input
                className="radio radio-primary align-middle"
                onChange={onChange}
                type="radio"
                name="category"
                value={categoryOption}
                checked={categoryOption === category}
              />
              <span className="align-middle text-lg font-medium ml-2">
                {categoryOption}
                <button
                  className="btn btn-accent ml-2"
                  onClick={(e) => {
                    deleteCategoryOption(categoryOption);
                  }}
                >
                  delete
                </button>
              </span>
            </label>
          </React.Fragment>
        ))}
      </div>
      <section className="bg-lime-100 min-h-screen">
        <CreateToDo />
        {filteredToDos?.map((toDo) => (
          <div key={toDo.id} className="flex justify-center m-2">
            <ToDo {...toDo} />
            <button
              className="btn btn-secondary ml-0"
              onClick={(e) => {
                deleteTodo(toDo.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ToDoList;
