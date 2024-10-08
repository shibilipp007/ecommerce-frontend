import { logout } from "@/features/login";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await api.get("/auth/verify");
  const profile = response.data;
  console.log(profile);
  return { profile };
}

export default function Profile() {
  const { profile } = useLoaderData();
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-2xl pl-14 font-bold">Profile </h1>
      <div className="flex flex-col px-16 items-center justify-center">
        <div key={profile?.id}>
          <div className="flex justify-center items-center">
            <div className="h-20 w-20 flex flex-row rounded-full justify-center items-center bg-gray-300 ">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col pl-5  mt-7 gap-4 mb-16">
            <h1 className="text-xl font-bold ">
              Name:<span className="text-lg">{profile?.name}</span>
            </h1>
            <h3 className="text-lg font-bold ">Email:{profile?.email}</h3>
          </div>
          <button
            className="px-9 py-4 mb-6 bg-black text-white"
            onClick={() => {
              dispatch(logout());
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
