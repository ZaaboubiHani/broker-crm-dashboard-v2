import React from 'react';
import './profile-table.style.css';
import EditIcon from '@mui/icons-material/Edit';
import { DotSpinner } from '@uiball/loaders';
import { formatDateToYYYYMMDD } from '../../../../../core/functions/date-format';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import UserModel from '../../../domain/models/user.model';
import ScalableTable from '../../../../../core/components/scalable-table/scalable-table.component';
import { UserRole } from '../../../../../core/entities/user.entity';


export interface ProfileTableProps {
    data: UserModel[];
    isLoading: boolean;
    editUser: (user: UserModel) => void,
    blockUser: (user: UserModel) => void,
}

const ProfileTable: React.FC<ProfileTableProps> = ({ data, isLoading, editUser,blockUser }) => {


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            borderRadius: '8px',
            margin: '8px  0px -8px 8px',
            paddingRight: '24px',
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
                                    id: row._id,
                                    index: index,
                                    date: formatDateToYYYYMMDD(row.createdAt || new Date()),
                                    username: row.username,
                                    wilayas: row.wilayas,
                                    phone: row.phonePersonal,
                                    password: row.password,
                                    email: row.email,
                                    type: row.role === UserRole.supervisor ? 'Superviseur' : row.role === UserRole.kam ? 'Kam' : row.role === UserRole.operator ? 'Opératrice' : 'Délégué',
                                    isBlocked: row.isBlocked,
                                    user: row,
                                };
                            })]}
                        columns={[
                            {
                                field: 'date',
                                headerName: 'Création',
                            },
                            {
                                field: 'username',
                                headerName: 'Nom d\'utilisateur',
                            },
                            {
                                field: 'phone',
                                headerName: 'Mobile',
                            },
                            {
                                field: 'email',
                                headerName: 'E-mail',
                            },
                            {
                                field: 'type',
                                headerName: 'Type',
                            },
                            {
                                field: 'isBlocked',
                                headerName: 'Blocage',
                                width: 100,
                                renderCell(params) {
                                    return (<Switch onChange={() => {
                                        blockUser(params.row.user.copyWith({}))
                                    }} checked={params.row.isBlocked} />);
                                }
                            },
                            {
                                field: 'edit',
                                headerName: 'Modifier',
                                renderCell(params) {
                                    return (<Button onClick={() => {
                                        editUser(params.row.user.copyWith({}));
                                    }} variant="text"><EditIcon /></Button>);
                                },
                            },

                        ]}
                        hidePaginationFooter={true}
                    />)}

        </div>
    );
};

export default ProfileTable;
