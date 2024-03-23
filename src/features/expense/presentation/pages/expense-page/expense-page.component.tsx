import React, { Component } from 'react';
import '../expense-page/expense-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import { Button as MuiButton } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserModel from '../../../domain/models/user.model';
import ExpenseDayModel from '../../../domain/models/expense-day.model';
import ExpenseUserModel from '../../../domain/models/expense-user.model';
import UserService from '../../../data/services/user.service';
import ExpenseService from '../../../data/services/expense.service';
import { UserRole } from '../../../../../core/entities/user.entity';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import MonthYearPicker from '../../../../../core/components/month-year-picker/month-year-picker.component';
import { ValidationType } from '../../../../../core/entities/expenses-user.entity';
import ExpenseTable from '../../components/expense-table/expense-table.component';
import ProofsDialog from '../../components/proofs-dialog/proofs-dialog.component';
import ExpenseStatsDialog from '../../components/expense-stats-dialog/expense-stats-dialog.component';

interface ExpensePageProps {
    currentUser: UserModel;
}

interface ExpensePageState {
    selectedDate: Date;
    isLoading: boolean;
    proofsDialogIsOpen: boolean;
    expenseStatsDialogIsOpen: boolean;
    loadingDelegates: boolean;
    index: number;
    searchText: string;
    delegates: UserModel[];
    supervisors: UserModel[];
    kams: UserModel[];
    selectedDelegate?: UserModel;
    selectedKam?: UserModel;
    selectedSupervisor?: UserModel;
    loadingExpensesData: boolean;
    delegteExpenses: ExpenseDayModel[];
    delegteExpensesUser: ExpenseUserModel;
    kamExpenses: ExpenseDayModel[];
    kamExpensesUser: ExpenseUserModel;
}


