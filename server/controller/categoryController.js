import slugify from "slugify";
import { CategoryModel } from "../models/categoryModel.js";
import handleError from "../utils/handleError.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(200).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new CategoryModel({
      name,
      slug: slugify(name),
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the category",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (category) {
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Error while updating Category",
      });
    }
  } catch (error) {
    return handleError(res, 500, "Server Error while updating category");
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});

    return res.status(200).json({
      success: true,
      message: "All category list",
      category,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error while fetching category");
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params.slug;
    const singleCategory = await CategoryModel.findOne(slug);

    if (singleCategory) {
      return res.status(200).json({
        success: true,
        message: "Single Category",
        singleCategory,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Error fetching single category",
      });
    }
  } catch (error) {
    return handleError(res, 500, "Server Error fetching single category");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return handleError(res, 500, "Server Error while deleting category");
  }
};
