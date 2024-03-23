import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import Button from '@mui/material/Button';
import VisitModel from '../../../domain/models/visit.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';

interface VisitTableProps {
    data: VisitModel[];
    isLoading: boolean;
    isDoctor?: boolean;
    id?: string;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
    displayReport: (visit: VisitModel) => {};
    displayCommand?: (visit: VisitModel) => {};
}

const VisitTable: React.FC<VisitTableProps> = ({ data, id, isLoading, displayReport, displayCommand, isDoctor, total, size, page, pageChange }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(size);

    const [pageIndex, setPageIndex] = React.useState(page - 1);

    if (pageIndex !== (page - 1)) {
        setPageIndex(page - 1);
    }
    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc( 100% - 64px )',
                paddingBottom: '8px'
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
                                    date: formatDateToYYYYMMDD(row.visitDate!),
                                    delegate: row.user?.username,
                                    model: row,
                                };
                            })]}
                        columns={[
                            {
                                field: 'date',
                                headerName: 'Visites',
                                renderCell(params) {
                                    return (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around'
                                        }}>
                                            <div style={{
                                                textAlign: 'start'
                                            }}>
                                                {params.row.date}
                                                <br></br>
                                                {params.row.delegate}
                                            </div>
                                            <Button onClick={() => {
                                                displayReport(params.row.model);
                                            }} variant="contained">R</Button>
                                            {
                                                isDoctor ? null : (<Button disabled={!params.row.model.commandId} onClick={() => {
                                                    displayCommand!(params.row.model);
                                                }} variant="outlined">BC</Button>)
                                            }

                                        </div>
                                    );
                                }
                            }
                        ]}
                        pagination={{
                            size: rowsPerPage,
                            page: pageIndex,
                        }}
                        pageSizeOptions={[ 5, 10, 25, 50, 100]}
                        onPaginationChange={(model) => {
                            setPageIndex(model.page);
                            pageChange(model.page + 1, model.size);
                            setRowsPerPage(model.size);
                        }}
                        total={total}
                    />)}
        </div>
    );
};

export default VisitTable;
