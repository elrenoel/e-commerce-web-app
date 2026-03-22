import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productsAPI";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect( () => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () =>{
    await getAllProducts(setProducts);
    console.log(products);
  }

  return (
    <div className="w-[90%] max-w-300 mx-auto">
      <h1 className="text-2xl font-bold mb-6">List Product</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-2 rounded-sm flex flex-col h-full hover:shadow-md transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.coverImage ? product.coverImage : "placeholder.png"}
                alt="Product"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            <div className="p-3 flex flex-col grow">
              <h2 className="text-sm text-gray-800 line-clamp-2 mb-2 min-h-10">
                {product.name}
              </h2>

              <p className="text-amber-700 font-bold text-lg mt-auto">
                Rp.{product.minPrice}
              </p>

              <div className="mt-3">
                <button className="w-full border border-gray-300 text-gray-700 py-1.5 rounded-sm hover:bg-blue-50 text-sm font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 flex flex-col items-center gap-3">
        Pagination????
        <div className="flex gap-1">
          <span className="bg-black w-1 h-1 rounded"></span>
          <span className="bg-black w-1 h-1 rounded"></span>
          <span className="bg-black w-1 h-1 rounded"></span>
          <span className="bg-black w-1 h-1 rounded"></span>
          <span className="bg-black w-1 h-1 rounded"></span>
        </div>
      </div> */}
    </div>
  );
};

export default ListProducts;
