import React from "react";
import "./command-delegate-table.style.css";
import { formatDateToYYYYMMDD } from "../../../../../core/functions/date-format";
import { DotSpinner } from "@uiball/loaders";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ScalableTable from "../../../../../core/components/scalable-table/scalable-table.component";
import CommandEntity, {
  CommandStatus,
} from "../../../../../core/entities/command.entity";
import ClientEntity from "../../../../../core/entities/client.entity";

interface CommandDelegateTableProps {
  data: CommandEntity[];
  suppliers: ClientEntity[];
  displayCommand: (command: CommandEntity) => {};
  onHonor: (command: CommandEntity) => {};
  id?: string;
  isLoading?: boolean;
  page: number;
  size: number;
  total: number;
  pageChange: (page: number, size: number) => void;
}

const CommandDelegateTable: React.FC<CommandDelegateTableProps> = ({
  suppliers,
  data,
  id,
  isLoading,
  displayCommand,
  onHonor,
  total,
  size,
  page,
  pageChange,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(size);
  const [pageIndex, setPageIndex] = React.useState(page - 1);
  const [showDialog, setShowDialog] = React.useState(false);
  const [commandIndex, setCommandIndex] = React.useState(-1);
  const [supplierIds, setSupplierIds] = React.useState<(string | undefined)[]>(
    []
  );
  const [statusIds, setStatusIds] = React.useState<
    (CommandStatus | undefined)[]
  >([]);

  if (pageIndex !== page - 1) {
    setPageIndex(page - 1);
  }

  const [switchesEnablers, setSwitchesEnablers] = React.useState(
    data.map(
      (command) =>
        command?.finalSupplier === undefined || command?.finalSupplier === null
    )
  );

  React.useEffect(() => {
    setSupplierIds(data.map((command) => command.finalSupplier?._id));
    setStatusIds(data.map((command) => command.status));
    setSwitchesEnablers(
      data.map(
        (command) =>
          command?.finalSupplier === undefined ||
          command?.finalSupplier === null
      )
    );
  }, [data]);

  const handleSupplierChange = (index: number) => {
    const newSwitchesEnablers = [...switchesEnablers];
    newSwitchesEnablers[index] =
      data[index].finalSupplier === undefined ||
      data[index]?.finalSupplier === null;

    onHonor(data[index]);

    setSwitchesEnablers(newSwitchesEnablers);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        borderRadius: "8px",
      }}
    >
      {isLoading ? (
        <div
          style={{
            width: "100%",
            flexGrow: "1",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DotSpinner size={40} speed={0.9} color="black" />
        </div>
      ) : (
        <ScalableTable
          rows={[
            ...data.map((row, index) => {
              return {
                id: row._id,
                date: row.createdAt || new Date(),
                client: row.visit?.client?.fullName,
                amount: row.totalRemised?.toLocaleString("fr-DZ", {
                  style: "currency",
                  currency: "DZD",
                }),
                location: `${row.visit?.client?.commune}, ${row.visit?.client?.wilaya?.name}`,
                command: row,
                finalSupplier: row.finalSupplier,
                status: row.status,
                suppliers: row.suppliers,
                index: index,
              };
            }),
          ]}
          columns={[
            {
              field: "date",
              headerName: "Date",
              valueFormatter(params) {
                return formatDateToYYYYMMDD(params.value);
              },
            },
            {
              field: "client",
              headerName: "Client",
            },
            {
              field: "location",
              headerName: "Localisation",
            },
            {
              field: "amount",
              headerName: "Montant",
            },
            {
              field: "supplier",
              headerName: "Fournisseur",
              renderCell(params) {
                return (
                  <FormControl fullWidth>
                    <Select
                      value={supplierIds[params.row.index]}
                      key={supplierIds[params.row.index]}
                      onChange={(event) => {
                        if (event.target.value === "other") {
                          event.preventDefault();
                          event.target.value = "";
                          setCommandIndex(params.row.index);
                          setShowDialog(true);
                          setSupplierIds([...supplierIds]);
                        } else {
                          params.row.finalSupplier = params.row.suppliers?.find(
                            (s: ClientEntity) => s._id === event.target.value
                          );
                          data[params.row.index].finalSupplier = data[
                            params.row.index
                          ].suppliers?.find(
                            (s: ClientEntity) => s._id === event.target.value
                          );
                          handleSupplierChange(params.row.index);
                          setSupplierIds(
                            data.map((command) => command.finalSupplier?._id)
                          );
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {params.row.suppliers?.map((supplier: ClientEntity) => (
                        <MenuItem key={supplier._id} value={supplier._id}>
                          {supplier.fullName}
                        </MenuItem>
                      ))}
                      <MenuItem value="other">
                        <em>autre</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                );
              },
            },
            {
              field: "status",
              headerName: "Statut",
              renderCell(params) {
                return (
                  <FormControl fullWidth>
                    <Select
                      value={statusIds[params.row.index]}
                      key={statusIds[params.row.index]}
                      onChange={(event) => {
                        params.row.status = event.target.value;
                        data[params.row.index].status = event.target.value;
                        statusIds[params.row.index] = event.target.value;
                        var newStatusIds = [...statusIds];
                        setStatusIds(newStatusIds);
                        onHonor(data[params.row.index]);
                      }}
                    >
                      <MenuItem value={CommandStatus.honored}>
                        <em>Honoré</em>
                      </MenuItem>
                      <MenuItem value={CommandStatus.nonHonored}>
                        <em>Non honoré</em>
                      </MenuItem>
                      <MenuItem value={CommandStatus.canceled}>
                        <em>Annulé</em>
                      </MenuItem>
                      <MenuItem value={CommandStatus.onHold}>
                        <em>En attente</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                );
              },
            },
            {
              field: "details",
              headerName: "Details",
              renderCell(params) {
                return (
                  <Button
                    onClick={() => {
                      displayCommand(params.row.command);
                    }}
                    variant="text"
                  >
                    Voir
                  </Button>
                );
              },
            },
          ]}
          total={total}
          onPaginationChange={(model) => {
            setPageIndex(model.page);
            pageChange(model.page + 1, model.size);
            setRowsPerPage(model.size);
          }}
          pagination={{
            size: rowsPerPage,
            page: pageIndex,
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
      )}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        open={showDialog}
      >
        <DialogTitle>Sélectionner le fournisseur</DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <DialogTitle
            sx={{
              marginRight: "155px",
              fontSize: "16px",
              marginBottom: "0px",
              padding: "0px",
              height: "32px",
            }}
          >
            Nom
          </DialogTitle>
          <DialogTitle
            sx={{
              marginRight: "55px",
              fontSize: "16px",
              marginBottom: "0px",
              padding: "0px",
              height: "32px",
            }}
          >
            Spécialité
          </DialogTitle>
        </div>
        <List>
          {
            // suppliers.filter((supplier) => !data.some((c) => c.suppliers?.some(s => s._id === supplier._id))).map((supplier) => (
            suppliers.map((supplier) => (
              <ListItem
                key={supplier._id}
                disablePadding
                onClick={() => {
                  const updatedCommands = [...data];
                  updatedCommands[commandIndex].suppliers = [
                    ...(updatedCommands[commandIndex].suppliers ?? []),
                    supplier,
                  ];
                  updatedCommands[commandIndex].finalSupplier = supplier;
                  data = updatedCommands;
                  setShowDialog(false);
                  setSupplierIds(
                    data.map((command) => command.finalSupplier?._id!)
                  );
                  setSwitchesEnablers(
                    data.map(
                      (command) =>
                        command?.finalSupplier === undefined ||
                        command.finalSupplier === null
                    )
                  );
                }}
              >
                <ListItemButton>
                  <ListItemText primary={supplier.fullName} />
                  <ListItemText primary={supplier.speciality?.name} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Dialog>
    </div>
  );
};

export default CommandDelegateTable;
