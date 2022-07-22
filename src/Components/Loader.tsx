import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop invisible={true} sx={{ color: "#333" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
