import React from 'react';
import './delegate-table.style.css';
import { DotSpinner } from '@uiball/loaders';
import Button from '@mui/material/Button';
import VisitModel from '../../../domain/models/visit.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';

interface DelegateTableProps {
    data: VisitModel[];
    onDisplayReport: (visit: VisitModel) => void;
    onDisplayCommand: (visit: VisitModel) => void;
    isLoading: boolean;
    id?: string;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
}

const DelegateTable: React.FC<DelegateTableProps> = ({ data, id, onDisplayCommand, onDisplayReport, isLoading, total, size, page, pageChange, }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(size);


    const [pageIndex, setPageIndex] = React.useState(page - 1);



    if (pageIndex !== (page - 1)) {
        setPageIndex(page - 1);
    }


    return (
        <div id={id} style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            borderRadius: '8px',
        }}>

            {
                isLoading ? (<div style={{
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
                            [...data.map((row) => {
                                return {
                                    id: row._id,
                                    date: formatDateToYYYYMMDD(row.visitDate || new Date()),
                                    client: row.client?.fullName,
                                    speciality: row.client?.speciality?.name,
                                    location: `${row.client?.commune}, ${row.client?.wilaya?.name}`,
                                    hasCommand: row.commandId !== undefined,
                                    visitLocation: row.report?.location,
                                    visit: row,
                                };
                            })]}
                        columns={[
                            { field: 'date', headerName: 'Date',  },
                            { field: 'client', headerName: 'Client',},
                            { field: 'speciality', headerName: 'Spécialité', },
                            { field: 'location', headerName: 'Localisation',  },
                            {
                                field: 'report', headerName: 'Rapport', 

                                renderCell(params) {
                                    return (<Button onClick={() => {
                                        onDisplayReport(params.row.visit);
                                    }} variant="text">Voir</Button>);
                                },

                            },
                            {
                                field: 'command',
                                headerName: 'BC',
                                renderCell(params) {
                                    return (<Button disabled={!params.row.hasCommand} onClick={() => {
                                        onDisplayCommand(params.row.visit);
                                    }} variant="text">Voir</Button>);
                                },

                            }]}
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
                    />)}
           
        </div >
    );
};

export default DelegateTable;
