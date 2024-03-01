
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DotWave } from '@uiball/loaders';
import UserEntity from '../../entities/user.entity';

interface UserDropdownProps {
    users: UserEntity[];
    label: string;
    selectedUser?: UserEntity;
    loading?: boolean;
    isNullable?: boolean;
    onSelectUser: (user?: UserEntity) => void;
}


const UserDropdown: React.FC<UserDropdownProps> = ({ users, label, onSelectUser, selectedUser, loading, isNullable }) => {

    return (
        <div style={{
            position: 'relative',
            height: '40px',
            width: '150px',
            border: loading ? 'solid 1px rgba(0,0,0,0.3)' : 'none',
            backgroundColor: 'white',
            borderRadius: '4px',
            transition: 'all 300ms ease'

        }}>
            <FormControl sx={{
                height: '40px',
                width: '150px',
                backgroundColor: 'white',
                position: 'absolute',
                display: loading ? 'none' : 'block',
                transition: 'all 300ms ease'

            }}>
                <InputLabel sx={{
                    fontSize: '16px',
                    lineHeight: '16px',
                    marginTop: '-5px',
                }}>{label}</InputLabel>
                <Select
                    sx={{

                        height: '40px',
                        width: '150px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                    }}
                    value={selectedUser}
                    onChange={(event) => {
                        let user = event.target.value as UserEntity;
                        onSelectUser(user);
                    }}
                >
                    {
                        isNullable ? (<MenuItem value={undefined}>
                            <em>aucun</em>
                        </MenuItem>) : null
                    }
                    {
                        users.map((s) => (
                            <MenuItem value={s as any}>{s.fullName!}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: loading ? 'block' : 'none',
                transition: 'all 300ms ease'
            }}>

                <DotWave
                    size={40}
                    speed={0.9}
                    color="black"
                />
            </div>
        </div>
    );
}


export default UserDropdown;