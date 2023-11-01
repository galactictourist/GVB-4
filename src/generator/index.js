const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 4000;
const upload = multer({ dest: "uploadedFiles" });
const AdmZip = require("adm-zip");

const {
  startCreating,
  buildSetup,
} = require(`${process.cwd()}/src/generator/build.js`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("zipFile"), (req, res) => {
  const zip = new AdmZip(req.file.path);
  const zipEntries = zip.getEntries().filter(
    (entry) =>
      entry.entryName.match(/\.(png)$/i) &&
      !entry.entryName.match(/MACOSX/i)
  );
  const collectionDetails = JSON.parse(req.body.collectionDetails);
  const layerConfigs = JSON.parse(req.body.layerConfigs);

  zipEntries.forEach(function (zipEntry) {
    zip.extractEntryTo(zipEntry.entryName.toString(), "layers");
  });

  buildSetup();
  startCreating(collectionDetails, layerConfigs);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Running generator server on port ${port}`);
});
