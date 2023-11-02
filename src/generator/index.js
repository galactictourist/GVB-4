const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 4000;
const upload = multer({ dest: "files" });
const AdmZip = require("adm-zip");

const {
  startCreating,
  buildSetup,
  deleteFiles,
  createBuildZipFile,
} = require(`./build.js`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("zipFile"), async (req, res) => {
  try {
    const collectionDetails = JSON.parse(req.body.collectionDetails);
    const layerConfigs = JSON.parse(req.body.layerConfigs);
    const zip = new AdmZip(req.file.path);

    const zipEntries = await new Promise(async (resolve) => {
      resolve(
        zip
          .getEntries()
          .filter(
            (entry) =>
              entry.entryName.match(/\.(png)$/i) &&
              !entry.entryName.match(/MACOSX/i)
          )
      );
    });

    await Promise.all(
      zipEntries.map((zipEntry) =>
        zip.extractEntryTo(zipEntry.entryName.toString(), "layers")
      )
    );

    // Generating
    buildSetup();
    await startCreating(collectionDetails, layerConfigs);
    await createBuildZipFile(collectionDetails.namePrefix);

    res.status(200).sendFile(
      `${process.cwd()}/files/${collectionDetails.namePrefix}.zip`,
      (err) => {
        if (!err) {
          // Delete build, layers & uploadFiles
          deleteFiles();
        }
      }
    );
  } catch (error) {
    deleteFiles();
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Running generator server on port ${port}`);
});
