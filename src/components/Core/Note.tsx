import Typography from "@mui/material/Typography";

export interface Props {
  description: string;
}

const Note = ({ description }: Props) => {
  return (
    <Typography sx={{mt: 1}} variant="subtitle2">
      <i>{description}</i>
    </Typography>
  );
};

export default Note;
