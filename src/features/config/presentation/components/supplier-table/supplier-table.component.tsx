import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClientModel from '../../../domain/models/client.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import EditIcon from '@mui/icons-material/Edit';

interface SupplierTableProps {
    data: ClientModel[];
    isLoading: boolean;
    onEdit: (supplier: ClientModel) => void;
    id?: string;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({ data, id, isLoading, onEdit, total, size, page, pageChange, }) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(size);

    const [pageIndex, setPageIndex] = React.useState(page - 1);

    if (pageIndex !== (page - 1)) {
        setPageIndex(page - 1);
    }

    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 180px)',
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
                                    name: row.fullName,
                                    location: row.wilaya?.name + ', ' + row.commune,
                                    type: row.speciality?.name,
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'name',
                                headerName: 'Nom de fournisseur',
                            },
                            {
                                field: 'location',
                                headerName: 'Wilaya et commune',
                            },
                            {
                                field: 'type',
                                headerName: 'Spécialité',
                            },
                            {
                                field: 'edit',
                                headerName: 'Modifier',
                                renderCell(params) {
                                    return (<IconButton 
                                        disabled={params.row.type === "Supergros"}
                                        onClick={() => {
                                        onEdit(params.row.model);
                                    }} >
                                        <EditIcon />
                                    </IconButton>);
                                },
                            },
                        ]}

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
        </div>
    );
};

export default SupplierTable;
