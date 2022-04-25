const catchAsync = require("./catchAsync");
const AppError = require("./appError").default;
const APIFeatures = require("./apiFeatures");

// HANDLER FACTORY FUNCTIONS.

/**
 * These are our general `CRUD` functions in the app,
 * A function typically takes a Model and for some other
 * functionalities takes other params such as `ModelPopOptions` etc.
 * @param {*} Model
 * @returns a status message,
 * a statusCode of 2xx to indicate successful transactions
 * and data if present.
 */

/**
 * deleteOne takes a Model instance, and if valid returns the created instance
 * @param {*} Model
 * if successful,
 * @returns a status of success, and
 * a statusCode of 204 to indicate successful transaction.
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

/**
 * updateOne takes a Model instance, and if valid returns the created instance
 * @param {*} Model
 * if successful,
 * @returns a status of success,
 * a statusCode of 200 to indicate successful transaction
 * and data.
 */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

/**
 * createOne takes a Model instance, and if valid returns the created instance.
 * @param {*} Model
 * if successful,
 * @returns a status message,
 * a statusCode of 200 to indicate successful transactions
 * and data.
 */
exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      statusCode: 201,
      data: doc,
    });
  });

/**
 * getOne takes Model instance and returns all the data if valid.
 * @param {*} Model
 * if successful,
 * @returns a status message,
 * a statusCode of 200 to indicate successful transactions, results,
 * and data.
 */
exports.getOne = (Model, popOptions, popOptions2) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions2) query = query.populate(popOptions).populate(popOptions2);
    if (popOptions) query = query.populate(popOptions);

    const features = new APIFeatures(query, req.query).limitFields();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

/**
 * getAll takes Model instance and returns all the data if valid.
 * @param {*} Model
 * if successful,
 * @returns a status message,
 * a statusCode of 200 to indicate successful transactions, results,
 * and data.
 */
exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.id) filter = { data: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // let doc = await features.query.explain();
    let doc;

    if (popOptions) {
      doc = await features.query.populate(popOptions);
    } else {
      doc = await features.query;
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
