import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ServiceModel from '../../../domain/models/service.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import EditIcon from '@mui/icons-material/Edit';

interface ServiceTableProps {
    data: ServiceModel[];
    isLoading: boolean;
    onRemove: (service: ServiceModel) => void;
    onEdit: (service: ServiceModel) => void;
    id?: string;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ data, id, isLoading, onRemove, onEdit }) => {

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
                                    name: row.name,
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'name',
                                headerName: 'Nom',
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
                                        onRemove(params.row.model);
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

export default ServiceTable;
