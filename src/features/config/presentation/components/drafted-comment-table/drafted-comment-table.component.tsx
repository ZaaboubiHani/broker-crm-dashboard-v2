import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import CommentModel from '../../../domain/models/comment.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import RestoreIcon from '@mui/icons-material/Restore';


interface DraftedCommentTableProps {
    data: CommentModel[];
    isLoading: boolean;
    onRestore: (comment: CommentModel) => void;
    id?: string;
}

const DraftedCommentTable: React.FC<DraftedCommentTableProps> = ({ data, id, isLoading, onRestore,  }) => {


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

export default DraftedCommentTable;
