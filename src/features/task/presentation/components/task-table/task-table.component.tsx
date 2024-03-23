import React from 'react';
import { formatDateToYYYYMMDD, formatTime } from '../../../../../core/functions/date-format';
import { DotSpinner } from '@uiball/loaders';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import TaskModel from '../../../domain/models/task.model';
import { TaskStatus } from '../../../../../core/entities/task.entity';
import Button from '@mui/material/Button';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

interface TaskTableProps {
    data: TaskModel[];
    id?: string;
    isLoading: boolean;
    page: number;
    size: number;
    total: number;
    sorting: { field: string, order: boolean };
    pageChange: (page: number, size: number) => void;
    sortChange: (field: string, order: boolean) => void;
    cancel: (task: TaskModel) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ data, id, isLoading, total, size, page, pageChange, sortChange, sorting, cancel }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(size);
    const [sortModel, setSortModel] = React.useState<{ field: string, order: boolean }>(sorting);
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
            height: '100%'
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
                                    action: row.action,
                                    task: row.task,
                                    region: row.region,
                                    targetRemark: row.targetRemark,
                                    assignerRemark: row.assignerRemark,
                                    status: row.status,
                                    model: row,
                                    startDate: formatDateToYYYYMMDD(row!.startDate!) +" "+ formatTime(row!.startDate!),
                                    endDate: formatDateToYYYYMMDD(row!.endDate!) +" "+ formatTime(row!.endDate!),
                                };
                            })]}
                        columns={[
                            {
                                field: 'action',
                                headerName: 'Action',
                                sortable: true,
                            },
                            {
                                field: 'task',
                                headerName: 'Tâche',
                                sortable: true,
                            },
                            {
                                field: 'region',
                                headerName: 'Région',
                                sortable: true,
                            },
                            {
                                field: 'targetRemark',
                                headerName: 'Remarque du délégué',
                                sortable: true,
                            },
                            {
                                field: 'assignerRemark',
                                headerName: 'Remarque',
                                sortable: true,
                            },
                            {
                                field: 'status',
                                headerName: 'Statut',
                                renderCell(params) {
                                    return (<div
                                        style={{
                                            color: params.row.status === TaskStatus.cancelled ? 'red' : params.row.status === TaskStatus.ignored ? 'rgb(255,69,0)' : params.row.status === TaskStatus.done ? 'green' : params.row.status === TaskStatus.pending ? 'blue' : 'black',
                                            fontWeight: '700'
                                        }}
                                    >{params.row.status === TaskStatus.cancelled ? 'Annulée' : params.row.status === TaskStatus.ignored ? 'Ignorée' : params.row.status === TaskStatus.done ? 'Complétée' : params.row.status === TaskStatus.pending ? 'En attente' : 'Inconnue'}</div>);
                                },
                                sortable: true,
                            },
                            {
                                field: 'startDate',
                                headerName: 'Date de début',
                                sortable: true,
                            },
                            {
                                field: 'endDate',
                                headerName: 'Date de fin',
                                sortable: true,
                            },
                            {
                                field: 'cancel',
                                headerName: 'Annuler',
                                renderCell(params) {
                                    return (<Button
                                        sx={{ color: 'red' }}
                                        disabled={params.row.status === TaskStatus.cancelled}
                                        onClick={() => {
                                            cancel(params.row.model);
                                        }} variant="text"> <DoNotDisturbOnIcon /></Button>);
                                },
                            },
                        ]}
                        total={total}
                        onPaginationChange={(model) => {
                            setPageIndex(model.page);
                            pageChange(model.page + 1, model.size);
                            setRowsPerPage(model.size);
                        }}

                        onSortChange={(model) => {
                            sortChange(model.field, model.order);
                            setSortModel(model);
                        }}
                        sortModel={sortModel}
                        pagination={{
                            size: rowsPerPage,
                            page: pageIndex,
                        }}

                        pageSizeOptions={[5, 10, 25, 50, 100]}

                    />)}
        </div>
    );
};

export default TaskTable;
