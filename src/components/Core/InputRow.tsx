import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "@/app/home.style";
import { SxProps, TextField, Theme } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { CollectionInput } from "@/schemas/Collection.schema";

export interface Props {
  sx: SxProps<Theme>
  label: string
  fieldName: "namePrefix" | "description" | "amount"
  control: Control<CollectionInput>
}

const InputRow = ({ sx, label, fieldName, control }: Props) => {
  return (
    <Box sx={styles.rowStyle}>
      <Box sx={sx}>
        <Typography>{label}:</Typography>
      </Box>
      <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <TextField sx={sx} id="standard-basic" variant="standard" {...field} />
          )}
        />
    </Box>
  );
};

export default InputRow;
