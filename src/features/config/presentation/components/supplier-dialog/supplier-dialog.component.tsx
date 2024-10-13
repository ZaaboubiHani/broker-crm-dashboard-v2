import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import WilayaModel from "../../../domain/models/wilaya.model";
import ClientModel from "../../../domain/models/client.model";
import SpecialityModel from "../../../domain/models/speciality.model";
import { ClientType } from "../../../../../core/entities/client.entity";

interface SupplierDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (supplier: ClientModel) => void;
  onEdit: (supplier: ClientModel) => void;
  initSupplier?: ClientModel;
  wilayas: WilayaModel[];
  wholesalerSpecialities: SpecialityModel[];
}

const SupplierDialog: React.FC<SupplierDialogProps> = ({
  onClose,
  isOpen,
  onAdd,
  onEdit,
  initSupplier,
  wilayas,
  wholesalerSpecialities,
}) => {
  const [supplier, setSupplier] = useState<ClientModel>(new ClientModel({}));

  useEffect(() => {
    if (initSupplier) {
      
      setSupplier(initSupplier.copyWith({}));
    }
  }, [initSupplier, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAddSupplier = (): void => {
    if (supplier) {
      supplier.type == ClientType.wholesaler;
      onAdd(supplier);
      setSupplier(new ClientModel({}));
    }
  };

  const handleEditSupplier = (): void => {
    if (supplier && onEdit) {
      onEdit(supplier);
      setSupplier(new ClientModel({}));
    }
  };

  const handleClose = () => {
    setSupplier(new ClientModel({}));
    onClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} open={isOpen}>
      <DialogTitle>
        {initSupplier ? "Modifier " : "Ajouter"} un fournisseur
      </DialogTitle>
      <DialogContent>
        <Box sx={{ flex: "1", marginTop: "4px" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                sx={{
                  width: "100%",
                }}
                error={
                  supplier?.fullName === undefined ||
                  supplier?.fullName.length === 0
                }
                helperText="(obligatoire)"
                value={supplier?.fullName}
                onChange={(event) => {
                  setSupplier(
                    supplier.copyWith({ fullName: event.target.value })
                  );
                }}
                label="Nom de fournisseur"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Wilaya</InputLabel>
                <Select
                  value={supplier?.wilaya?._id || ""}
                  onChange={(event) => {
                    const selectedWilaya = wilayas.find(
                      (wilaya) => wilaya._id === event.target.value
                    );

                    if (selectedWilaya) {
                      setSupplier(
                        supplier.copyWith({
                          wilaya: selectedWilaya,
                          commune: undefined,
                        })
                      );
                    }
                  }}
                >
                  {wilayas.map((wilaya) => (
                    <MenuItem key={wilaya._id} value={wilaya._id}>
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
                  key={supplier.wilaya?._id}
                  defaultValue={initSupplier?.commune}
                  disabled={
                    !(initSupplier?.wilaya !== undefined) &&
                    !(supplier?.wilaya !== undefined)
                  }
                  onChange={(event) => {
                    if (initSupplier) {
                      initSupplier.commune = event.target.value.toString();
                    }
                    setSupplier(
                      supplier.copyWith({
                        commune: event.target.value.toString(),
                      })
                    );
                  }}
                >
                  {wilayas.filter((w) => w._id === supplier?.wilaya?._id)
                    .length > 0
                    ? wilayas
                        .filter((w) => w._id === supplier?.wilaya?._id)[0]
                        .communes!.map((commune) => (
                          <MenuItem key={commune} value={commune}>
                            <ListItemText primary={commune} />
                          </MenuItem>
                        ))
                    : undefined}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Spécialité</InputLabel>
                <Select
                  value={supplier?.speciality?._id || ""}
                  onChange={(event) => {
                    const selectedSpeciality = wholesalerSpecialities.find(
                      (speciality) => speciality._id === event.target.value
                    );

                    if (selectedSpeciality) {
                      setSupplier(
                        supplier.copyWith({
                          speciality: selectedSpeciality,
                          commune: undefined,
                        })
                      );
                    }
                  }}
                >
                  {wholesalerSpecialities.map((speciality) => (
                    <MenuItem key={speciality._id} value={speciality._id}>
                      <ListItemText primary={speciality.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        {initSupplier ? (
          <Button
            onClick={handleEditSupplier}
            variant="contained"
            disableElevation
          >
            Modifier
          </Button>
        ) : (
          <Button
            disabled={
              !supplier.speciality ||
              !supplier.fullName ||
              supplier.fullName.length === 0
            }
            onClick={handleAddSupplier}
            variant="contained"
            disableElevation
          >
            Ajouter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDialog;
