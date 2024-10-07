import Input from "./input";
import { useForm } from "react-hook-form";

export default function Adress({ onAdressSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    onAdressSubmit(data);
  };

  return (
    <div>
      <div>
        <form className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <h1>Adress Deatils</h1>
          <Input
            label={" Name"}
            id={" name"}
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 ">name is required</span>
          )}
          <Input
            label={"Street"}
            id={"street"}
            type="text"
            {...register("street", { required: true })}
          />
          <Input
            label={"City"}
            id={"city"}
            type="text"
            {...register("city", { required: true })}
          />
          <Input
            label={"Phone Number"}
            id={"phone number"}
            {...register("phone number", { required: true })}
          />
          <Input
            label={"Pincode"}
            id={"pincode"}
            {...register("pincode", { required: true })}
          />
          <button type="submit">Create address</button>
        </form>
      </div>
    </div>
  );
}
