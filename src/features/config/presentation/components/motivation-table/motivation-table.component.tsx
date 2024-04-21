import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MotivationModel from '../../../domain/models/motivation.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import EditIcon from '@mui/icons-material/Edit';

interface MotivationTableProps {
    data: MotivationModel[];
    isLoading: boolean;
    onRemove: (id: string) => void;
    onEdit: (motivation: MotivationModel) => void;
    id?: string;
}

const MotivationTable: React.FC<MotivationTableProps> = ({ data, id, isLoading, onRemove, onEdit }) => {

    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 190px)',

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
                                    motivation: row.motivation,
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'motivation',
                                headerName: 'Contenu du motivation',
                            },
                            {
                                field: 'edit',
                                headerName: 'Modifier',
                                renderCell(params) {
                                    return (<IconButton onClick={() => {
                                        onEdit(params.row.model);
                                    }} >
                                        <EditIcon />
                                    </IconButton>);
                                },
                            },
                            {
                                field: 'delete',
                                headerName: 'Supprimer',
                                renderCell(params) {
                                    return (<IconButton onClick={() => {
                                        onRemove(params.row.id);
                                    }} >
                                        <DeleteIcon />
                                    </IconButton>);
                                },
                            },

                        ]}
                        hidePaginationFooter={true}

                    />)}
        </div>
    );
};

export default MotivationTable;
