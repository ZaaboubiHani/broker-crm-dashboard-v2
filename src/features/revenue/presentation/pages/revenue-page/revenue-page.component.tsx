
import { Component } from 'react';
import '../revenue-page/revenue-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import UserModel from '../../../domain/models/user.model';
import UserService from '../../../data/services/user.service';
import { UserRole } from '../../../../../core/entities/user.entity';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import MonthYearPicker from '../../../../../core/components/month-year-picker/month-year-picker.component';
import CircularProgressLabel from '../../../../../core/components/circular-progress-label/circular-progress-label.component';
import CompoundBox, { RenderDirection } from '../../../../../core/components/compound-box/compound-box.component';
import RevenuePanel from '../../components/revenue-panel/revenue-panel.component';
import RevenueTable from '../../components/revenue-table/revenue-table.component';
import RevenueService from '../../../data/services/revene.service';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import RevenueStatisticsService from '../../../data/services/statics.service';

interface RevenuePageProps {
    currentUser: UserModel;
}

interface RevenuePageState {
    selectedDate: Date;
    isLoading: boolean;
    searchText: string;
    loadingRevenuesData: boolean;
    loadingRevenueData: boolean;
    delegateRevenues: {
        rank?: number,
        userId?: string,
        fullName?: string,
        total?: number,
        percentage?: number,
    }[];
    kamRevenues: {
        rank?: number,
        userId?: string,
        fullName?: string,
        total?: number,
        percentage?: number,
    }[];
    delegateTeamRevenue: { honored: number, nonHonored: number, total: number };
    kamTeamRevenue: { honored: number, nonHonored: number, total: number };
    supervisors: UserModel[];
    selectedSupervisor?: UserModel;
    userWilayasRevenue: { name: string, totalSales: number, percentage: number, products: { name: string, quantity: number, total: number, percentage: number }[] }[];
    userProductsRevenue: { name: string, quantity: number, total: number, percentage: number }[];
    totalDelegateRevenue: number;
    totalDelegateRevenueHonored: number;
    totalDelegateRevenueNotHonored: number;
    index: number;
    showDetails: boolean;
    isHonored?: boolean;
}

