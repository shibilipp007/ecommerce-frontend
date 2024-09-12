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
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/users`,
        data
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="w-[400px] mx-auto mt-10 p-6 border border-gray-400"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        type="submit"
      >
        Signup
      </button>
      <div className="mt-1 text-center flex flex-col">
        <Link className="text-blue-600 hover:underline" to={`/login`}>
          alredy have an account?
        </Link>
        <Link className="text-blue-600 hover:underline">
          need a seller account?
        </Link>
      </div>
    </form>
  );
}
