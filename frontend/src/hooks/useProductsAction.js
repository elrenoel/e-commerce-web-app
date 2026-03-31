import { useCallback, useEffect, useState } from "react";
import { getAllProducts, getProductDetail, getProducts, updateProduct } from "../api/productsAPI";

export const useProductAction = (role) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data =
        role === "admin" ? await getAllProducts() : await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleStatus = async (productId, currentChecked) => {
    try {
      await updateProduct(productId, { isActive: currentChecked });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, isActive: currentChecked } : p,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDetail = async (slug) =>{
    try {
      const data = await getProductDetail(slug);

      setProductDetail(data);
    } catch (error) {
      console.error(error);
    }
  }

  return { products, productDetail, loading, refetch: fetchProducts, toggleStatus , fetchProductDetail};
};
