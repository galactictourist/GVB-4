import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { rowStyle } from "../../styles";
import { SxProps, Theme } from "@mui/material";

export interface Props {
  label: string;
  inputValue: string;
  sx: SxProps<Theme>;
  inputHandler: (e: any) => void;
  type?: string;
}

const InputRow = ({ label, inputValue, sx, inputHandler, type="string" }: Props) => {
  return (
    <Box sx={rowStyle}>
      <Box sx={sx}>
        <Typography>{label}:</Typography>
      </Box>
      <TextField
        sx={sx}
        id="standard-basic"
        value={inputValue}
        variant="standard"
        onChange={inputHandler}
        type={type}
      />
    </Box>
  );
};

export default InputRow;
