import PorductCard from "../components/porductCard";
import { useLoaderData } from "react-router-dom";
import api from "../lib/api";

export async function loader() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      api.get("/products"),
      api.get("/categories"),
    ]);

    const products = productsResponse.data;
    const categories = categoriesResponse.data;

    return { products, categories };
  } catch (error) {
    console.log(error);
    return { products: [], categories: [] };
  }
}

export default function Home() {
  const { products, categories } = useLoaderData();
  return (
    <>
      <section className="min-h-screen bg-[url('https://cdn.shopify.com/s/files/1/0785/1674/8585/files/Gingham_Grace_desk_8134c614-496e-49cb-95f5-981e6495d31d.png?v=1724742420&width=2000&height=1125&crop=center')] bg-cover bg-center flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center text-center gap-3 text-white">
          <h6 className="font-bold">CASUAL $ EVERYDAY</h6>
          <h1 className="text-4xl">
            Effortlessly blend comfort <br /> & style!
          </h1>
          <h5 className="text-lg font-bold">
            Effortlessly blend comfort and style with our Casual & Everyday
            collection, featuring cozy sweaters, versatile <br /> denim,
            laid-back tees, and relaxed-fit joggers for your everyday adventures
          </h5>
          <button className="mt-5 px-8 py-4 bg-white text-slate-900 shadow-lg select-none rounded font-bold">
            View collection
          </button>
        </div>
      </section>
      <section className="py-10">
        <div className="mx-auto lg:w-4/5">
          <div className="px-4">
            <div className="flex justify-center mb-6">
              <h1 className="text-4xl uppercase font-bold">Categories</h1>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {categories?.map((c) => (
                <div key={c._id}>
                  <div className="relative">
                    <img src={c.image} alt="" className="aspect-auto" />
                  </div>
                  <div>
                    <h1 className="uppercase text-sm font-bold text-center mt-2">
                      {c.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="mx-auto lg:w-4/5">
          <div className="px-4">
            <div className="flex justify-center mb-6">
              <h1 className="text-4xl uppercase font-bold">Popular products</h1>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {products?.map((product) => (
                <PorductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>
            <img
              className="mx-auto lg:w-4/5 mb-3"
              src="/banner_women.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
