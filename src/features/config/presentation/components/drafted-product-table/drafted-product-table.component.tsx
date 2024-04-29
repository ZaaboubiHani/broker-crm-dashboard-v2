import React from 'react';
import { DotSpinner } from '@uiball/loaders'
import IconButton from '@mui/material/IconButton';
import ProductModel from '../../../domain/models/product.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import RestoreIcon from '@mui/icons-material/Restore';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';

interface DraftedProductTableProps {
    data: ProductModel[];
    isLoading: boolean;
    onRestore: (product: ProductModel) => void;
    id?: string;
}

const DraftedProductTable: React.FC<DraftedProductTableProps> = ({ data, id, isLoading, onRestore,  }) => {
    return (
        <div id={id}
            style={{
                borderRadius: '8px',
                height: 'calc(100vh - 180px)',
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
                            [...data.map((row) => {
                                return {
                                    id: row._id,
                                    name: row.name,
                                    ug: row.ug,
                                    remise: row.remise,
                                    PPA: row.PPA,
                                    wholesalerPriceUnit: row.wholesalerPriceUnit,
                                    pharmacyPriceUnit: row.pharmacyPriceUnit,
                                    superWholesalerPriceUnit: row.superWholesalerPriceUnit,
                                    collision: row.collision,
                                    DDP: formatDateToYYYYMMDD(row.DDP ?? new Date()),
                                    model: row,
                                };
                            })]}

                        columns={[
                            {
                                field: 'name',
                                headerName: 'Nom',
                            },
                            {
                                field: 'ug',
                                headerName: 'UG',
                            },
                            {
                                field: 'remise',
                                headerName: 'Remise',
                            },
                            {
                                field: 'wholesalerPriceUnit',
                                headerName: 'Grossiste prix unitaire',
                            },
                            {
                                field: 'pharmacyPriceUnit',
                                headerName: 'Pharmacie prix unitaire',
                            },
                            {
                                field: 'superWholesalerPriceUnit',
                                headerName: 'Super grossiste prix unitaire',
                            },
                            {
                                field: 'collision',
                                headerName: 'Collisage',
                            },
                            {
                                field: 'PPA',
                                headerName: 'PPA',
                            },
                            {
                                field: 'DDP',
                                headerName: 'DDP',
                            },
                            {
                                field: 'delete',
                                headerName: 'Restaurer',
                                renderCell(params) {
                                    return (<IconButton onClick={() => {
                                        onRestore(params.row.model);
                                    }} >
                                        <RestoreIcon />
                                    </IconButton>);
                                },
                            },
                        ]}

                        hidePaginationFooter={true}

                    />)}
        </div>
    );
};

export default DraftedProductTable;
