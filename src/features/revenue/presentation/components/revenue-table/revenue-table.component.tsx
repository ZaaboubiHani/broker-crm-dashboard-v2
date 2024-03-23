import React from 'react';
import { DotSpinner } from '@uiball/loaders';
import Button from '@mui/material/Button';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';

interface RevenueTableProps {
    data:{
        rank?: number,
        userId?: string,
        fullName?: string,
        total?: number,
        percentage?: number,
    }[];
    displayDetails: (delegateId: string) => {};
    id?: string;
    isLoading: boolean;
}

const RevenueTable: React.FC<RevenueTableProps> = ({ data, id, isLoading, displayDetails }) => {


    return (
        <div id={id} style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            borderRadius: '8px',
            height: '100%',

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
                            [...data.map((row, index) => {

                                return {
                                    id: index,
                                    userId: row.userId,
                                    rank: row.rank,
                                    fullName: row.fullName,
                                    percentage: row.percentage+'%',
                                    amount: row.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }),

                                };
                            })]}
                        columns={[
                            {
                                field: 'rank',
                                headerName: 'Classement'
                            },
                            {
                                field: 'fullName',
                                headerName: 'Délégué'
                            },
                            {
                                field: 'amount',
                                headerName: 'Chiffre d\'affaire',
                            },
                            {
                                field: 'percentage',
                                headerName: 'Pourcentage',
                            },
                            {
                                field: 'details',
                                headerName: 'Details',
                                renderCell: (params) => {
                                    return (<Button onClick={() => {
                                        displayDetails(params.row.userId!);
                                    }} variant="text">Voir</Button>);
                                }
                            },]}
                        hidePaginationFooter={true}
                    />)}
        </div>

    );
};

export default RevenueTable;
