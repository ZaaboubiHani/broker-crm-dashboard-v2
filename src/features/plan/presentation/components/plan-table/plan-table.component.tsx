import React from 'react';
import './plan-table.style.css';
import { DotSpinner } from '@uiball/loaders';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';
import PlanModel from '../../../domain/models/plan.model';

interface PlanTableProps {
    data: PlanModel[];
    isLoading: boolean;
    onDisplayDetails: (date: Date) => {};
    onDisplayMap: (date: Date) => {};
    id?: string;
}

const PlanTable: React.FC<PlanTableProps> = ({ data, id, isLoading, onDisplayDetails, onDisplayMap }) => {



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
                            [...data.map((row, index) => {
                                return {
                                    id: index,
                                    date: row.day || new Date(),
                                    wilayas: row.locations?.map(twc => `(${twc})`),
                                    tasks: row.total,
                                    visits: row.done,
                                };
                            })]}
                        columns={[{
                            field: 'date',
                            headerName: 'Date',
                            valueFormatter(params) {
                                return formatDateToYYYYMMDD(params.value);
                            },
                        },
                        {
                            field: 'sldkifu',
                            headerName: 'Wilayas',
                            renderCell(params) {
                                return (
                                    <div>

                                        {params.row.wilayas.map((w: any) => {
                                            return (
                                                <div>
                                                    {w}
                                                </div>
                                            )
                                        })}

                                    </div>
                                );
                            },
                        },
                        {
                            field: 'tasks',
                            headerName: 'Visites programmes',
                        },
                        {
                            field: 'visits',
                            headerName: 'visites realiser',
                        },
                        {
                            field: 'details',
                            headerName: 'Details',
                            renderCell(params) {
                                return (<Button
                                    disabled={params.row.tasks === 0 && params.row.visits === 0}
                                    onClick={() => {
                                        onDisplayDetails(params.row.date);
                                    }} variant="text">Voir</Button>);
                            },

                        },
                        {
                            field: 'map',
                            headerName: 'Carte de parcours',
                            renderCell(params) {
                                return (<Button
                                // disabled={true}
                                    onClick={() => {
                                        onDisplayMap(params.row.date,);
                                    }} variant="text"><MapIcon /></Button>);
                            },
                        }]}
                        hidePaginationFooter={true}
                    />)}
        </div>



    );
};

export default PlanTable;
