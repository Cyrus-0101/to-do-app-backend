const factory = require("../../utils/factory");

const Category = require("../models/Category");

/**
 * Create a new Category
 * @param {Category} req
 */

exports.postCreateCategoryController = factory.createOne(Category);

/**
 * Patch Update Single Category
 * @param {Category} req
 */
exports.patchUpdateCategoryController = factory.updateOne(Category);

/**
 * Delete Single Category
 * @param {Category._id} req
 */

exports.deleteCategoryController = factory.deleteOne(Category);

/**
 * Get All Categorys
 * @param {Category} req
 */

exports.getAllCategorysCOntroller = factory.getAll(Category);

/**
 * Get Single Category.
 * @param {Category} req
 */
exports.getCategoryByIDController = factory.getOne(Category);
