import { useCallback, useEffect, useState } from "react";
import { getAllProducts, getProducts, updateProduct } from "../api/productsAPI";

export const useProductAction = (role) => {
  const [products, setProducts] = useState([]);
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

  return { products, loading, refetch: fetchProducts, toggleStatus };
};
