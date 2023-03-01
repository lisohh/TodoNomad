import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryOptionsState } from "./atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoryOptionsState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    setCategories((oldCategories) => [category, ...oldCategories]);
    setValue("category", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("category", {
            required: "Please write a category",
            validate: {
              unique: (v) =>
                !categories.includes(v) || "이미 있는 카테고리에요.",
            },
          })}
          placeholder="Write a category"
        />
        {errors.category?.message && <span>{errors.category.message}</span>}
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateCategory;