class ExpensePage extends Component<ExpensePageProps, ExpensePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            isLoading: true,
            loadingDelegates: false,
            searchText: '',
            delegates: [],
            supervisors: [],
            kams: [],
            loadingExpensesData: false,
            proofsDialogIsOpen: false,
            expenseStatsDialogIsOpen: false,
            delegteExpenses: [],
            delegteExpensesUser: new ExpenseUserModel({}),
            kamExpenses: [],
            kamExpensesUser: new ExpenseUserModel({}),
            index: 0,
        }
    }

    userService = UserService.getInstance();
    expenseService = ExpenseService.getInstance();


    handleSelectDelegate = async (delegate?: UserModel) => {
        this.setState({ loadingExpensesData: true, });
        var delegteExpenses = await this.expenseService.getExpensesDay(this.state.selectedDate, delegate!._id!);
        // var delegteExpensesUser = await this.expenseService.getExpensesUserByDateMoth(this.state.selectedDate, delegate!.id!);
        this.setState({
            selectedDelegate: delegate,
            delegteExpenses: delegteExpenses,
            loadingExpensesData: false,
            // delegteExpensesUser: delegteExpensesUser
        });
    }

    handleSelectKam = async (kam?: UserModel) => {
        // this.setState({ loadingExpensesData: true, });
        // var kamExpenses = await this.expenseService.getAllExpensesOfUserByDateMoth(this.state.selectedDate, kam!.id!);
        // var kamExpensesUser = await this.expenseService.getExpensesUserByDateMoth(this.state.selectedDate, kam!.id!);
        // this.setState({ selectedKam: kam, kamExpenses: kamExpenses, loadingExpensesData: false, kamExpensesUser: kamExpensesUser });
    }

    handleSelectSupervisor = async (supervisor?: UserModel) => {
        this.setState({
            delegates: [],
            delegteExpenses: [],
            loadingDelegates: true,
        });
        var delegates = await this.userService.getUsers([UserRole.delegate], supervisor!._id!,);

        this.setState({
            selectedSupervisor: supervisor,
            delegates: delegates,
            loadingDelegates: false,
        });
    }

    handleOnPickDate = async (date: Date) => {
        this.setState({ loadingExpensesData: true, });
        if (this.state.selectedDelegate) {
            var delegteExpenses = await this.expenseService.getExpensesDay(date, this.state.selectedDelegate!._id!);
            // var delegteExpensesUser = await this.expenseService.getExpensesUserByDateMoth(date, this.state.selectedDelegate!.id!);
            this.setState({
                delegteExpenses: delegteExpenses,
                // delegteExpensesUser: delegteExpensesUser
            });
        }
        // if (this.state.selectedKam) {
        //     var kamExpenses = await this.expenseService.getAllExpensesOfUserByDateMoth(date, this.state.selectedKam!.id!);
        //     var kamExpensesUser = await this.expenseService.getExpensesUserByDateMoth(date, this.state.selectedKam!.id!);
        //     this.setState({
        //         kamExpenses: kamExpenses,
        //         kamExpensesUser: kamExpensesUser,
        //     });
        // }

        this.setState({
            selectedDate: date,
            loadingExpensesData: false,
        });
    }

    handleValidateExpensesUser = async () => {
        // if (this.state.delegteExpensesUser?.id) {
        //     await this.expenseService.validateExpensesUser(this.state.delegteExpensesUser!.id!);
        // }
    }

    loadExpensePageData = async () => {
        if (this.props.currentUser.role === UserRole.supervisor) {
            var delegates = await this.userService.getUsers([UserRole.delegate], this.props.currentUser._id!);

            this.setState({ isLoading: false, delegates: delegates, });
        } else {
            var supervisors = await this.userService.getUsers([UserRole.supervisor]);
            var kams = await this.userService.getUsers([UserRole.kam]);
            this.setState({ supervisors: supervisors, kams: kams, isLoading: false, });
        }
    }

    handleCloseProofsDialog = () => {
        this.setState({ proofsDialogIsOpen: false });
    }

    handleCloseExpenseStatsDialog = () => {
        this.setState({ expenseStatsDialogIsOpen: false });
    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ index: newValue, });
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadExpensePageData();
        }
    }

    render() {
        if (this.state.isLoading) {
            this.loadExpensePageData();
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
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#eee' }}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={this.state.index} onChange={this.handleTabChange} aria-label="basic tabs example">
                                <Tab label="Superviseurs" />
                                {
                                    this.props.currentUser.role === UserRole.admin ? (<Tab label="Kams" />) : null
                                }
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={this.state.index} index={0} >
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 65px)', width: '100%', }}>
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    {this.props.currentUser.role === UserRole.admin ?
                                        (<div style={{
                                            height: '50px',
                                            width: '150px',
                                            margin: '0px 8px'
                                        }}>
                                            <UserDropdown
                                                users={this.state.supervisors}
                                                selectedUser={this.state.selectedSupervisor}
                                                onSelectUser={this.handleSelectSupervisor}
                                                label='Superviseur'
                                            />
                                        </div>) : null
                                    }
                                    <div style={{ height: '50px', width: '150px', marginRight: '8px' }}>
                                        <UserDropdown
                                            users={this.state.delegates}
                                            selectedUser={this.state.selectedDelegate}
                                            onSelectUser={this.handleSelectDelegate}
                                            label='Délégué'
                                            loading={this.state.loadingDelegates}
                                        />
                                    </div>
                                    <MonthYearPicker onPick={this.handleOnPickDate}></MonthYearPicker >
                                </div>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexGrow: '1',
                                    marginBottom: '8px',
                                    height: 'calc(100% - 170px)'
                                }} >
                                    <ExpenseTable data={this.state.delegteExpenses} isLoading={this.state.loadingExpensesData}></ExpenseTable>
                                </div>
                                <div style={{ border: 'solid #ddd 1px', borderRadius: '8px', backgroundColor: '#fff', margin: '0px 16px 8px 16px', height: '35px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        état: {this.state.delegteExpensesUser.validation === ValidationType.hold ? 'En attente' :
                                            this.state.delegteExpensesUser.validation === ValidationType.sent ? 'Envoyée' : 'Approuvée'
                                        }
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total Km : {this.state.delegteExpenses.map((e) => e.kmTotal || 0).reduce((sum, current) => sum + current, 0)}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total nuitées :  {this.state.delegteExpenses.map((e) => e.nightsTotal || 0).reduce((sum, current) => sum + current, 0)}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total autre frais : {this.state?.delegteExpenses.map((e) => e.otherExpenses || 0).reduce((sum, current) => sum + current, 0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }) ?? (0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total note de frais : {this.state?.delegteExpensesUser?.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }) ?? (0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    </h6>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <MuiButton variant="outlined" disableElevation sx={{ marginRight: '16px', marginBottom: '16px' }} onClick={() => {
                                        this.setState({ expenseStatsDialogIsOpen: true });
                                    }}>
                                        Ouvrir statistiques manuelles
                                    </MuiButton>
                                    <MuiButton variant="outlined" disableElevation sx={{ marginRight: '16px', marginBottom: '16px' }} onClick={() => {
                                        this.setState({ proofsDialogIsOpen: true });
                                    }}>
                                        Consulter piece jointes
                                    </MuiButton>
                                    <MuiButton disabled={this.state.delegteExpensesUser.validation === ValidationType.hold || this.state.delegteExpensesUser.validation === ValidationType.approved} variant="contained" disableElevation sx={{ marginBottom: '16px' }} onClick={this.handleValidateExpensesUser}>
                                        Valider la note de frais
                                    </MuiButton>
                                </div>
                                <ProofsDialog data={this.state.delegteExpenses.map<{ date: Date, urls: string[] }>((ex) => {
                                    var link: { date: Date, urls: string[] } = { date: ex.date!, urls: ex.proofs?.map(p => p.url ?? '') ?? [] };
                                    return link;
                                })} isOpen={this.state.proofsDialogIsOpen} onClose={this.handleCloseProofsDialog} ></ProofsDialog>
                                {/* <ExpenseStatsDialog userId={this.state.selectedDelegate?._id} isOpen={this.state.expenseStatsDialogIsOpen} onClose={this.handleCloseExpenseStatsDialog} ></ExpenseStatsDialog> */}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={this.state.index} index={1} >
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 65px)', width: '100%', }}>
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    <div style={{ height: '50px', width: '150px', margin: '0px 8px' }}>
                                        <UserDropdown
                                            users={this.state.kams}
                                            selectedUser={this.state.selectedKam}
                                            onSelectUser={this.handleSelectKam}
                                            label='Kam'
                                        />
                                    </div>
                                    <MonthYearPicker onPick={this.handleOnPickDate}></MonthYearPicker >
                                </div>
                                <div style={{
                                    width: '100%',
                                    margin: '0px',
                                    marginBottom: '8px',
                                    display: 'flex',
                                    flexGrow: '1',
                                    height: 'calc(100% - 170px)',
                                }} >
                                    <ExpenseTable data={this.state.kamExpenses} isLoading={this.state.loadingExpensesData}></ExpenseTable>
                                </div>
                                <div style={{ border: 'solid #ddd 1px', borderRadius: '8px', backgroundColor: '#fff', margin: '0px 16px 8px 16px', height: '35px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        état: {this.state.delegteExpensesUser.validation === ValidationType.hold ? 'En attente' :
                                            this.state.delegteExpensesUser.validation === ValidationType.sent ? 'Envoyée' : 'Approuvée'
                                        }
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total Km : {this.state.kamExpenses.map((e) => e.kmTotal || 0).reduce((sum, current) => sum + current, 0)}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total nuitées :  {this.state.kamExpenses.map((e) => e.nightsTotal || 0).reduce((sum, current) => sum + current, 0)}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total autre frais : {this.state?.kamExpenses.map((e) => e.otherExpenses || 0).reduce((sum, current) => sum + current, 0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }) ?? (0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    </h6>
                                    <h6 style={{ margin: '0px', height: '32px', fontSize: '16px', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                                        Total note de frais : {this.state?.kamExpensesUser?.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }) ?? (0).toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    </h6>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <MuiButton variant="outlined" disableElevation sx={{ marginRight: '16px', marginBottom: '16px' }} onClick={() => {
                                        this.setState({ expenseStatsDialogIsOpen: true });
                                    }}>
                                        Ouvrir statistiques manuelles
                                    </MuiButton>
                                    <MuiButton variant="outlined" disableElevation sx={{ marginRight: '16px', marginBottom: '16px' }} onClick={() => {
                                        this.setState({ proofsDialogIsOpen: true });
                                    }}>
                                        Consulter piece jointes
                                    </MuiButton>
                                    <MuiButton disabled={this.state.delegteExpensesUser.validation === ValidationType.hold || this.state.delegteExpensesUser.validation === ValidationType.approved} variant="contained" disableElevation sx={{ marginBottom: '16px' }} onClick={this.handleValidateExpensesUser}>
                                        Valider la note de frais
                                    </MuiButton>
                                </div>
                                <ProofsDialog data={this.state.kamExpenses.map<{ date: Date, urls: string[] }>((ex) => {
                                    var link: { date: Date, urls: string[] } = { date: ex.date!, urls: ex.proofs?.map(p => p.url ?? '') ?? []};
                                    return link;
                                })} isOpen={this.state.proofsDialogIsOpen} onClose={this.handleCloseProofsDialog} ></ProofsDialog>
                                {/* <ExpenseStatsDialog userId={this.state.selectedKam?._id} isOpen={this.state.expenseStatsDialogIsOpen} onClose={this.handleCloseExpenseStatsDialog} ></ExpenseStatsDialog> */}
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
            );
        }
    }
}

export default ExpensePage;
