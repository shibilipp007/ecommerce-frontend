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
        className="w-[400px] mx-auto mt-10 p-6 border border-gray-400"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h1 className="text-center">Login</h1>
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
        <div className="mt-1 text-center">
          <Link className="text-blue-600 hover:underline" to={"/signup"}>
            create an accoount
          </Link>
        </div>
      </form>
    </>
  );
}
