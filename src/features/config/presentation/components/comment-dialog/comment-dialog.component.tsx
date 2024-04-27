import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import CommentModel from "../../../domain/models/comment.model";
import DialogActions from "@mui/material/DialogActions";

interface CommentDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onEdit: (Comment: CommentModel) => void,
    initComment: CommentModel,
}


const CommentDialog: React.FC<CommentDialogProps> = ({ onClose, isOpen, onEdit, initComment, }) => {

    const [comment, setComment] = useState<CommentModel>(new CommentModel());

    useEffect(() => {
        if (initComment) {
            setComment(initComment.copyWith({}));
        }
    }, [initComment, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleEditComment = (): void => {
        onEdit(comment);
    }

    const handleCommentname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setComment(comment.copyWith({ comment: event.target.value }));
    }

    const handleClose = () => {
        setComment(new CommentModel());
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={isOpen}  >
            <DialogTitle>Modifier un commentaire</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={comment?.comment === undefined || comment?.comment.length === 0}
                                helperText='(obligatoire)'
                                value={comment?.comment}
                                onChange={handleCommentname}
                                label="Contenu"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleEditComment} variant="contained" disableElevation>
                    Modifier
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CommentDialog;