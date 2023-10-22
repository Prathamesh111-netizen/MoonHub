const database = require("../config/db");
const { repository } = database;

const getAllRepositories = async (req, res, next) => {
  try {
    const repositories = await repository.find({});
    res.status(200).json(repositories);
  } catch (error) {
    next(error);
  }
};

const createRepository = async (req, res, next) => {
  try {
    const {
      name,
      owner,
      description,
      image,
      oneTimeFee,
      subscriptionRate,
      folder,
      currency,
    } = req.body;

    const newRepository = new repository({
      name,
      description,
      image,
      oneTimeFee,
      subscriptionRate,
      folder,
      owner,
      currency,
    });
    await newRepository.save();
    res.status(201).json({
      success : true,
      message: "Repository created",
      repository: newRepository,
    });
  } catch (error) {
    next(error);
  }
};

const getRepositoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repositoryById = await repository.findById(id);
    if (!repositoryById) {
      return res.status(404).json({ message: "Repository not found" });
    }
    res.status(200).json(repositoryById);
  } catch (error) {
    next(error);
  }
};

const deleteRepository = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repositoryById = await repository.findById(id);
    if (!repositoryById) {
      return res.status(404).json({ message: "Repository not found" });
    }
    await repository.findByIdAndDelete(id);
    res.status(200).json({ message: "Repository deleted" });
  } catch (error) {
    next(error);
  }
};

const getMyRepositories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repositories = await repository.find({ owner: id });
    res.status(200).json(repositories);
  } catch (error) {
    next(error);
  }
};

const getAllOtherRepositories = async (req, res, next) => {
    try {
        const { id } = req.params;
        const repositories = await repository.find({ owner: { $ne: id } });
        res.status(200).json(repositories);
    } catch (error) {
        next(error);
    }
}


module.exports = {
  getAllRepositories,
  createRepository,
  getRepositoryById,
  deleteRepository,
  getMyRepositories,
  getAllOtherRepositories
};
