import React, { useState, useEffect } from "react";
import './user-dialog.style.css';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { DialogActions, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import UserModel from "../../../domain/models/user.model";
import WilayaModel from "../../../domain/models/wilaya.model";
import { UserRole } from "../../../../../core/entities/user.entity";
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface UserDialogProps {
    isOpen: boolean,
    onClose: () => void;
    onAdd: (user: UserModel) => void,
    onEdit: (user: UserModel) => void,
    creatorType: UserRole,
    wilayas: WilayaModel[],
    initUser?: UserModel,
}


const UserDialog: React.FC<UserDialogProps> = (props: UserDialogProps) => {
    const { onClose, isOpen, onAdd, creatorType, onEdit, initUser, wilayas } = props;
    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [userWilayas, setUserWilayas] = React.useState<string[]>([]);

    const [user, setUser] = useState<UserModel>(new UserModel({ role: creatorType === UserRole.admin || creatorType === undefined ? UserRole.supervisor : UserRole.delegate }));

    useEffect(() => {
        var userWilayas: string[] = [];

        for (var wilaya of props.wilayas) {
            if (initUser?.wilayas!.some((w) => w.name === wilaya.name)) {
                userWilayas.push(wilaya.name ?? '');
            }
        }

        if (initUser) {
            setUser(initUser.copyWith({}));
        }

        setUserWilayas(userWilayas);
    }, [initUser]);


    if (!isOpen) {
        return null;
    }


    const handleAddUser = (): void => {
        if (user != undefined) {
            if (props.creatorType === UserRole.supervisor) {
                user.role = UserRole.delegate;
            }
            onAdd(user);
            setUser(new UserModel({ role: creatorType === UserRole.admin ? UserRole.supervisor : UserRole.delegate }));
            setUserWilayas([]);
        }
    }

    const handleEditUser = (): void => {
        if (user != undefined) {
            if (props.creatorType === UserRole.supervisor) {
                user.role = UserRole.delegate;
            }
            onEdit(user);
            setUser(new UserModel({ role: creatorType === UserRole.admin ? UserRole.supervisor : UserRole.delegate }));
            setUserWilayas([]);
        }
    }

    const handleWilayaChange = (event: SelectChangeEvent<typeof userWilayas>) => {

        const {
            target: { value },
        } = event;

        setUserWilayas(
            typeof value === 'string' ? [] : value,
        );

        var names = typeof value === 'string' ? [] : value;

        user.wilayas = [];

        for (let i = 0; i < names.length; i++) {
            var wilaya = props.wilayas.find((w) => w.name === names[i]);
            if (wilaya) {
                user.wilayas.push(wilaya)
            }
        }
    };

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        const {
            target: { value },
        } = event;
        user.role = typeof value === 'string' ? UserRole.delegate : value === 1 ? UserRole.supervisor : value === 2 ? UserRole.kam : value === 3 ? UserRole.operator : UserRole.delegate;
        setStateTrigger(!stateTrigger);
    };

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUser(user.copyWith({ username: event.target.value }));
        if (initUser) {
            initUser.username = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }
    const handleFullname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        user.fullName = event.target.value;
        if (initUser) {
            initUser.fullName = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        user.email = event.target.value;
        if (initUser) {
            initUser.email = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        user.password = event.target.value;
        if (initUser) {
            initUser.password = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }

    const handlePhonePersonal = (event: React.ChangeEvent<HTMLInputElement>): void => {
        user.phonePersonal = event.target.value;
        if (initUser) {
            initUser.phonePersonal = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }
    const handlePhoneProfessional = (event: React.ChangeEvent<HTMLInputElement>): void => {
        user.phoneProfessional = event.target.value;
        if (initUser) {
            initUser.phoneProfessional = event.target.value;
            setStateTrigger(!stateTrigger);
        }
    }

    const handleClose = () => {
        setUser(new UserModel({ role: creatorType === UserRole.admin ? UserRole.supervisor : UserRole.delegate }));
        setUserWilayas([]);
        onClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth='md' onClose={handleClose} open={isOpen}  >
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogContent>
                <Box sx={{ flex: '1', marginTop: '4px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={user?.username === undefined || user?.username.length === 0}
                                helperText='(obligatoire)'
                                value={user?.username}
                                onChange={handleUsername}
                                label="Nom d'utilisateur"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={user?.fullName === undefined || user?.fullName.length === 0}
                                helperText='(obligatoire)'
                                value={user?.fullName}
                                onChange={handleFullname}
                                label="Nom et prénom"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                error={user?.email === undefined || user?.email.length === 0}
                                helperText='(obligatoire)'
                                value={user?.email}
                                onChange={handleEmail}
                                label="Email"
                                variant="outlined"
                                type="email" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Wilaya</InputLabel>
                                <Select
                                    defaultValue={initUser?.wilaya}
                                    onChange={(event) => {
                                        setUser(user.copyWith({ wilaya: event.target.value.toString(), commune: undefined }));
                                        if (initUser) {
                                            initUser.wilaya = event.target.value.toString();
                                            initUser.commune = undefined;
                                            setStateTrigger(!stateTrigger);
                                        }
                                    }}
                                >
                                    {wilayas.map((wilaya) => (
                                        <MenuItem key={wilaya._id} value={wilaya.name}>

                                            <ListItemText primary={wilaya.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Commune</InputLabel>
                                <Select
                                    key={user.wilaya}
                                    defaultValue={initUser?.commune}
                                    disabled={(!(initUser?.wilaya !== undefined) && !(user?.wilaya !== undefined))}
                                    onChange={(event) => {
                                        user.commune = event.target.value.toString();
                                        if (initUser) {
                                            initUser.commune = event.target.value.toString();
                                            setStateTrigger(!stateTrigger);
                                        }
                                    }}
                                >
                                    {wilayas.filter((w) => w.name === user?.wilaya).length > 0 ? wilayas.filter((w) => w.name === user?.wilaya)[0].communes!.map((commune) => (
                                        <MenuItem key={commune} value={commune}>
                                            <ListItemText primary={commune} />
                                        </MenuItem>
                                    )) : undefined}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 1, margin: '0px', padding: '0px', width: '100%', }}
                                variant="outlined">
                                <InputLabel>Mot de passe</InputLabel>
                                <OutlinedInput
                                    error={user?.email === undefined || user?.email.length === 0}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handlePassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => {
                                                    setShowPassword(!showPassword);
                                                }}
                                                onMouseDown={(event) => {
                                                    event.preventDefault();
                                                }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={user?.phonePersonal}
                                onChange={handlePhonePersonal}
                                label="téléphone personnel"
                                variant="outlined"
                                type="phone" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={user?.phoneProfessional}
                                onChange={handlePhoneProfessional}
                                label="téléphone professionnel"
                                variant="outlined"
                                type="text" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                value={user?.address}
                                onChange={handlePhoneProfessional}
                                label="adresse"
                                variant="outlined"
                                type="phone" />
                        </Grid>
                        {
                            creatorType === UserRole.admin ? (
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>type d'utilisateur</InputLabel>
                                        <Select
                                            defaultValue={initUser?.role === UserRole.supervisor ? 1 : initUser?.role === UserRole.kam ? 2 : initUser?.role === UserRole.operator ? 3 : 1}
                                            onChange={handleTypeChange}
                                            readOnly={initUser !== undefined}
                                        >
                                            <MenuItem value={1}>Superviseur</MenuItem>
                                            <MenuItem value={2}>Kam</MenuItem>
                                            <MenuItem value={3}>Opérateur</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ) : null
                        }
                        <Grid item xs={4}>
                            <FormControl sx={{
                                flex: '1',
                                width: '100%',
                                opacity: creatorType === UserRole.supervisor || user.role === UserRole.kam || initUser?.role === UserRole.kam || initUser?.role === UserRole.delegate ? '1' : '0',
                                display: creatorType === UserRole.supervisor || user.role === UserRole.kam || initUser?.role === UserRole.kam || initUser?.role === UserRole.delegate ? 'block' : 'none',
                                transition: 'all 300ms ease'
                            }}>
                                <InputLabel>Wilayat</InputLabel>
                                <Select
                                    sx={{ width: '100%', }}
                                    multiple
                                    value={userWilayas}
                                    onChange={handleWilayaChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {wilayas.map((wilaya) => (
                                        <MenuItem key={wilaya._id} value={wilaya.name}>
                                            <Checkbox checked={userWilayas.indexOf(wilaya.name ?? '') > -1} />
                                            <ListItemText primary={wilaya.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {
                    initUser ? (<Button onClick={handleEditUser} variant="contained" disableElevation>
                        Modifier
                    </Button>) :
                        (<Button onClick={handleAddUser} variant="contained" disableElevation>
                            Ajouter
                        </Button>)
                }

            </DialogActions>
        </Dialog>
    );
}

export default UserDialog;