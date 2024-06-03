import { Box, Button, Modal, Typography } from "@mui/material";

interface Props{
    open: boolean
    handleClose: ()=>void;
}
export default function DeleteCard({open, handleClose}: Props) {
    return(
       <Modal open={open} onClose={handleClose} >
         <Box>
            <Typography>Are you sure you want to delete this card?</Typography>
            <Box>
                <Button>Cancel</Button>
                <Button>Delete Card</Button>
            </Box>
        </Box>
       </Modal>
    )
}
