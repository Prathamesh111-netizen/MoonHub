const express = require("express");

const router = express.Router();

const {
  getAllRepositories,
  createRepository,
  getRepositoryById,
  deleteRepository,
  getMyRepositories,
  getAllOtherRepositories
} = require("../controllers/repository.controller");

router
  .route("/")
  .get(getAllRepositories)
  .post(createRepository);

router
  .route("/all/:id")
  .get(getAllOtherRepositories)

router
  .route("/my/:id")
  .get(getMyRepositories)

router
  .route("/:id")
  .get(getRepositoryById)
  .delete(deleteRepository);

module.exports = router;
