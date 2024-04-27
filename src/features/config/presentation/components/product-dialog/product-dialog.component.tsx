import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import ProductModel from "../../../domain/models/product.model";
import DialogActions from "@mui/material/DialogActions";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { ProductType } from "../../../../../core/entities/product.entity";
import dayjs, { Dayjs } from 'dayjs';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values: any) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
            />
        );
    },
);
const PriceFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values: any) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix="DA "
            />
        );
    },
);

interface ProductDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onAdd: (product: ProductModel) => void,
    onEdit: (product: ProductModel) => void,
    initProduct?: ProductModel,
}


const ProductDialog: React.FC<ProductDialogProps> = ({ onClose, isOpen, onAdd, onEdit, initProduct }) => {

    const [product, setProduct] = useState<ProductModel>(new ProductModel({}));

    useEffect(() => {
        if (initProduct) {
            setProduct(initProduct.copyWith({}));
        }
    }, [initProduct, isOpen]);


    if (!isOpen) {
        return null;
    }


    const handleAddProduct = (): void => {
        if (product !== undefined) {
            onAdd(product);
            setProduct(new ProductModel({}));
        }
    }

    const handleEditProduct = (): void => {
        if (product != undefined) {
            onEdit(product);
            setProduct(new ProductModel({}));
        }
    }

    const handleClose = () => {
        setProduct(new ProductModel({}));
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='md' onClose={handleClose} open={isOpen}  >
            <DialogTitle>{initProduct ? 'Modifier ' : 'Ajouter'} un produit</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={product?.name === undefined || product?.name.length === 0}
                                helperText='(obligatoire)'
                                value={product?.name}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ name: event.target.value }));
                                }}
                                label="Nom de produit"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.ug}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ ug: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="UG"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.remise}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ remise: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="Remise"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.wholesalerPriceUnit}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ wholesalerPriceUnit: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="Grossiste prix unitaire"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.pharmacyPriceUnit}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ pharmacyPriceUnit: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="Pharmacie prix unitaire"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.superWholesalerPriceUnit}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ superWholesalerPriceUnit: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="Super grossiste prix unitaire"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.collision}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ collision: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="Collisage"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={product?.PPA}
                                onChange={(event) => {
                                    setProduct(product.copyWith({ PPA: parseInt(event.target.value) }));
                                }}
                                InputProps={{
                                    inputComponent: PriceFormatCustom as any,
                                }}
                                label="PPA"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    sx={{
                                        width: '275px'
                                    }}
                                    value={product?.DDP ? dayjs(product?.DDP) : undefined}
                                    onChange={(date) => {
                                        let newDate = (date! as any).$d as Date;
                                        setProduct(product.copyWith({ DDP: newDate }));
                                    }} label="DDP" />
                            </LocalizationProvider>
                        </Grid>
                        {
                            !initProduct ?
                                (<Grid item xs={4}>
                                    <FormControl fullWidth sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        marginBottom: '8px',
                                        width: '275px',
                                        height: '55px'
                                    }}>
                                        <InputLabel>Type de produit</InputLabel>
                                        <Select
                                            sx={{
                                                height: '55px'
                                            }}
                                            value={product?.type}
                                            onChange={async (event) => {
                                                setProduct(product.copyWith({ type: event.target.value as ProductType }));
                                            }}>
                                            <MenuItem key={1} value={ProductType.regular}>
                                                <ListItemText primary='Régulier' />
                                            </MenuItem>
                                            <MenuItem key={2} value={ProductType.concurrent}>
                                                <ListItemText primary='Concurrent' />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>) : null
                        }
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {
                    initProduct ? (<Button onClick={handleEditProduct} variant="contained" disableElevation>
                        Modifier
                    </Button>) :
                        (<Button onClick={handleAddProduct} variant="contained" disableElevation>
                            Ajouter
                        </Button>)
                }

            </DialogActions>
        </Dialog>
    );
}

export default ProductDialog;