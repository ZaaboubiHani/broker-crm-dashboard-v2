import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import ServiceModel from '../../../domain/models/service.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import RestoreIcon from '@mui/icons-material/Restore';

interface DraftedServiceTableProps {
    data: ServiceModel[];
    isLoading: boolean;
    onRestore: (service: ServiceModel) => void;
    id?: string;
}

const DraftedServiceTable: React.FC<DraftedServiceTableProps> = ({ data, id, isLoading, onRestore }) => {
    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 130px)',
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
                                field: 'delete',
                                headerName: 'Supprimer',
                                renderCell(params) {
                                    return (<IconButton onClick={() => {
                                        onRestore(params.row.model);
                                    }} >
                                        <RestoreIcon />
                                    </IconButton>);
                                },
                            },
                        ]}

                        hidePaginationFooter={true}

                    />)}
        </div>
    );
};

export default DraftedServiceTable;
