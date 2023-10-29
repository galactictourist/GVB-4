"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { rowStyle } from "../styles";
import Layer from "@/components/Core/Layer";

const containerStyle = {
  mt: 20,
  display: "flex",
  justifyContent: "center",
};

const contentStyle = {
  display: "flex",
  gap: 5,
  flexDirection: "column",
};

export default function HomePage() {
  const [nftAmount, setNftAmount] = useState(0);
  const [layerNames, setLayerNames] = useState(["Background", ""]);

  const inputHandler = (index: number, value: string) => {
    const layers = [...layerNames];
    layers[index] = value;
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
        <Box>
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
      </Box>
    </Box>
  );
}