class RevenuePage extends Component<RevenuePageProps, RevenuePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            isLoading: true,
            searchText: '',
            delegateRevenues: [],
            kamRevenues: [],
            loadingRevenuesData: false,
            loadingRevenueData: false,
            totalDelegateRevenue: 0,
            totalDelegateRevenueHonored: 0,
            totalDelegateRevenueNotHonored: 0,
            userProductsRevenue: [],
            userWilayasRevenue: [],
            showDetails: false,
            supervisors: [],
            index: 0,
            delegateTeamRevenue: { honored: 0, nonHonored: 0, total: 0 },
            kamTeamRevenue: { honored: 0, nonHonored: 0, total: 0 }
        }
    }

    userService = UserService.getInstance();
    revenueService = RevenueService.getInstance();
    revenueStatisticsService = RevenueStatisticsService.getInstance();

    handleDisplayDetails = async (userId: string) => {
        this.setState({ loadingRevenueData: true });
        var userRevenue = await this.revenueStatisticsService.getUserRevenue(this.state.selectedDate, userId);
        var productRevenue = await this.revenueStatisticsService.getProdutRevenue(this.state.selectedDate, userId,this.state.isHonored);
        var wilayaRevenue = await this.revenueStatisticsService.getWilayaRevenue(this.state.selectedDate, userId,this.state.isHonored);

        this.setState({
            loadingRevenueData: false,
            totalDelegateRevenue: userRevenue.total,
            totalDelegateRevenueHonored: userRevenue.honored,
            totalDelegateRevenueNotHonored: userRevenue.nonHonored,
            userWilayasRevenue: wilayaRevenue, 
            userProductsRevenue: productRevenue,
            showDetails: true,
        });
    };

    loadRevenuePageData = async () => {

        if (this.props.currentUser.role === UserRole.supervisor) {
            var delegateRevenues = await this.revenueService.getRevenues(new Date(), this.props.currentUser._id!, this.state.isHonored);
            var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(new Date(), this.props.currentUser._id!);
            this.setState({
                delegateRevenues: delegateRevenues,
                isLoading: false,
                delegateTeamRevenue: teamRevenue,
            });
        } else {
            var kamRevenues = await this.revenueService.getRevenues(new Date(), undefined, this.state.isHonored, UserRole.kam);
            var supervisors = await this.userService.getUsers([UserRole.supervisor]);
            this.setState({
                supervisors: supervisors,
                kamRevenues: kamRevenues,
                isLoading: false,
            });
        }
    };
    
    handleOnPickDate = async (date: Date) => {
        this.setState({
            loadingRevenuesData: true,
            showDetails: false
        });
        if (this.props.currentUser.role === UserRole.supervisor) {
            var delegateRevenues = await this.revenueService.getRevenues(date, undefined, this.state.isHonored);
            var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(date);
            this.setState({
                delegateRevenues: delegateRevenues,
                delegateTeamRevenue: teamRevenue,
            });
        }
        else {
            
            var kamRevenues = await this.revenueService.getRevenues(date, undefined, this.state.isHonored, UserRole.kam);
            this.setState({
                kamRevenues: kamRevenues,
            });
            
            if (this.state.selectedSupervisor) {
                this.setState({ selectedSupervisor: this.state.selectedSupervisor, loadingRevenuesData: true, showDetails: false });
                var delegateRevenues = await this.revenueService.getRevenues(date, this.state.selectedSupervisor!._id!, this.state.isHonored);
                var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(date, this.state.selectedSupervisor!._id!);
                this.setState({
                    delegateRevenues: delegateRevenues,
                    loadingRevenuesData: false,
                    delegateTeamRevenue: teamRevenue,
                });
            }
        }
        this.setState({
            selectedDate: date,
            loadingRevenuesData: false,
        });
    }


    handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchText: event.target.value });
    }

    handleSelectSupervisor = async (supervisor?: UserModel) => {
        this.setState({ selectedSupervisor: supervisor, loadingRevenuesData: true, showDetails: false });
        var delegateRevenues = await this.revenueService.getRevenues(this.state.selectedDate, supervisor!._id!, this.state.isHonored);
        var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(this.state.selectedDate, supervisor!._id!);
        this.setState({
            delegateRevenues: delegateRevenues,
            loadingRevenuesData: false,
            delegateTeamRevenue: teamRevenue,
        });
    }


    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({
            index: newValue,
            showDetails: false,
        });
    };



    componentDidMount() {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadRevenuePageData();
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
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'stretch', backgroundColor: '#eee' }}>
                    <Box sx={{ width: '100%', height: '50px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={this.state.index} onChange={this.handleTabChange} aria-label="basic tabs example">
                                <Tab label="Délégués" />
                                {
                                    this.props.currentUser.role !== UserRole.supervisor ? (<Tab label="Kam" />) : null
                                }
                            </Tabs>
                        </Box>
                    </Box>
                    <CustomTabPanel value={this.state.index} index={0} >
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 70px)' }}>
                            <div style={{ display: 'flex', height: '40px', margin: '8px 0px 8px 8px' }}>

                                {
                                    this.props.currentUser.role === UserRole.admin ? (
                                        <div style={{ margin: '0px 8px' }}>
                                            <UserDropdown
                                                users={this.state.supervisors}
                                                selectedUser={this.state.selectedSupervisor}
                                                onSelectUser={this.handleSelectSupervisor}
                                                label='Superviseur'
                                            />
                                        </div>

                                    ) : null
                                }
                                <MonthYearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></MonthYearPicker >
                                <FormControl sx={{
                                    height: '40px',
                                    width: '150px',
                                    backgroundColor: 'white',
                                    transition: 'all 300ms ease',
                                    marginLeft: '8px',
                                }}>
                                    <InputLabel sx={{
                                        fontSize: '16px',
                                        lineHeight: '16px',
                                        marginTop: '-5px',
                                    }}>état</InputLabel>
                                    <Select
                                        sx={{
                                            height: '40px',
                                            width: '150px',
                                            backgroundColor: 'white',
                                            borderRadius: '4px',
                                        }}
                                        value={this.state.isHonored}
                                        onChange={async (event) => {
                                            let isHonored = event.target.value === 'true';
                                            this.setState({
                                                loadingRevenuesData: true,
                                                showDetails: false
                                            });
                                            if (this.props.currentUser.role === UserRole.supervisor) {
                                                var delegateRevenues = await this.revenueService.getRevenues(this.state.selectedDate, undefined, isHonored);
                                                var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(this.state.selectedDate,);
                                                this.setState({
                                                    delegateRevenues: delegateRevenues,
                                                    delegateTeamRevenue: teamRevenue,
                                                });
                                            } else {

                                                var delegateRevenues = await this.revenueService.getRevenues(this.state.selectedDate, this.state.selectedSupervisor!._id!, isHonored);
                                                var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(this.state.selectedDate, this.state.selectedSupervisor!._id!);
                                                this.setState({
                                                    delegateRevenues: delegateRevenues,
                                                    delegateTeamRevenue: teamRevenue,
                                                });
                                            }
                                            this.setState({
                                                isHonored: isHonored,
                                                loadingRevenuesData: false,
                                            });
                                        }}>
                                        <MenuItem value={''}>
                                            <ListItemText primary={'Tout'} />
                                        </MenuItem>
                                        <MenuItem value={'true'}>
                                            <ListItemText primary={'Honoré'} />
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ margin: '0px 8px 0px 16px', display: 'flex', justifyContent: 'space-between', padding: '4px', backgroundColor: 'white', borderRadius: '8px' }}>
                                <CircularProgressLabel
                                    colorStroke='#FC761E'
                                    direction='row'
                                    secondTitle="Total chiffre d'affaire d'equipe:"
                                    firstTitle={this.state.delegateTeamRevenue.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={100} />
                                <CircularProgressLabel
                                    colorStroke='#CC38E0'
                                    direction='row'
                                    secondTitle='Total honore:'
                                    firstTitle={this.state.delegateTeamRevenue.honored?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={this.state.delegateTeamRevenue.total !== 0 ? this.state.delegateTeamRevenue.honored / this.state.delegateTeamRevenue.total * 100 : 0} />
                                <CircularProgressLabel
                                    colorStroke='#38EB5D'
                                    direction='row'
                                    secondTitle="Total non honore:"
                                    firstTitle={this.state.delegateTeamRevenue.nonHonored?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={this.state.delegateTeamRevenue.total !== 0 ? this.state.delegateTeamRevenue.nonHonored / this.state.delegateTeamRevenue.total * 100 : 0} />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexGrow: '1', height: 'calc(100% - 500px)', margin: '8px' }}>
                                <CompoundBox
                                    direction={RenderDirection.horizontal}
                                    flexes={[70, 30]}>
                                    <RevenueTable
                                        data={this.state.delegateRevenues}
                                        isLoading={this.state.loadingRevenuesData}
                                        displayDetails={this.handleDisplayDetails}></RevenueTable>

                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        margin: '0px',
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        borderRadius: '8px'
                                    }}>
                                        {
                                            this.state.loadingRevenueData ?
                                                (<div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    overflow: 'hidden',
                                                    flexGrow: '1',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    transition: 'all 300ms ease'
                                                }}>
                                                    <DotSpinner
                                                        size={40}
                                                        speed={0.9}
                                                        color="black"
                                                    />
                                                </div>
                                                )
                                                :
                                                (
                                                    <RevenuePanel
                                                        showData={this.state.showDetails}
                                                        total={this.state.totalDelegateRevenue}
                                                        totalHonored={this.state.totalDelegateRevenueHonored}
                                                        totalNotHonored={this.state.totalDelegateRevenueNotHonored}
                                                        wilayasRevenue={this.state.userWilayasRevenue}
                                                        productsRevenue={this.state.userProductsRevenue}
                                                    ></RevenuePanel>
                                                )
                                        }
                                    </div>
                                </CompoundBox>
                            </div>
                        </div >
                    </CustomTabPanel>
                    <CustomTabPanel value={this.state.index} index={1} >
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 70px)' }}>
                            <div style={{ display: 'flex', height: '40px', margin: '8px 0px 8px 8px' }}>
                                <MonthYearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></MonthYearPicker >
                                <FormControl sx={{
                                    height: '40px',
                                    width: '150px',
                                    backgroundColor: 'white',
                                    transition: 'all 300ms ease',
                                    marginLeft: '8px',
                                }}>
                                    <InputLabel sx={{
                                        fontSize: '16px',
                                        lineHeight: '16px',
                                        marginTop: '-5px',
                                    }}>état</InputLabel>
                                    <Select
                                        sx={{
                                            height: '40px',
                                            width: '150px',
                                            backgroundColor: 'white',
                                            borderRadius: '4px',
                                        }}
                                        value={this.state.isHonored}
                                        onChange={async (event) => {
                                            let isHonored = event.target.value === 'true';
                                            this.setState({
                                                loadingRevenuesData: true,
                                                showDetails: false
                                            });
                                            if (this.props.currentUser.role === UserRole.supervisor) {
                                                var delegateRevenues = await this.revenueService.getRevenues(this.state.selectedDate, undefined, isHonored);
                                                var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(this.state.selectedDate,);
                                                this.setState({
                                                    delegateRevenues: delegateRevenues,
                                                    kamTeamRevenue: teamRevenue,
                                                });
                                            } else {

                                                var delegateRevenues = await this.revenueService.getRevenues(this.state.selectedDate, this.state.selectedSupervisor!._id!, isHonored);
                                                var teamRevenue = await this.revenueStatisticsService.getTeamRevenue(this.state.selectedDate, this.state.selectedSupervisor!._id!);
                                                this.setState({
                                                    delegateRevenues: delegateRevenues,
                                                    kamTeamRevenue: teamRevenue,
                                                });
                                            }
                                            this.setState({
                                                isHonored: isHonored,
                                                loadingRevenuesData: false,
                                            });
                                        }}>
                                        <MenuItem value={''}>
                                            <ListItemText primary={'Tout'} />
                                        </MenuItem>
                                        <MenuItem value={'true'}>
                                            <ListItemText primary={'Honoré'} />
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ margin: '0px 8px 0px 16px', display: 'flex', justifyContent: 'space-between', padding: '4px', backgroundColor: 'white', borderRadius: '8px' }}>
                                <CircularProgressLabel
                                    colorStroke='#FC761E'
                                    direction='row'
                                    secondTitle="Total chiffre d'affaire d'equipe:"
                                    firstTitle={this.state.kamTeamRevenue.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={100} />
                                <CircularProgressLabel
                                    colorStroke='#CC38E0'
                                    direction='row'
                                    secondTitle='Total honore:'
                                    firstTitle={this.state.kamTeamRevenue.honored?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={this.state.kamTeamRevenue.total !== 0 ? this.state.kamTeamRevenue.honored / this.state.kamTeamRevenue.total * 100 : 0} />
                                <CircularProgressLabel
                                    colorStroke='#38EB5D'
                                    direction='row'
                                    secondTitle="Total non honore:"
                                    firstTitle={this.state.kamTeamRevenue.nonHonored?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                                    value={this.state.kamTeamRevenue.total !== 0 ? this.state.kamTeamRevenue.nonHonored / this.state.kamTeamRevenue.total * 100 : 0} />
                            </div>
                            <div style={{ flex: '1', display: 'flex', flexGrow: '1', height: 'calc(100% - 500px)', margin: '8px' }}>
                                <CompoundBox
                                    direction={RenderDirection.horizontal}
                                    flexes={[70, 30]}
                                >
                                    <RevenueTable
                                        data={this.state.kamRevenues}
                                        isLoading={this.state.loadingRevenuesData}
                                        displayDetails={this.handleDisplayDetails}>
                                    </RevenueTable>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        margin: '0px',
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        borderRadius: '8px'
                                    }}>
                                        {
                                            this.state.loadingRevenueData ?
                                                (<div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    overflow: 'hidden',
                                                    flexGrow: '1',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    transition: 'all 300ms ease'
                                                }}>
                                                    <DotSpinner
                                                        size={40}
                                                        speed={0.9}
                                                        color="black"
                                                    />
                                                </div>
                                                )
                                                :
                                                (
                                                    <RevenuePanel
                                                        showData={this.state.showDetails}
                                                        total={this.state.totalDelegateRevenue}
                                                        totalHonored={this.state.totalDelegateRevenueHonored}
                                                        totalNotHonored={this.state.totalDelegateRevenueNotHonored}
                                                        wilayasRevenue={this.state.userWilayasRevenue}
                                                        productsRevenue={this.state.userProductsRevenue}
                                                    ></RevenuePanel>
                                                )
                                        }
                                    </div>
                                </CompoundBox>
                            </div>
                        </div >
                    </CustomTabPanel>
                </div>
            );
        }
    }
}

export default RevenuePage;
