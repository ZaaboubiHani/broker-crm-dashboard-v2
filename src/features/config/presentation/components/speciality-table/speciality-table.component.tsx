import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SpecialityModel from '../../../domain/models/speciality.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';

interface SpecialityTableProps {
    data: SpecialityModel[];
    isLoading: boolean;
    onRemove: (id: string) => void;
    id?: string;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
}

const SpecialityTable: React.FC<SpecialityTableProps> = ({ data, id, isLoading, onRemove, total, size, page, pageChange, }) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(size);

    const [pageIndex, setPageIndex] = React.useState(page - 1);

    if (pageIndex !== (page - 1)) {
        setPageIndex(page - 1);
    }

    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: '400px',
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
                                headerName: 'Nom de spécialité',
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

export default SpecialityTable;
