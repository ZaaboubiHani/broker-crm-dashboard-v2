import React from 'react';
import './expense-table.style.css';
import { DotSpinner } from '@uiball/loaders';
import ExpenseDayModel from '../../../domain/models/expense-day.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';


export interface ExpenseTableProps {
    data: ExpenseDayModel[];
    isLoading: boolean;

}


const ExpenseTable: React.FC<ExpenseTableProps> = ({ data, isLoading }) => {


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            borderRadius: '8px',
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
                                    date: row.date || new Date(),
                                    startLocation: `${row.startCity ?? ''}, ${row.startWilaya ?? ''}`,
                                    endLocation: `${row.endCity ?? ''}, ${row.endWilaya ?? ''}`,
                                    totalVisitsDoctor: row.totalVisitsDoctor,
                                    totalVisitsPharmacy: row.totalVisitsPharmacy,
                                    kmTotal: row.kmTotal,
                                    indemnityKm: row.indemnityKm,
                                    nightsTotal: row.nightsTotal,
                                    indemnityNights: row.indemnityNights,
                                    otherExpenses: row.otherExpenses,
                                    totalExpense: row.totalExpense,
                                };
                            })]}
                        columns={[
                            {
                                field: 'date',
                                headerName: 'Date',
                                valueFormatter(params) {
                                    return formatDateToYYYYMMDD(params.value);
                                },
                            },
                            {
                                field: 'startLocation',
                                headerName: 'Localité départ',

                            },
                            {
                                field: 'endLocation',
                                headerName: 'Localité arrivé',
                            },
                            {
                                field: 'totalVisitsDoctor',
                                headerName: 'Total contact médcins',
                            },
                            {
                                field: 'totalVisitsPharmacy',
                                headerName: 'Total contact pharmacies',
                            },
                            {
                                field: 'kmTotal',
                                headerName: 'Total KM',
                            },
                            {
                                field: 'indemnityKm',
                                headerName: 'Indemnités KM',
                                valueFormatter(params) {
                                    return params.value?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });
                                },
                            },
                            {
                                field: 'nightsTotal',
                                headerName: 'Total nuites',
                            },
                            {
                                field: 'indemnityNights',
                                headerName: 'Indemnités nuites',
                                valueFormatter(params) {
                                    return params.value?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });
                                },
                            },
                            {
                                field: 'otherExpenses',
                                headerName: 'Autre frais',
                                valueFormatter(params) {
                                    return params.value?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });
                                },
                            },
                            {
                                field: 'totalExpense',
                                headerName: 'Total des indemnités',
                                valueFormatter(params) {
                                    return params.value?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });
                                },
                            },
                        ]}
                        hidePaginationFooter={true}
                    />)}
        </div>
    );
};

export default ExpenseTable;
