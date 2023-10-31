"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Layer from "@/components/Core/Layer";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { rowStyle } from "../styles";
import Note from "@/components/Core/Note";
import {
  VisuallyHiddenInput,
  containerStyle,
  contentStyle,
  layerStyle,
} from "./home.style";

const NOTES = {
  COLLECTION: "Ensure the collection name is not already taken up on OpenSea.",
  LAYERS:
    "The above layers are ordered from botton to top. Each additional layer are layered on top of the existing layers.",
  ZIP: "Zip file should contain folders named with the above layer names with images placed accordingly.",
};

export default function HomePage() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [nftAmount, setNftAmount] = useState("0");
  const [layerNames, setLayerNames] = useState(["Background", ""]);

  const inputHandler = (index: number, value: string) => {
    const layers = [...layerNames];
    layers[index] = value;
    setLayerNames(layers);
  };

  const addHandler = () => {
    const layers = [...layerNames, ""];
    setLayerNames(layers);
  };

  const onGenerateHandler = async () => {
    const collectionDetails = {
      namePrefix: collectionName,
      description: collectionDesc
    };

    const layerConfigs = [{
      growEditionSizeTo: +nftAmount,
      layersOrder: layerNames.map(layer => ({name: layer}))
    }]

    const res = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({collectionDetails, layerConfigs}),
    })
  }

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
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Zip
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <Note description={NOTES.ZIP} />
        </Box>
        <Button variant="contained" onClick={onGenerateHandler}>
          Generate
        </Button>
      </Box>
    </Box>
  );
}
