import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import EstablishmentModel from "../../../domain/models/establishment.model";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import WilayaModel from "../../../domain/models/wilaya.model";


interface EstablishmentDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onAdd: (establishment: EstablishmentModel) => void,
    onEdit: (establishment: EstablishmentModel) => void,
    initEstablishment?: EstablishmentModel,
    wilayas: WilayaModel[],
}


const EstablishmentDialog: React.FC<EstablishmentDialogProps> = ({ onClose, isOpen, onAdd, onEdit, initEstablishment, wilayas }) => {

    const [establishment, setEstablishment] = useState<EstablishmentModel>(new EstablishmentModel({}));

    useEffect(() => {
        if (initEstablishment) {
            setEstablishment(initEstablishment.copyWith({}));
        }
    }, [initEstablishment, isOpen]);


    if (!isOpen) {
        return null;
    }


    const handleAddEstablishment = (): void => {
        if (establishment !== undefined) {
            onAdd(establishment);
            setEstablishment(new EstablishmentModel({}));
        }
    }

    const handleEditEstablishment = (): void => {
        if (establishment != undefined) {
            onEdit(establishment);
            setEstablishment(new EstablishmentModel({}));
        }
    }

    const handleClose = () => {
        setEstablishment(new EstablishmentModel({}));
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='md' onClose={handleClose} open={isOpen}  >
            <DialogTitle>{initEstablishment ? 'Modifier ' : 'Ajouter'} un produit</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={establishment?.name === undefined || establishment?.name.length === 0}
                                helperText='(obligatoire)'
                                value={establishment?.name}
                                onChange={(event) => {
                                    setEstablishment(establishment.copyWith({ name: event.target.value }));
                                }}
                                label="Nom de produit"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Wilaya</InputLabel>
                                <Select
                                    defaultValue={initEstablishment?.wilaya}
                                    onChange={(event) => {
                                        if (initEstablishment) {
                                            initEstablishment.wilaya = event.target.value.toString();
                                            initEstablishment.commune = undefined;
                                        }
                                        setEstablishment(establishment.copyWith({ wilaya: event.target.value.toString(), commune: undefined }));
                                    }}
                                    >
                                    {wilayas.map((wilaya) => (
                                        <MenuItem key={wilaya._id} value={wilaya.name}>

                                            <ListItemText primary={wilaya.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Commune</InputLabel>
                                <Select
                                    key={establishment.wilaya}
                                    defaultValue={initEstablishment?.commune}
                                    disabled={(!(initEstablishment?.wilaya !== undefined) && !(establishment?.wilaya !== undefined))}
                                    onChange={(event) => {
                                        if (initEstablishment) {
                                            initEstablishment.commune = event.target.value.toString();
                                        }
                                        setEstablishment(establishment.copyWith({commune : event.target.value.toString() }));
                                    }}
                                >
                                    {wilayas.filter((w) => w.name === establishment?.wilaya).length > 0 ? wilayas.filter((w) => w.name === establishment?.wilaya)[0].communes!.map((commune) => (
                                        <MenuItem key={commune} value={commune}>
                                            <ListItemText primary={commune} />
                                        </MenuItem>
                                    )) : undefined}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {
                    initEstablishment ? (<Button onClick={handleEditEstablishment} variant="contained" disableElevation>
                        Modifier
                    </Button>) :
                        (<Button onClick={handleAddEstablishment} variant="contained" disableElevation>
                            Ajouter
                        </Button>)
                }

            </DialogActions>
        </Dialog>
    );
}

export default EstablishmentDialog;