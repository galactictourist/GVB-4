"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Layer from "@/components/Core/Layer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { rowStyle } from "../styles";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const containerStyle = {
  mt: 20,
  display: "flex",
  justifyContent: "center",
};

const contentStyle = {
  gap: 3,
  display: "flex",
  flexDirection: "column",
};

const layerStyle = {
  mt: 3,
  mb: 3,
};

const btnRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function HomePage() {
  const [nftAmount, setNftAmount] = useState(0);
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

  return (
    <Box sx={containerStyle}>
      <Box sx={contentStyle}>
        <Box sx={rowStyle}>
          <Typography>Amount of NFT to generate:</Typography>
          <TextField
            sx={{ input: { textAlign: "center" } }}
            id="standard-basic"
            value={nftAmount}
            variant="standard"
            onChange={(e) => setNftAmount(+e.target.value)}
          />
        </Box>
        <Box sx={layerStyle}>
          <Typography variant="h6">Layers</Typography>
          {layerNames.map((layerName, i) => (
            <Layer
              key={i}
              label={i === 0 ? `${layerName} Layer` : `Layer ${i + 1}`}
              inputValue={layerName}
              inputHandler={(e: any) => inputHandler(i, e.target.value)}
            />
          ))}
        </Box>
        <Box sx={btnRowStyle}>
          <Button variant="contained" onClick={addHandler}>
            Add Layer
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Button variant="contained" onClick={addHandler}>
          Generate
        </Button>
      </Box>
    </Box>
  );
}
