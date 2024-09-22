import { useForm } from "react-hook-form";
import Input from "../components/input";

import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

const Email_Regex = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,}$/";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/users`, data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="w-[450px] mx-auto mt-10 p-11 border border-gray-400"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold pb-6">Create a account</h1>
      <Input
        label={"Name"}
        id={"name"}
        type="text"
        {...register("name", { required: true })}
      />

      <Input
        label={"Email"}
        id={"email"}
        type="email"
        {...register("email", {
          required: true,
          pattern: { value: Email_Regex, message: "Invalid Format" },
        })}
        error={errors.email?.message}
      />

      <Input
        label={"Password"}
        id={"password"}
        type="text"
        {...register("password", {
          required: true,
          minLength: { value: 6, message: "must contain 6 character" },
        })}
        error={errors.password?.message}
      />

      <button
        className="rounded-md select-none bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        type="submit"
      >
        Signup
      </button>
      <div className="text-center flex flex-col gap-y-2 mt-4">
        <Link
          className="flex items-center justify-center h-9 rounded-md bg-white text-slate-700 border border-solid border-gray-300 shadow text-sm font-medium select-none hover:bg-gray-50"
          to={`/login`}
        >
          Alredy have an account? Sign in
        </Link>
      </div>
    </form>
  );
}
