import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

interface MotivationPanelProps {
    onAdd: (content: string) => void;
}

const MotivationPanel: React.FC<MotivationPanelProps> = ({  onAdd,  }) => {

    const [motivationContent, setMotivationContent] = React.useState('');

    return (
        <div style={{ display: 'flex', padding: '8px 8px 0px 16px', }}>
            <TextField
                value={motivationContent}
                onChange={(event)=>{
                    setMotivationContent(event.target.value);
                }}
                size="small"
                label="Contenu du motivationaire"
                variant="outlined"
                sx={{
                    marginRight: '8px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    height: '40px',
                    flex: '1',
                }} />
            <IconButton onClick={() =>{
                onAdd(motivationContent);
                setMotivationContent('');
            }} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', height: '40px', }}>
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default MotivationPanel;
