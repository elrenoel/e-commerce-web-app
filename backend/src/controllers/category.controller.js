import Category from "../models/category.model.js";

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      const err = new Error("Name and description are required");
      err.statusCode = 400;
      throw err;
    }

    const slug = generateSlug(name);

    const existing = await Category.findOne({ slug });
    if (existing) {
      const err = new Error("Category already exists");
      err.statusCode = 400;
      throw err;
    }

    const category = await Category.create({
      name,
      description,
      slug,
    });

    return res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .select("_id name slug");

    return res.status(200).json({
      message: "Categories fetched successfully",
      total: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
