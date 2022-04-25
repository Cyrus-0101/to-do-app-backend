const express = require("express");

const categoryControllers = require("../controllers/categoryCrudController");

const router = express.Router();

router.route("/");

router.get("/", categoryControllers.getAllCategorysCOntroller);

router.get("/:id", categoryControllers.getCategoryByIDController);

router.patch("/:id", categoryControllers.patchUpdateCategoryController);

router.post("/", categoryControllers.postCreateCategoryController);

router.delete("/:id", categoryControllers.deleteCategoryController);

module.exports = router;
