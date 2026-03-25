import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import ProductVariant from "../models/productVariant.model.js";

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, categoryId, coverImage } = req.body;

    if (!name || !description || !categoryId || !coverImage) {
      return res.status(400).json({
        message: "name, description, categoryId, coverImage must be filled in.",
      });
    }

    const category = await Category.findOne({
      _id: categoryId,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category is not found.",
      });
    }

    const slug = generateSlug(name);

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product is already exist.",
      });
    }

    const product = await Product.create({
      name,
      description,
      category: categoryId,
      coverImage,
      slug,
    });

    return res.status(201).json({
      message: "Success Create Product",
      data: {
        id: product._id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        category: product.category,
        coverImage: product.coverImage,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, featured } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = { isActive: true };

    if (featured) {
      filter.isFeatured = featured === "true";
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      // console.log("category query:", category);
      const categoryDoc = await Category.findOne({ slug: category });
      // console.log("categoryDoc:", categoryDoc);

      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // console.log("FILTER:", filter);

    // Gantilah query Product.find() kamu dengan ini:
    const products = await Product.aggregate([
      { $match: filter }, // Filter isActive, search, dll
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNumber },
      {
        $lookup: {
          from: "productvariants", // Nama COLLECTION di MongoDB (biasanya huruf kecil & jamak)
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      },
      {
        $addFields: {
          minPrice: {
            $ifNull: [{ $min: "$variants.price" }, 0],
          },
        },
      },
    ]);

    // Dengan Aggregate, data minPrice sudah langsung ada di tiap object.
    return res.status(200).json({
      message: "Products fetched successfully",
      total: products.length,
      data: products, // Langsung kirim, tidak perlu .map lagi
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, featured } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (featured) {
      filter.isFeatured = featured === "true";
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      // console.log("category query:", category);
      const categoryDoc = await Category.findOne({ slug: category });
      // console.log("categoryDoc:", categoryDoc);

      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // console.log("FILTER:", filter);

    // Gantilah query Product.find() kamu dengan ini:
    const products = await Product.aggregate([
      { $match: filter }, // Filter isActive, search, dll
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNumber },
      {
        $lookup: {
          from: "productvariants", // Nama COLLECTION di MongoDB (biasanya huruf kecil & jamak)
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      },
      {
        $addFields: {
          minPrice: {
            $ifNull: [{ $min: "$variants.price" }, 0],
          },
        },
      },
    ]);

    // Dengan Aggregate, data minPrice sudah langsung ada di tiap object.
    return res.status(200).json({
      message: "Products fetched successfully",
      total: products.length,
      data: products, // Langsung kirim, tidak perlu .map lagi
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createProductVariant = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const {
      sku,
      woodType,
      size,
      color,
      price,
      stock,
      weight,
      dimensions,
      isPreorderAvailable,
      preorderDaysEstimate,
      isActive,
    } = req.body;

    if (
      !productId ||
      !sku ||
      !size ||
      !woodType ||
      !color ||
      !price ||
      !stock ||
      !weight ||
      !dimensions
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingSku = await ProductVariant.findOne({ sku });

    if (existingSku) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const productVariant = await ProductVariant.create({
      productId,
      sku,
      size,
      woodType,
      color,
      price,
      stock,
      weight,
      dimensions,
      isPreorderAvailable,
      preorderDaysEstimate,
      isActive,
    });

    return res.status(201).json({
      message: "Product variant created",
      data: {
        id: productVariant._id,
        sku: productVariant.sku,
        size: productVariant.size,
        woodType: productVariant.woodType,
        color: productVariant.color,
        price: productVariant.price,
        stock: productVariant.stock,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getProductDetail = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug, isActive: true }).populate(
      "category",
      "name slug",
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productVariant = await ProductVariant.find({
      productId: product._id,
      isActive: true,
    });

    return res.status(200).json({
      message: "Product detail fetched",
      data: {
        ...product.toObject(),
        productVariant,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      categoryId,
      coverImage,
      images,
      isFeatured,
      isActive,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (categoryId) {
      const categoryData = await Category.findById(categoryId);

      if (!categoryData) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      product.category = categoryId;
    }

    if (name) {
      product.name = name;
      product.slug = generateSlug(name);
    }

    if (description) product.description = description;
    if (coverImage) product.coverImage = coverImage;
    if (images) product.images = images;

    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured;
    }
    if (isActive !== undefined) {
      product.isActive = isActive;
    }

    await product.save();

    return res.status(201).json({
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Delete Product Successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateProductVariant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      sku,
      woodType,
      size,
      color,
      price,
      stock,
      weight,
      dimensions,
      isPreorderAvailable,
      preorderDaysEstimate,
      isActive,
    } = req.body;

    const productVariant = await ProductVariant.findById(id);

    if (!productVariant) {
      return res.status(404).json({
        message: "Product Variant not found",
      });
    }

    if (sku) productVariant.sku = sku;
    if (woodType) productVariant.woodType = woodType;
    if (size) productVariant.size = size;
    if (color) productVariant.color = color;
    if (price) productVariant.price = price;
    if (stock) productVariant.stock = stock;
    if (weight) productVariant.weight = weight;
    if (dimensions) productVariant.dimensions = dimensions;
    if (isPreorderAvailable)
      productVariant.isPreorderAvailable = isPreorderAvailable;
    if (preorderDaysEstimate)
      productVariant.preorderDaysEstimate = preorderDaysEstimate;
    if (isActive !== undefined) {
      productVariant.isActive = isActive;
    }

    await productVariant.save();

    return res.status(201).json({
      message: "Product updated",
      data: productVariant,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteProductVariant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productVariant = await ProductVariant.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Delete Product Variant Successfully",
      data: productVariant,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
