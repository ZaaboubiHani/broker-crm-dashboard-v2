import React from 'react';
import './command-cam-table.style.css';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';
import { DotSpinner } from '@uiball/loaders';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import CommandModel from '../../../domain/models/command.model';
import ClientModel from '../../../domain/models/client.model';

interface CommandCamTableProps {
    data: CommandModel[];
    suppliers: ClientModel[];
    displayCommand: (command: CommandModel) => {};
    onHonor: (command: CommandModel) => {};
    id?: string;
    isLoading: boolean;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
}

const CommandCamTable: React.FC<CommandCamTableProps> = ({ data, id, suppliers, isLoading, displayCommand, total, size, page, pageChange, onHonor, }) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(size);
    const [pageIndex, setPageIndex] = React.useState(page - 1);
    const [showDialog, setShowDialog] = React.useState(false);
    const [commandIndex, setCommandIndex] = React.useState(- 1);
    const [supplierIds, setSupplierIds] = React.useState<(string | undefined)[]>([]);

    if (pageIndex !== (page - 1)) {
        setPageIndex(page - 1);
    }

    const [switchesState, setSwitchesState] = React.useState(data.map(command => command.isHonored));

    const [switchesEnablers, setSwitchesEnablers] = React.useState(data.map(command => command?.finalSupplier === undefined));

    React.useEffect(() => {
        setSupplierIds(data.map(command => command.finalSupplier?._id));
        setSwitchesState(data.map(command => command.isHonored));
        setSwitchesEnablers(data.map(command => (command?.finalSupplier === undefined && command.visit?.client?.speciality?.name === 'Grossiste Parapharm')));
    }, [data]);

    const handleSwitchChange = (index: number) => {
        const newSwitchesState = [...switchesState];
        newSwitchesState[index] = !newSwitchesState[index];
        data[index].isHonored = !data[index].isHonored;
        setSwitchesState(newSwitchesState);
        onHonor(data[index]);
    };

    const handleSupplierChange = (index: number) => {
        const newSwitchesEnablers = [...switchesEnablers];
        newSwitchesEnablers[index] = data[index].finalSupplier === undefined;
        if (newSwitchesEnablers[index] && data[index].isHonored) {
            const newSwitchesState = [...switchesState];
            newSwitchesState[index] = false;
            data[index].isHonored = false;
            setSwitchesState(newSwitchesState);
            onHonor(data[index]);
        }
        setSwitchesEnablers(newSwitchesEnablers);

    };

    const handleClose = () => {
        setShowDialog(false);
    };

    return (
        <div id={id} style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            borderRadius: '8px',
        }}>
            {isLoading ? (<div style={{
                width: '100%',
                flexGrow: '1',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DotSpinner
                    size={40}
                    speed={0.9}
                    color="black"
                />
            </div>) :
                (<ScalableTable
                    rows={
                        [...data.map((row, index) => {
                            return {
                                id: row._id,
                                index: index,
                                date: row.visit?.visitDate || new Date(),
                                client: row.visit?.client?.fullName,
                                speciality: row.visit?.client?.speciality,
                                amount: row.totalRemised?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }),
                                location: `${row.visit?.client?.commune}, ${row.visit?.client?.wilaya}`,
                                command: row,
                                suppliers: row.suppliers,
                                finalSupplier: row.finalSupplier,
                            };
                        })]}
                    columns={[
                        {
                            field: 'date',
                            headerName: 'Date',
                            valueFormatter(params) {
                                return formatDateToYYYYMMDD(params.value);
                            },
                        },
                        {
                            field: 'client',
                            headerName: 'Client',
                        },
                        {
                            field: 'location',
                            headerName: 'Localisation',
                        },
                        {
                            field: 'amount',
                            headerName: 'Montant',
                        },
                        {
                            field: 'supplier',
                            headerName: 'Fournisseur',
                            renderCell(params) {
                                return params.row.speciality === 'GROSSISTE para' ? (<FormControl fullWidth>
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
                                                params.row.finalSupplier = params.row.suppliers?.find((s: any) => s.id === event.target.value);
                                                data[params.row.index].finalSupplier = data[params.row.index].suppliers?.find((s: any) => s.id === event.target.value);
                                                handleSupplierChange(params.row.index);
                                                setSupplierIds(data.map(command => command.finalSupplier?._id));
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {params.row.suppliers?.map((supplier: any) => (
                                            <MenuItem key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="other">
                                            <em>autre</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>) : undefined;
                            },
                        },
                        {
                            field: 'honor',
                            headerName: 'Honorer',
                            renderCell(params) {
                                return (<Switch disabled={switchesEnablers[params.row.index]} checked={switchesState[params.row.index]}
                                    onChange={() => handleSwitchChange(params.row.index)}
                                />);
                            },
                        },
                        {
                            field: 'details',
                            headerName: 'Details',
                            renderCell(params) {
                                return (<Button onClick={() => {
                                    displayCommand(params.row.command);
                                }} variant="text">Voir</Button>);
                            },
                        },
                    ]}
                    total={total}
                    onPaginationChange={(model) => {
                        setPageIndex(model.page);
                        pageChange(model.page + 1, model.size);
                        setRowsPerPage(model.size);

                    }}

                    pagination={
                        {
                            size: rowsPerPage,
                            page: pageIndex,
                        }
                    }

                    pageSizeOptions={[5, 10, 25, 50, 100]}
                />)}
            <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={showDialog} >
                <DialogTitle>Sélectionner le fournisseur</DialogTitle>
                <List>
                    {
                        suppliers.filter((supplier) => !data.some((c) => c.suppliers?.some(s => s._id === supplier._id))).map((supplier) => (
                            <ListItem
                                key={supplier._id}
                                disablePadding
                                onClick={() => {
                                    const updatedCommands = [...data];
                                    updatedCommands[commandIndex].suppliers = [
                                        ...updatedCommands[commandIndex].suppliers ?? [],
                                        supplier,
                                    ];
                                    updatedCommands[commandIndex].finalSupplier = supplier;
                                    data = updatedCommands;
                                    setShowDialog(false);
                                    setSupplierIds(data.map(command => command.finalSupplier?._id));
                                    setSwitchesEnablers(data.map(command => (command?.finalSupplier === undefined && command.visit?.client?.speciality?.name === 'Grossiste Parapharm')));
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText primary={supplier.fullName} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Dialog>
        </div>
    );
};

export default CommandCamTable;
