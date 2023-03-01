import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

// export const categoryState = atom<Categories>({
//   key: "category",
//   default: Categories.TO_DO,
// });

//한번에 하나만 선택할 수 있으므로 배열이 아니다.
export const currentCategoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

// 1. localStorage에 저장하는 effect를 만든다
const { persistAtom: persistCategoryOptionsAtom } = recoilPersist({
  key: "CATEGORY_OPTIONS", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const categoryOptionsState = atom<string[]>({
  key: "categoryOptions",
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistCategoryOptionsAtom],
});

// 1. localStorage에 저장하는 effect를 만든다
const { persistAtom: persistTodoAtom } = recoilPersist({
  key: "TODOS", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistTodoAtom], // 2. atom에 effect 기능을 추가한다
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(currentCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
