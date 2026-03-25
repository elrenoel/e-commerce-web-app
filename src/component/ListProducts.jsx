import { useEffect, useState } from "react";
import { getAllProducts, getProducts } from "../api/productsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProductAction } from "../hooks/useProductsAction";

const ListProducts = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user_role");
  const navigate = useNavigate();

  const {products, loading, toggleStatus} = useProductAction();

  const handleAddtoCart = (e) => {
    e.prevenDefault;
    if (!token) {
      navigate("/login");
    }
  };

  if(loading) return <div>Loading products...</div>;

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
                src={
                  product.coverImage ? product.coverImage : "placeholder.png"
                }
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

              {role === "admin" ? (
                <label className="inline-flex items-center cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={product.isActive}
                    onChange={(e) =>
                      toggleStatus(product._id, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-800"></div>
                  <span className="select-none ms-3 text-sm font-medium text-heading">
                    {product.isActive ? "Available" : "Not Available"}
                  </span>
                </label>
              ) : (
                <div className="mt-3">
                  <button
                    className="w-full border border-gray-300 text-gray-700 py-1.5 rounded-sm hover:bg-blue-50 text-sm font-medium transition-colors"
                    onClick={handleAddtoCart}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
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
