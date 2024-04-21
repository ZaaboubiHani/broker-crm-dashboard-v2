import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

interface CommentPanelProps {
    disabled: boolean;
    onAdd: (content: string) => void;
}

const CommentPanel: React.FC<CommentPanelProps> = ({  onAdd, disabled }) => {

    const [commentContent, setCommentContent] = React.useState('');

    return (
        <div style={{ display: 'flex', padding: '8px 8px 0px 16px', }}>
            <TextField
                disabled={disabled}
                value={commentContent}
                onChange={(event)=>{
                    setCommentContent(event.target.value);
                }}
                size="small"
                label="Contenu du commentaire"
                variant="outlined"
                sx={{
                    marginRight: '8px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    height: '40px',
                    flex: '1',
                }} />
            <IconButton disabled={disabled} onClick={() =>{
                onAdd(commentContent);
                setCommentContent('');
            }} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', height: '40px', }}>
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default CommentPanel;
