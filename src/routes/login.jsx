import { useForm } from "react-hook-form";
import Input from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onsubmit = async (data) => {
    try {
      await api.post("/auth/login", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="w-[450px] mx-auto mt-10 p-11 border border-gray-400"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h1 className="text-center text-3xl font-bold mb-6">Login</h1>
        <Input
          label={"Email"}
          id={"email"}
          type={"email"}
          {...register("email", { required: true })}
        />

        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          {...register("password", { required: true })}
        />
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
          type="submit"
        >
          Login
        </button>
        <div className="mt-2">
          <Link
            className="flex items-center justify-center h-9 rounded-md bg-white text-slate-700 border border-solid border-gray-300 shadow text-sm font-medium select-none hover:bg-gray-50"
            to={"/signup"}
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
