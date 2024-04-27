import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import GoalModel from '../../../domain/models/goal.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import TextField from '@mui/material/TextField';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

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

interface GoalTableProps {
    data: GoalModel[];
    isLoading: boolean;
    id?: string;
}

const GoalTable: React.FC<GoalTableProps> = ({ data, id, isLoading, }) => {

    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 240px)',

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
                            [...data.map((row,index) => {
                                return {
                                    id: row._id,
                                    index: index,
                                    user: row.user?.fullName,
                                };
                            })]}

                        columns={[
                            {
                                field: 'user',
                                headerName: 'Utilisateur',
                            },
                            {
                                field: 'visits',
                                headerName: 'Objectif de visites',
                                renderCell(params) {
                                    return ( <TextField
                                        value={data[params.row.index].totalVisits}
                                        onChange={(event)=>{
                                            data[params.row.index].totalVisits = parseInt(event.target.value);
                                        }}
                                        size="small"
                                        label="Objectif de visites"
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: NumericFormatCustom as any,
                                        }}
                                        sx={{
                                            marginRight: '8px',
                                            backgroundColor: 'white',
                                            borderRadius: '4px',
                                            height: '40px',
                                            flex: '1',
                                        }} />);
                                },
                            },
                            {
                                field: 'sales',
                                headerName: 'Objectif de chiffre d\'affaire',
                                renderCell(params) {
                                    return ( <TextField
                                        value={data[params.row.index].totalSales}
                                        onChange={(event)=>{
                                            data[params.row.index].totalSales = parseInt(event.target.value);
                                        }}
                                        size="small"
                                        label="Objectif de chiffre d'affaire"
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: PriceFormatCustom as any,
                                        }}
                                        sx={{
                                            marginRight: '8px',
                                            backgroundColor: 'white',
                                            borderRadius: '4px',
                                            height: '40px',
                                            flex: '1',
                                        }} />);
                                },
                            },
                        ]}
                        hidePaginationFooter={true}
                    />)}
        </div>
    );
};

export default GoalTable;
