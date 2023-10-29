import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { rowStyle } from "../../styles";

export interface Props {
  label: string;
  inputValue: string;
  inputHandler: (e: any) => void;
}

const Layer = ({ label, inputValue, inputHandler }: Props) => {
  return (
    <Box sx={rowStyle}>
      <Box sx={{ width: "50%" }}>
        <Typography>{label}:</Typography>
      </Box>
      <TextField
        sx={{ input: { textAlign: "center" } }}
        id="standard-basic"
        value={inputValue}
        variant="standard"
        onChange={inputHandler}
      />
    </Box>
  );
};

export default Layer;
