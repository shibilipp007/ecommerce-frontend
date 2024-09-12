import { Link } from "react-router-dom";

const categories = [
  "Dresess",
  "Pants",
  "Co-ords",
  "Skirts",
  "Shirts",
  "T-Shirts",
];

export default function Home() {
  return (
    <main>
      <section className="min-h-screen bg-[url('https://cdn.shopify.com/s/files/1/0785/1674/8585/files/Gingham_Grace_desk_8134c614-496e-49cb-95f5-981e6495d31d.png?v=1724742420&width=2000&height=1125&crop=center')] bg-cover bg-center flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center text-center gap-3 text-white">
          <h6 className="font-bold">CASUAL $ EVERYDAY</h6>
          <h1 className="text-4xl ">
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
              {categories.map((c, i) => (
                <div key={i}>
                  <div className="relative">
                    <img
                      src="https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?size=626&ext=jpg"
                      alt=""
                      className="aspect-auto"
                    />
                  </div>
                  <div>
                    <h1 className="uppercase text-sm font-bold text-center mt-2">
                      {c}
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
              {Array.from({ length: 12 }).map((c, i) => (
                <div key={i}>
                  <div className="relative">
                    <Link to={"/gerilla-best-dress/details/12121215"}>
                      <img
                        src="https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?size=626&ext=jpg"
                        alt=""
                        className="aspect-auto"
                      />
                    </Link>
                  </div>
                  <div>
                    <h1 className="uppercase mt-2">Gerilla</h1>
                    <p className="text-sm text-slate-500 truncate">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Hic, sequi.
                    </p>
                    <h3 className="mt-2 font-bold">&#8377;2,999</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
