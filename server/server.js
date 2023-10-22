require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const repositoryRoutes = require("./routes/repository.routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("use /api/v1/repository");
});

app.use("/api/v1/repository", repositoryRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(3000, async () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});
