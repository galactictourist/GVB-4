import { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

interface Props {
    file: string
    onChangeHandler: (e: any) => void
}

const UploadZipButton = ({file, onChangeHandler}: Props) => {
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        {file === "" ? "Upload Zip" : file}
        <VisuallyHiddenInput type="file" accept=".zip" onChange={onChangeHandler} />
    </Button>
  );
};

export default UploadZipButton;
