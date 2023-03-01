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
      <h1 className="text-4xl font-sans font-semibold text-center m-4">
        To Dos
      </h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex justify-center m-4"
      >
        <input
          className="input input-bordered input-accent w-full max-w-xs"
          {...register("category", {
            required: "Please write a category",
            validate: {
              unique: (v) =>
                !categories.includes(v) || "이미 있는 카테고리에요.",
            },
          })}
          placeholder="Write a category"
        />
        {errors.category?.message && (
          <span className="text-xl p-2">{errors.category.message}</span>
        )}
        <button className="btn btn-primary ml-4">Add</button>
      </form>
    </div>
  );
}

export default CreateCategory;
