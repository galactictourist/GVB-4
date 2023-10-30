import { styled } from "@mui/material/styles";

export const VisuallyHiddenInput = styled("input")({
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

export const containerStyle = {
  mt: 20,
  display: "flex",
  justifyContent: "center",
};

export const contentStyle = {
  gap: 3,
  display: "flex",
  flexDirection: "column",
  width: "480px",
};

export const layerStyle = {
  mt: 3,
  mb: 3,
};
