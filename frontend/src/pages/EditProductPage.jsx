import { useNavigate, useParams } from "react-router-dom";
import { useProductAction } from "../hooks/useProductsAction";
import { useEffect } from "react";
import { IoExit } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useCategoriesAction } from "../hooks/useCategoriesAction";

const EditProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { productDetail, loading, fetchProductDetail } = useProductAction();
  const { categories } = useCategoriesAction();

  useEffect(() => {
    fetchProductDetail(slug);
  }, [slug, fetchProductDetail]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    navigate("/login", { replace: true });
  };

  if (loading) return <div>Loading product details...</div>;

  return (
    <div className="w-[90%] mx-auto">
      <div className="pt-5 flex justify-between">
        <h1 className="text text-2xl font-bold">Admin Cocoa</h1>
        <button onClick={handleLogOut}>
          <IoExit size={25} color="#c10007" />
        </button>
      </div>

      <div className="py-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold mt-4">Edit Product</h1>

        <div className="flex gap-20 mt-2">
          <div className="max-w-80 aspect-square overflow-hidden flex gap-20">
            <img
              src={productDetail.coverImage || "placeholder.png"}
              alt={productDetail.name}
              className="w-80 h-full object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <h1 className="text-2xl font-bold">{productDetail.name}</h1>
            <p className="text-gray-600">{productDetail.description}</p>
            <div className="text-amber-700 font-bold text-lg">
              <span className="text-black font-medium px-3 py-2 bg-gray-300 rounded text-sm">
                {productDetail?.category?.name || "No Category"}
              </span>
            </div>
            <div>
              <div className="font-bold text-lg">Variants</div>
              <div className="flex items-center flex-wrap gap-5 mt-2">
                {productDetail?.productVariant?.length > 0 ? (
                  productDetail.productVariant.map((variant) => (
                    <div
                      className="px-4 py-2 border border-black rounded hover:bg-gray-300"
                      key={variant._id}
                    >
                      <p>{variant.sku}</p>
                    </div>
                  ))
                ) : (
                  <p>No Variants</p>
                )}
                <button className="flex items-center gap-1 rounded hover:bg-gray-200 px-2 py-1.5">
                  <IoIosAddCircleOutline size={32} />
                  <p>add variant</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <form className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            {/* Input Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter item name..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600"
              />
            </div>

            {/* Input Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Short description"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600"
              />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Category
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const categoryName =
                    category.name.charAt(0).toUpperCase() +
                    category.name.slice(1);

                  return (
                    <label
                      key={category.id || categoryName}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        id={categoryName}
                        name="category"
                        value={categoryName}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        {categoryName}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 mt-2">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
