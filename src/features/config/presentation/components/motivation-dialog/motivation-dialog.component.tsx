import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MotivationModel from "../../../domain/models/motivation.model";
import DialogActions from "@mui/material/DialogActions";

interface MotivationDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onEdit: (Motivation: MotivationModel) => void,
    initMotivation: MotivationModel,
}


const MotivationDialog: React.FC<MotivationDialogProps> = ({ onClose, isOpen, onEdit, initMotivation, }) => {

    const [motivation, setMotivation] = useState<MotivationModel>(new MotivationModel());

    useEffect(() => {
        if (initMotivation) {
            setMotivation(initMotivation.copyWith({}));
        }
    }, [initMotivation, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleEditMotivation = (): void => {
        onEdit(motivation);
    }

    const handleMotivationname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMotivation(motivation.copyWith({ motivation: event.target.value }));
    }

    const handleClose = () => {
        setMotivation(new MotivationModel());
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={isOpen}  >
            <DialogTitle>Modifier une motivation</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={motivation?.motivation === undefined || motivation?.motivation.length === 0}
                                helperText='(obligatoire)'
                                value={motivation?.motivation}
                                onChange={handleMotivationname}
                                label="Contenu"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleEditMotivation} variant="contained" disableElevation>
                    Modifier
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MotivationDialog;