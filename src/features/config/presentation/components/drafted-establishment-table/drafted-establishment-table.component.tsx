import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import EstablishmentModel from '../../../domain/models/establishment.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import RestoreIcon from '@mui/icons-material/Restore';

interface DraftedEstablishmentTableProps {
    data: EstablishmentModel[];
    isLoading: boolean;
    onRestore: (establishment: EstablishmentModel) => void;
    id?: string;
}

const DraftedEstablishmentTable: React.FC<DraftedEstablishmentTableProps> = ({ data, id, isLoading, onRestore }) => {
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
                                    wilaya: row.wilaya,
                                    commune: row.commune,
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'name',
                                headerName: 'Nom',
                            },
                            {
                                field: 'wilaya',
                                headerName: 'Wilaya',
                            },
                            {
                                field: 'commune',
                                headerName: 'Commune',
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

export default DraftedEstablishmentTable;
