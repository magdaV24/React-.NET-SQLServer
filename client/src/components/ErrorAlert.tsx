import { Box, Button, Divider, Modal, Typography } from "@mui/material";
interface Props{
  open: boolean;
  handleClose: ()=>void;
  error: string
}
export default function ErrorAlert({open, handleClose, error}:Props) {

  return (
    <Modal className="modal" open={open} onClose={handleClose}>
      <Box sx={{ backgroundColor: "error.dark" }} className="alert-wrapper">
        <Typography variant="h5">Something went wrong!</Typography>
        <Divider className="divider"/>
        <Typography>{error}</Typography>
        <Divider className="divider"/>
        <Button onClick={handleClose} variant="outlined">Close</Button>
      </Box>
    </Modal>
  );
}
