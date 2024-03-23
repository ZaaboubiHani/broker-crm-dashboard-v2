import React from "react";
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";

interface TaskCancelDialogProps {
    isOpen: boolean,
    message: string,
    onClose: (value: string) => void;
    onYes: () => void,
    onNo: () => void,
    onMessageChange: (msg: string) => void,
}

const TaskCancelDialog: React.FC<TaskCancelDialogProps> = ({ isOpen, message, onClose, onNo, onYes,onMessageChange }) => {

    const handleClose = () => {
        onClose('selectedValue');
    };

    return (
        <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={isOpen} >
            <DialogTitle>{message}</DialogTitle>
            <TextField
                sx={{ margin: '8px', width: 'calc(100% - 16px)' }}
                size='small' label="Message d'annulation" variant="outlined"
                onChange={(event) => {
                    onMessageChange(event.target.value);
                }} />
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => onYes()} variant="contained" disableElevation>
                    Oui
                </Button>
                <Button onClick={() => onNo()} variant="contained" disableElevation>
                    Non
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskCancelDialog;