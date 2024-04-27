import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import CompanyModel from '../../../domain/models/company.model';
import Divider from '@mui/material/Divider';
import ExpensesConfigModel from '../../../domain/models/expenses-config.model';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { HexColorPicker } from 'react-colorful';

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
                prefix="DA "
            />
        );
    },
);



interface CompanyPanelProps {
    company: CompanyModel;
    expensesConfig: ExpensesConfigModel;
    saveChanges: (company: CompanyModel, expensesConfig: ExpensesConfigModel) => void;
}

const CompanyPanel: React.FC<CompanyPanelProps> = ({ company, expensesConfig, saveChanges }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        company.file = file;
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };


    return (
        <div style={{ display: 'flex', }}>

            <div style={{ width: '50%' }}>
                <div style={{ display: 'flex', position: 'relative', }}>
                    <Avatar
                        sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 2,
                            border: 'solid grey 0.5px'
                        }}
                        alt={company.name}
                        src={imageSrc || company?.logo?.url}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />
                    <IconButton
                        onClick={handleButtonClick}
                        sx={{
                            marginLeft: '16px',
                            border: 'solid grey 1px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            height: '40px',
                        }}
                    >
                        <AddPhotoAlternateIcon />
                    </IconButton>



                </div>
                <TextField
                    defaultValue={company.name}
                    onChange={(event) => {
                        company.name = event.target.value;
                    }}
                    size="small"
                    label="Nom d\'entreprise"
                    variant="outlined"
                    sx={{
                        margin: '8px',
                        marginTop: '32px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        flex: '1',
                    }} />
                <TextField
                    defaultValue={company.address}
                    onChange={(event) => {
                        company.address = event.target.value;
                    }}
                    size="small"
                    label="Adresse d\'entreprise"
                    variant="outlined"
                    sx={{
                        margin: '8px',
                        marginTop: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        flex: '1',
                    }} />
                <TextField
                    defaultValue={company.phoneNumber1}
                    onChange={(event) => {
                        company.phoneNumber1 = event.target.value;
                    }}
                    size="small"
                    label="Numéro de téléphone 1"
                    variant="outlined"
                    sx={{
                        margin: '8px',
                        marginTop: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        flex: '1',
                    }} />
                <TextField
                    defaultValue={company.phoneNumber2}
                    onChange={(event) => {
                        company.phoneNumber2 = event.target.value;
                    }}
                    size="small"
                    label="Numéro de téléphone 2"
                    variant="outlined"
                    sx={{
                        margin: '8px',
                        marginTop: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        flex: '1',
                    }} />
                <TextField
                    defaultValue={company.email}
                    onChange={(event) => {
                        company.email = event.target.value;
                    }}
                    size="small"
                    label="Email d\'entreprise"
                    variant="outlined"
                    sx={{
                        margin: '8px',
                        marginTop: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        flex: '1',
                    }} />
                <IconButton
                    onClick={() => {
                        saveChanges(company, expensesConfig);
                    }}
                    sx={{
                        marginLeft: '8px',
                        marginTop: '16px',
                        border: 'solid grey 1px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        height: '40px',
                        fontSize: '16px',
                        width: '245px',
                        color: 'teal'
                    }}>
                    <SaveIcon />
                    Enregistrer les modifications
                </IconButton>
            </div>
            <Divider
                orientation="vertical"
                flexItem component="div"
                style={{ width: '0.5%' }}
                sx={{
                    borderRight: 'solid grey 1px',
                    height: '200px'
                }} />
            <div style={{
                marginLeft: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    marginLeft: '32px',
                    alignItems: 'space-between'
                }}>
                    <div>
                        Configuration des dépenses
                    </div>
                    <TextField
                        defaultValue={expensesConfig.kmPrice}
                        onChange={(event) => {
                            expensesConfig.kmPrice = Number(event.target.value) ?? 0.0;
                        }}
                        size="small"
                        label="Prix du kilomètre"
                        variant="outlined"
                        InputProps={{
                            inputComponent: NumericFormatCustom as any,
                        }}
                        sx={{
                            margin: '8px',
                            marginTop: '16px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            height: '40px',
                            flexGrow: '1'
                        }} />
                    <TextField
                        defaultValue={expensesConfig.nightPrice}
                        onChange={(event) => {
                            expensesConfig.nightPrice = Number(event.target.value) ?? 0.0;
                        }}
                        InputProps={{
                            inputComponent: NumericFormatCustom as any,
                        }}
                        size="small"
                        label="Prix de la nuit"
                        variant="outlined"
                        sx={{
                            margin: '8px',
                            marginTop: '16px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            height: '40px',
                            flexGrow: '1'
                        }} />

                </div>
                <HexColorPicker color={company.color} onChange={(newColor) => {
                    company.color = newColor;
                }}
                    style={{
                        width: '300px',
                        height: '300px',

                    }}
                />

            </div>

        </div >
    );
};

export default CompanyPanel;
