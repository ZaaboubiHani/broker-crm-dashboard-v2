import { Component } from 'react';
import './profile-page.style.css';
import DotSpinner from '@uiball/loaders/dist/components/DotSpinner';
import Snackbar from '@mui/material/Snackbar';
import ProfileTable from '../../components/profile-table/profile-table.component';
import UserModel from '../../../domain/models/user.model';
import WilayaModel from '../../../domain/models/wilaya.model';
import CompanyModel from '../../../domain/models/company.model';
import UserService from '../../../data/services/user.service';
import WilayaService from '../../../data/services/wilaya.service';
import CircleAvatar from '../../../../../core/components/circle-avatar/circle-avatar.component';
import UserDetails from '../../../../../core/components/user-details/user-details.component';
import UserEntity, { UserRole } from '../../../../../core/entities/user.entity';
import UserDialog from '../../components/user-dialog/user-dialog.component';
import CompanyService from '../../../data/services/company.service';
import YesNoDialog from '../../../../../core/components/yes-no-dialog/yes-no-dialog.component';

interface ProfilePageProps {
    currentUser: UserEntity;
}

interface ProfilePageState {
    users: UserModel[];
    wilayas: WilayaModel[],
    company?: CompanyModel;
    selectedUser?: UserModel;
    loadingUsers: boolean;
    showSnackbar: boolean;
    isLoading: boolean;
    snackbarMessage: string;
    clientDialogIsOpen: boolean,
    yesNoDialogOpen: boolean,
}


class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {

    constructor(props: ProfilePageProps) {
        super(props);
        this.state = {
            isLoading: true,
            showSnackbar: false,
            snackbarMessage: '',
            users: [],
            wilayas: [],
            loadingUsers: true,
            clientDialogIsOpen: false,
            yesNoDialogOpen: false,
        };
    }

    userService = UserService.getInstance();
    wilayaService = WilayaService.getInstance();
    companyService = CompanyService.getInstance();

    handleAddUser = async (user: UserModel) => {
        this.setState({ clientDialogIsOpen: false, loadingUsers: true, });
        let res = await this.userService.createUser(user);
        const users = await this.userService.getAllUsers();
        this.setState({ users: users, loadingUsers: false });
        if (res) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Utilisateur ajouté',
            });
        }
        else {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Erreur: échec de l\'ajout d\'un utilisateur',
            });
        }
    }

    handleEditUser = async (user: UserModel) => {
        this.setState({
            clientDialogIsOpen: false,
            loadingUsers: true
        });
        let res = await this.userService.updateUser(user);
        const users = await this.userService.getAllUsers();
        this.setState({ users: users, loadingUsers: false });
        if (res) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Information utilisateur modifiée',
            });
        }
        else {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Erreur: échec de modification des informations utilisateur',
            });
        }
    }

    handleOpenAddClientDialog = () => {
        this.setState({ clientDialogIsOpen: true, selectedUser: undefined });
    }

    handleCloseAddClientDialog = () => {
        this.setState({ clientDialogIsOpen: false, selectedUser: undefined });
    }

    loadProfilePageData = async () => {
        var users = await this.userService.getAllUsers();
        var wilayas = await this.wilayaService.getAllWilayas();
        var company = await this.companyService.getSingleCompany();
        this.setState({
            users: users,
            loadingUsers: false,
            isLoading: false,
            company: company,
            wilayas: wilayas
        });
    }

    handleCloseSanckbar = () => {
        this.setState({ showSnackbar: false });
    };

    handleShowUserDialog = (user: UserModel) => {
        this.setState({ clientDialogIsOpen: true, selectedUser: user });
    };

    handleBlockUser = async () => {
        const index = this.state.users.findIndex(user => user._id === this.state.selectedUser?._id);
        let users: UserModel[] = [];
        if (index !== -1) {
            this.state.users.splice(index, 1);
            users = this.state.users;
            this.state.selectedUser!.isBlocked = !this.state.selectedUser?.isBlocked;
            users.splice(index, 0, this.state.selectedUser!);
        } else {
            users = this.state.users;
        }
        this.setState({ users: users, yesNoDialogOpen: false });
        let res = await this.userService.updateUser(this.state.selectedUser!);
        if (res) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: this.state.selectedUser?.isBlocked ?
                    'L\'utilisateur a été bloqué avec succès' :
                    'L\'utilisateur a été débloqué avec succès'
            });
        } else {
            this.state.users.splice(index, 1);
            users = this.state.users;
            this.state.selectedUser!.isBlocked = !this.state.selectedUser?.isBlocked;
            users.splice(index, 0, this.state.selectedUser!);
            this.setState({
                showSnackbar: true,
                snackbarMessage: this.state.selectedUser?.isBlocked ?
                    'Erreur: L\'utilisateur n\'a pas été débloqué' :
                    'Erreur: L\'utilisateur n\'a pas été bloqué',
                selectedUser: undefined,
            });
        }
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadProfilePageData();
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <DotSpinner
                        size={40}
                        speed={0.9}
                        color="black"
                    />
                </div>
            );
        }
        else {
            return (
                <div className='profile' style={{ overflow: 'hidden' }}>
                    <div style={{ height: '145px' }}>
                        <CircleAvatar name='KW'></CircleAvatar>
                        <UserDetails
                            user={this.props.currentUser}
                            company={this.state.company?.name ?? ''}
                        ></UserDetails>
                    </div>
                    <div className='title'>
                        <h3>Information d'équipe :</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4
                                onClick={this.handleOpenAddClientDialog}>
                                {this.props.currentUser!.role === UserRole.admin ? 'Ajouter superviseur/kam' : 'Ajouter un délégué'}</h4>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'stretch',
                        height: '150px'
                    }}>
                        {this.state.loadingUsers ? <div style={{
                            width: '100%',
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <DotSpinner
                                size={40}
                                speed={0.9}
                                color="black"
                            />
                        </div> :
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexGrow: '1',
                                flex: '1',
                                paddingBottom: '16px',
                            }}>
                                <ProfileTable
                                    isLoading={false}
                                    data={this.state.users}
                                    editUser={this.handleShowUserDialog}
                                    blockUser={(user) => {
                                        this.setState({ yesNoDialogOpen: true, selectedUser: user });
                                    }}
                                />
                            </div>
                        }
                    </div>
                    <UserDialog
                        wilayas={this.state.wilayas}
                        onAdd={this.handleAddUser}
                        onEdit={this.handleEditUser}
                        isOpen={this.state.clientDialogIsOpen}
                        onClose={this.handleCloseAddClientDialog}
                        initUser={this.state.selectedUser}
                        creatorType={this.props.currentUser!.role!}
                    ></UserDialog>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={this.handleCloseSanckbar}
                        open={this.state.showSnackbar}
                        autoHideDuration={3000}
                        message={this.state.snackbarMessage} />
                    <YesNoDialog
                        isOpen={this.state.yesNoDialogOpen}
                        onClose={() => {
                            this.setState({ yesNoDialogOpen: false });
                        }}
                        onNo={() => {
                            this.setState({ yesNoDialogOpen: false });
                        }}
                        onYes={this.handleBlockUser}
                        message={this.state.selectedUser?.isBlocked ? 'Voulez-vous débloquer cet utilisateur ?' : 'Voulez-vous bloquer cet utilisateur ?'}
                    />
                </div>
            );
        }
    }
}



export default ProfilePage;
