"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import UploadZipButton from "@/components/Core/UploadZipButton";
import Layer from "@/components/Core/Layer";
import Note from "@/components/Core/Note";
import { containerStyle, contentStyle, layerStyle } from "./home.style";
import { rowStyle } from "../styles";

const NOTES = {
  COLLECTION: "Ensure the collection name is not already taken up on OpenSea.",
  LAYERS:
    "The above layers are ordered from botton to top. Each additional layer are layered on top of the existing layers. There needs to be sufficient layers or items per layers for the generator to function.",
  ZIP: "Zip file should contain folders named with the above layer names with images placed accordingly.",
};

const DEFAULT_LAYER_STATE = ["Background", ""];

export default function HomePage() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [nftAmount, setNftAmount] = useState("0");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [layerNames, setLayerNames] = useState(DEFAULT_LAYER_STATE);
  const [linkValue, setLinkValue] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const inputHandler = (index: number, value: string) => {
    const layers = [...layerNames];
    layers[index] = value;
    setLayerNames(layers);
  };

  const addHandler = () => {
    const layers = [...layerNames, ""];
    setLayerNames(layers);
  };

  const zipFileHandler = (file: File) => {
    setZipFile(file);
  };

  const onGenerateHandler = async () => {
    const collectionDetails = {
      namePrefix: collectionName,
      description: collectionDesc,
    };

    const layerConfigs = [
      {
        growEditionSizeTo: +nftAmount,
        layersOrder: layerNames.map((layer) => ({ name: layer })),
      },
    ];

    const formData = new FormData();
    formData.append("zipFile", zipFile!);
    formData.append("collectionDetails", JSON.stringify(collectionDetails));
    formData.append("layerConfigs", JSON.stringify(layerConfigs));

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const blob = await res.blob();
      const file = URL.createObjectURL(
        new Blob([blob], { type: "application/zip" })
      );
      setLinkValue(file);
    } else {
      setLinkValue("");
      setHelperText(
        "Please verified your inputs, layers and your layers zip file should match accordingly."
      );
      setError(true);
    }
  };

  const reset = () => {
    setCollectionName("");
    setCollectionDesc("");
    setNftAmount("0");
    setLayerNames(DEFAULT_LAYER_STATE);
    setZipFile(null);
    setLinkValue("");
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={contentStyle}>
        <Box>
          <Typography variant="h6">Collection Details</Typography>
          <Box sx={rowStyle}>
            <Typography>Collection Name:</Typography>
            <TextField
              sx={{ input: { textAlign: "left", width: "300px" } }}
              id="standard-basic"
              value={collectionName}
              variant="standard"
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </Box>
          <Box sx={rowStyle}>
            <Typography>Collection Description:</Typography>
            <TextField
              sx={{ input: { textAlign: "left", width: "300px" } }}
              id="standard-basic"
              value={collectionDesc}
              variant="standard"
              onChange={(e) => setCollectionDesc(e.target.value)}
            />
          </Box>
          <Box sx={rowStyle}>
            <Typography>Amount of NFT to generate:</Typography>
            <TextField
              sx={{ input: { textAlign: "center" } }}
              id="standard-basic"
              value={nftAmount}
              variant="standard"
              type="number"
              onChange={(e) => setNftAmount(e.target.value)}
            />
          </Box>
          <Note description={NOTES.COLLECTION} />
        </Box>
        <Box sx={layerStyle}>
          <Typography variant="h6">Layers Naming</Typography>
          {layerNames.map((layerName, i) => (
            <Layer
              key={i}
              label={i === 0 ? `${layerName} Layer` : `Layer ${i + 1}`}
              inputValue={layerName}
              inputHandler={(e: any) => inputHandler(i, e.target.value)}
            />
          ))}
          <Note description={NOTES.LAYERS} />
        </Box>

        <Box>
          <Box sx={rowStyle}>
            <Button variant="contained" onClick={addHandler}>
              Add Layer
            </Button>
            <UploadZipButton onChangeHandler={zipFileHandler} />
          </Box>
          <Note description={NOTES.ZIP} />
        </Box>
        <Button
          variant="contained"
          disabled={
            !(
              collectionName !== "" &&
              collectionDesc !== "" &&
              !isNaN(+nftAmount) &&
              +nftAmount > 0 &&
              zipFile &&
              layerNames.length >= 3 &&
              layerNames.reduce((bool, val: string) => bool && val !== "", true)
            )
          }
          onClick={onGenerateHandler}
        >
          Generate
        </Button>
        <FormControl error={error} variant="standard">
          <Button
            variant="contained"
            disabled={linkValue === ""}
            href={linkValue}
            download={`${collectionName}.zip`}
            onClick={reset}
          >
            {linkValue === "" ? "Download ..." : `${collectionName}.zip`}
          </Button>
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    </Box>
  );
}
