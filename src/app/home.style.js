
const flexCol = {
  display: "flex",
  flexDirection: "column",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const containerStyle = {
  mt: 20,
  display: "flex",
  justifyContent: "center",
};

const flexColStyle = {
  ...flexCol,
  gap: 3,
};

const contentStyle = {
  ...flexCol,
  gap: 3,
  width: "480px",
};

const uploadBoxStyle = {
  ...flexCol,
  gap: 2,
  alignItems: "center",
};

const inputStyleOne = { 
  input: { 
    textAlign: "left", 
    width: "300px" 
  } 
};

const inputStyleTwo = { 
  input: { 
    textAlign: "center", 
    width: "180px" 
  } 
};

const fullWidthStyle = {
  width: "480px",
}

const styles = {
  rowStyle,
  containerStyle,
  flexColStyle,
  contentStyle,
  uploadBoxStyle,
  inputStyleOne,
  inputStyleTwo,
  fullWidthStyle
}

export default styles;