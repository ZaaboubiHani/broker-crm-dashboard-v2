import React, { useState } from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentModel from '../../models/comment.model';
import ScalableTable from '../scalable-table/scalable-table.component';

interface CommentTableProps {
    data: CommentModel[];
    isLoading: boolean;
    onRemove: (id: number) => void;
    id?: string;
    page: number;
    size: number;
    total: number;
    pageChange: (page: number, size: number) => void;
}

const CommentTable: React.FC<CommentTableProps> = ({ data, id, isLoading, onRemove, total, size, page, pageChange, }) => {

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
                                    id: row.id,
                                    comment: row.comment,
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'comment',
                                headerName: 'Contenu du commentaire',
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

export default CommentTable;
