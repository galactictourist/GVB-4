const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const {
  startCreating,
  buildSetup,
} = require(`${process.cwd()}/src/generator/build.js`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { collectionDetails, layerConfigs } = req.body;
  buildSetup();
  startCreating(collectionDetails, layerConfigs);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Running generator server on port ${port}`);
});
