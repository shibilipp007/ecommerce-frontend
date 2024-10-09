import PorductCard from "@/components/porductCard";
import api from "@/lib/api";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await api.get("/products");
  const products = response.data;
  return { products };
}

export default function Shop() {
  const { products } = useLoaderData();

  return (
    <div className="grid grid-cols-6 gap-2 py-6 px-12">
      {products.map((product) => (
        <PorductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
