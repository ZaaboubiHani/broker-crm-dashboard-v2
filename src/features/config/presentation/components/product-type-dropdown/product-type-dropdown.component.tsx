import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { ProductType } from '../../../../../core/entities/product.entity';

interface ProductTypeDropdownProps {
    onSelect: (type: ProductType) => void;
}

const ProductTypeDropdown: React.FC<ProductTypeDropdownProps> = ({ onSelect, }) => {
    const [type, setType] = React.useState(ProductType.regular);
    return (
        <FormControl fullWidth sx={{
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '4px',
            marginBottom: '8px',
            width: '200px'
        }}>
            <InputLabel>Type de produit</InputLabel>
            <Select
                sx={{
                    height: '40px'
                }}
                defaultValue={type}
                onChange={async (event) => {
                    setType(event.target.value as ProductType);
                    onSelect(event.target.value as ProductType);
                }}>
                <MenuItem key={1} value={ProductType.regular}>
                    <ListItemText primary='Régulier' />
                </MenuItem>
                <MenuItem key={2} value={ProductType.concurrent}>
                    <ListItemText primary='Concurrent' />
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default ProductTypeDropdown;
