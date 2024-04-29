import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { SpecialityType } from '../../../../../core/entities/speciality.entity';

interface SpecialityTypeDropdownProps {
    initType: SpecialityType;
    onSelect: (type: SpecialityType) => void;
}

const SpecialityTypeDropdown: React.FC<SpecialityTypeDropdownProps> = ({ initType, onSelect, }) => {
    return (
        <FormControl fullWidth sx={{
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '4px',
            marginBottom: '8px'

        }}>
            <InputLabel>Domaine de spécialité</InputLabel>
            <Select
                sx={{
                    height: '40px'
                }}
                defaultValue={initType}
                onChange={async (event) => {
                    onSelect(event.target.value as SpecialityType);
                }}>
                <MenuItem key={1} value={SpecialityType.doctor}>
                    <ListItemText primary='Médical' />
                </MenuItem>
                <MenuItem key={2} value={SpecialityType.wholesaler}>
                    <ListItemText primary='Grossiste' />
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default SpecialityTypeDropdown;
