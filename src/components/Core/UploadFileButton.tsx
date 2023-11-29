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

const buttonStyle = {
  width: 300
}

interface Props {
  fileName: string;
  fileType: string;
  onChangeHandler: Function;
}

const UploadFileButton = ({ fileName, fileType, onChangeHandler }: Props) => {
  return (
    <Button
    sx={buttonStyle}
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {fileName}
      <VisuallyHiddenInput
        type="file"
        accept={fileType}
        onChange={(e) => onChangeHandler(e.target.files![0])}
      />
    </Button>
  );
};

export default UploadFileButton;
