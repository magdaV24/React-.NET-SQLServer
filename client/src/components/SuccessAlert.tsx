import { Box, Button, Divider, Modal, Typography } from "@mui/material";
interface Props{
  open: boolean;
  handleClose: ()=>void;
  success: string
}
export default function SuccessAlert({open, handleClose, success}:Props) {
    return(
         <Modal className="modal" open={open} onClose={handleClose}>
         <Box sx={{ backgroundColor: "success.dark" }} className="alert-wrapper">
           <Typography variant="h5">It went smoothly!</Typography>
           <Divider className="divider"/>
           <Typography>{success}</Typography>
           <Divider className="divider"/>
           <Button onClick={handleClose} variant="outlined">Close</Button>
         </Box>
       </Modal>
    )
}
