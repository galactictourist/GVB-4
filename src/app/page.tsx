"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import UploadZipButton from "@/components/Core/UploadZipButton";
import InputRow from "@/components/Core/InputRow";
import Note from "@/components/Core/Note";
import { containerStyle, contentStyle, layerStyle } from "./home.style";
import { rowStyle } from "../styles";
import { DEFAULT_FORMDATA, useForm } from "../hooks/useForm";
import type { FormData } from '../hooks/useForm'

const NOTES = {
  COLLECTION: "Ensure the collection name is not already taken up on OpenSea.",
  LAYERS:
    "The above layers are ordered from botton to top. Each additional layer are layered on top of the existing layers. There needs to be sufficient layers or items per layers for the generator to function.",
  ZIP: "Zip file should contain folders named with the above layer names with images placed accordingly.",
};

const inputStyleOne = { input: { textAlign: "left", width: "300px" } };
const inputStyleTwo = { input: { textAlign: "center", width: "180px" } };

export default function HomePage() {
  const {
    formData,
    setFormData,
    inputHandler,
    layerInputHandler,
    addHandler,
    zipFileHandler,
    error,
    setError
  } = useForm();
  const [linkValue, setLinkValue] = useState("");

  const onGenerateHandler = async () => {
    const {namePrefix, description, nftAmount, zipFile, layerNames} = formData;

    const collectionDetails = {
      namePrefix,
      description,
    };

    const layerConfigs = [
      {
        growEditionSizeTo: +nftAmount,
        layersOrder: layerNames.map((layer) => ({ name: layer })),
      },
    ];

    const data = new FormData();
    data.append("zipFile", zipFile!);
    data.append("collectionDetails", JSON.stringify(collectionDetails));
    data.append("layerConfigs", JSON.stringify(layerConfigs));

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: data,
    });

    if (res.status === 200) {
      const blob = await res.blob();
      const file = URL.createObjectURL(
        new Blob([blob], { type: "application/zip" })
      );
      setLinkValue(file);
    } else {
      setLinkValue("");
      setError(true);
    }
  };

  const formValidation = (data: FormData) => {
    const {namePrefix, description, nftAmount, zipFile, layerNames} = data;

    return !(
      namePrefix !== "" &&
      description !== "" &&
      !isNaN(+nftAmount) &&
      +nftAmount > 0 &&
      zipFile &&
      layerNames.length >= 3 &&
      layerNames.reduce((bool, val: string) => bool && val !== "", true)
    )
  }

  const reset = () => {
    setFormData(DEFAULT_FORMDATA);
    setLinkValue("");
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={contentStyle}>
        <Box>
          <Typography variant="h6">Collection Details</Typography>
          <InputRow
              name="namePrefix"
              label="Collection Name"
              inputValue={formData.namePrefix}
              sx={inputStyleOne}
              inputHandler={inputHandler}
            />
          <InputRow
              name="description"
              label="Collection Description"
              inputValue={formData.description}
              sx={inputStyleOne}
              inputHandler={inputHandler}
            />
          <InputRow
              name="nftAmount"
              label="Amount of NFT to generate"
              inputValue={formData.nftAmount}
              sx={inputStyleTwo}
              type="number"
              inputHandler={inputHandler}
            />
          <Note description={NOTES.COLLECTION} />
        </Box>
        <Box sx={layerStyle}>
          <Typography variant="h6">Layers Naming</Typography>
          {formData.layerNames.map((layerName, i) => (
            <InputRow
              key={i}
              label={i === 0 ? `${layerName} Layer` : `Layer ${i + 1}`}
              inputValue={layerName}
              sx={inputStyleTwo}
              inputHandler={(e: any) => layerInputHandler(i, e.target.value)}
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
          // disabled={formValidation(formData)}
          onClick={onGenerateHandler}
        >
          Generate
        </Button>
        <FormControl error={error} variant="standard">
          <Button
            variant="contained"
            disabled={linkValue === ""}
            href={linkValue}
            download={`${formData.namePrefix}.zip`}
            onClick={reset}
          >
            {linkValue === "" ? "Download ..." : `${formData.namePrefix}.zip`}
          </Button>
          {error && <FormHelperText>Please verified your inputs, layers and your layers zip file should match accordingly.</FormHelperText>}
        </FormControl>
      </Box>
    </Box>
  );
}
