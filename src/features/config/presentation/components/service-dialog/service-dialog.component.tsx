import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import ServiceModel from "../../../domain/models/service.model";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import WilayaModel from "../../../domain/models/wilaya.model";
import Checkbox from "@mui/material/Checkbox";
import EstablishmentModel from "../../../domain/models/establishment.model";

interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: ServiceModel) => void;
  onEdit: (service: ServiceModel) => void;
  initService?: ServiceModel;
  wilayas: WilayaModel[];
  establishments: EstablishmentModel[];
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  onClose,
  isOpen,
  onAdd,
  onEdit,
  initService,
  establishments,
}) => {
  const [service, setService] = useState<ServiceModel>(
    new ServiceModel({})
  );
  const [selectedEstablishments, setSelectedEstablishments] = React.useState<string[]>([]);

  useEffect(() => {
    if (initService) {
      setService(initService.copyWith({}));
      setSelectedEstablishments(initService.establishments?.map((s)=>s._id!) ?? [])
    }
  }, [initService, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAddService = (): void => {
    if (service !== undefined) {
      onAdd(service);
      setService(new ServiceModel({}));
    }
  };

  const handleEditService = (): void => {
    if (service != undefined) {
      onEdit(service);
      setService(new ServiceModel({}));
    }
  };

  const handleServiceChange = (
    event: SelectChangeEvent<typeof selectedEstablishments>
  ) => {
    const {
      target: { value },
    } = event;

    setSelectedEstablishments(typeof value === "string" ? [] : value);

    var ids = typeof value === "string" ? [] : value;

    service.establishments = [];

    for (let i = 0; i < ids.length; i++) {
      var establishment = establishments.find((s) => s._id === ids[i]);
      if (establishment) {
        service.establishments.push(establishment);
      }
    }
  };

  const handleClose = () => {
    setService(new ServiceModel({}));
    setSelectedEstablishments([]);
    onClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} open={isOpen}>
      <DialogTitle>
        {initService ? "Modifier " : "Ajouter"} un service
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
                  service?.name === undefined ||
                  service?.name.length === 0
                }
                helperText="(obligatoire)"
                value={service?.name}
                onChange={(event) => {
                  setService(
                    service.copyWith({ name: event.target.value })
                  );
                }}
                label="Nom"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl
                sx={{
                  flex: "1",
                  width: "100%",
                }}
              >
                <InputLabel>établissements</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  multiple
                  value={selectedEstablishments}
                  onChange={handleServiceChange}
                  renderValue={(selected) => {
                    const selectedNames = selected.map((id) => {
                      const establishment = establishments.find(
                        (establishment) => establishment._id === id
                      );
                      return establishment ? establishment.name : "";
                    });
                    return selectedNames.join(", ");
                  }}
                >
                  {establishments.map((establishment) => (
                    <MenuItem key={establishment._id} value={establishment._id}>
                      <Checkbox
                        checked={
                          selectedEstablishments.indexOf(establishment._id ?? "") > -1
                        }
                      />
                      <ListItemText primary={establishment.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        {initService ? (
          <Button
            onClick={handleEditService}
            variant="contained"
            disableElevation
          >
            Modifier
          </Button>
        ) : (
          <Button
            onClick={handleAddService}
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

export default ServiceDialog;
