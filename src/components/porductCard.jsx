import { Link } from "react-router-dom";

export default function PorductCard({ product }) {
  return (
    <article className="mt-2 shadow-lg px-3 py-3 rounded dark:shadow-white/10">
      <div className="relative">
        <Link to={`/${product.slug}/dp/${product._id}`}>
          <img src={product.images[0]} alt="" className="aspect-auto" />
        </Link>
      </div>
      <div>
        <h1 className="uppercase mt-2 dark:text-white">
          {product.title.slice(0, 20)}
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-100 truncate">
          {product.description.slice(0, 20)}
        </p>
        <h3 className="mt-2 font-bold dark:text-white">
          &#8377;{product.price}
        </h3>
      </div>
    </article>
  );
}
