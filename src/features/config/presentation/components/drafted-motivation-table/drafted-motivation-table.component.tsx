import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import MotivationModel from '../../../domain/models/motivation.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import EditIcon from '@mui/icons-material/Edit';

interface DraftedMotivationTableProps {
    data: MotivationModel[];
    isLoading: boolean;
    onRestore: (motivation: MotivationModel) => void;
    id?: string;
}

const DraftedMotivationTable: React.FC<DraftedMotivationTableProps> = ({ data, id, isLoading, onRestore }) => {

    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 140px)',

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
                                headerName: 'Restaurer',
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

export default DraftedMotivationTable;
