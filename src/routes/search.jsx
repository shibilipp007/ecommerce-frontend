import { useLoaderData } from "react-router-dom";
import api from "../lib/api";
import PorductCard from "../components/porductCard";

export async function loader({ request }) {
  const url = new URL(request.url);

  const searchParams = new URLSearchParams(url.search);
  const response = await api.get(
    `/products/?query=${searchParams.get("query")}`
  );

  return response.data;
}

export default function Search() {
  const data = useLoaderData();

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {data?.map((product) => (
          <PorductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
