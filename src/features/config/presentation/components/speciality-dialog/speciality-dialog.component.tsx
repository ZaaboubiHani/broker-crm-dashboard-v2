import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import SpecialityModel from "../../../domain/models/speciality.model";
import { SpecialityType } from "../../../../../core/entities/speciality.entity";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

interface SpecialityDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onAdd: (speciality: SpecialityModel) => void,
    onEdit: (speciality: SpecialityModel) => void,
    initSpeciality?: SpecialityModel,
    initType?: SpecialityType,
}


const SpecialityDialog: React.FC<SpecialityDialogProps> = ({ onClose, isOpen, onAdd, onEdit, initSpeciality, initType}) => {

    const [speciality, setSpeciality] = useState<SpecialityModel>(new SpecialityModel({ type: SpecialityType.doctor }));

    useEffect(() => {
        if (initSpeciality) {
            setSpeciality(initSpeciality.copyWith({}));
        }
    }, [initSpeciality,isOpen]);


    if (!isOpen) {
        return null;
    }


    const handleAddSpeciality = (): void => {
        if (speciality !== undefined) {
            onAdd(speciality);
            setSpeciality(new SpecialityModel({ type: SpecialityType.doctor }));
        }
    }

    const handleEditSpeciality = (): void => {
        if (speciality != undefined) {
            onEdit(speciality);
            setSpeciality(new SpecialityModel({ type: SpecialityType.doctor }));
        }
    }



    const handleTypeChange = (event: SelectChangeEvent<any>) => {
        let type = event.target.value as SpecialityType;
        setSpeciality(speciality.copyWith({ type: type }));
    };

    const handleSpecialityname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSpeciality(speciality.copyWith({ name: event.target.value }));
       
    }


    const handleClose = () => {
        setSpeciality(new SpecialityModel({ type: SpecialityType.doctor}));
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={isOpen}  >
            <DialogTitle>{ initSpeciality ? 'Modifier ' : 'Ajouter'} une spécialité</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={speciality?.name === undefined || speciality?.name.length === 0}
                                helperText='(obligatoire)'
                                value={speciality?.name}
                                onChange={handleSpecialityname}
                                label="Nom de spécialité"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{
                                backgroundColor: 'white',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                height: '55px'
                            }}>
                                <InputLabel>Domaine de spécialité</InputLabel>
                                <Select
                                    sx={{
                                        height: '55px'
                                    }}
                                    defaultValue={initSpeciality ? initSpeciality.type : initType ? initType : SpecialityType.doctor}
                                    onChange={handleTypeChange}>
                                    <MenuItem key={1} value={SpecialityType.doctor}>
                                        <ListItemText primary='Médical' />
                                    </MenuItem>
                                    <MenuItem key={2} value={SpecialityType.wholesaler}>
                                        <ListItemText primary='Grossiste' />
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {
                    initSpeciality ? (<Button onClick={handleEditSpeciality} variant="contained" disableElevation>
                        Modifier
                    </Button>) :
                        (<Button onClick={handleAddSpeciality} variant="contained" disableElevation>
                            Ajouter
                        </Button>)
                }

            </DialogActions>
        </Dialog>
    );
}

export default SpecialityDialog;