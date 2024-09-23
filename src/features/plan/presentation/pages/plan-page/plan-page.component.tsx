import React, { Component } from 'react';
import '../plan-page/plan-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserModel from '../../../domain/models/user.model';
import VisitModel from '../../../domain/models/visit.model';
import ReportModel from '../../../domain/models/report.model';
import { UserRole } from '../../../../../core/entities/user.entity';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import MonthYearPicker from '../../../../../core/components/month-year-picker/month-year-picker.component';
import CompoundBox, { RenderDirection } from '../../../../../core/components/compound-box/compound-box.component';
import ReportPanel from '../../../../../core/components/report-panel/report-panel.component';
import PlanPanel from '../../components/plan-panel/plan-panel.component';
import MapDialog from '../../components/map-dialog/map-dialog.component';
import PlanTable from '../../components/plan-table/plan-table.component';
import UserTrackingModel from '../../../domain/models/user-tracking.model';
import UserService from '../../../data/services/user.service';
import VisitService from '../../../data/services/visit.service';
import ReportService from '../../../data/services/report.service';
import StatisticsService from '../../../data/services/statics.service';
import UserTrackingService from '../../../data/services/user-tracking.service';
import PlanModel from '../../../domain/models/plan.model';
import CircularProgressLabel from '../../../../../core/components/circular-progress-label/circular-progress-label.component';

interface PlanPageProps {
    currentUser: UserModel;
}

interface PlanPageState {
    selectedDate: Date;
    searchText: string;
    delegates: UserModel[];
    supervisors: UserModel[];
    kams: UserModel[];
    selectedSupervisor?: UserModel;
    selectedKam?: UserModel;
    delegateReport?: ReportModel;
    delegateVisit?: VisitModel;
    selectedDelegate?: UserModel;
    loadingVisitTasksData: boolean;
    isLoading: boolean;
    loadingReport: boolean;
    loadingMap: boolean;
    showMap: boolean;
    loadingDelegates: boolean;
    loadingVisitTaskDetails: boolean;
    delegatePlans: PlanModel[];
    kamPlans: PlanModel[];
    visitDetails: VisitModel[];
    trackings: UserTrackingModel[];
    selectedVisitTaskDate?: Date;
    visitsCoordinates: { point: number[], fullName: string, createdAt: string }[];
    tasksCoordinates: { point: number[], fullName: string }[];
    delegatePlanDeTournee: number;
    kamPlanDeTournee: number;
    delegateCouverturePortfeuille: number;
    kamCouverturePortfeuille: number;
    delegateMoyenneVisitesParJour: number;
    kamMoyenneVisitesParJour: number;
    delegateObjectifChiffreDaffaire: number;
    kamObjectifChiffreDaffaire: number;
    delegateObjectifVisites: number;
    kamObjectifVisites: number;
    delegateSuccessRate: number;
    kamSuccessRate: number;
    index: number;
}


class PlanPage extends Component<PlanPageProps, PlanPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            searchText: '',
            index: 0,
            delegates: [],
            supervisors: [],
            kams: [],
            loadingVisitTasksData: false,
            isLoading: true,
            loadingMap: false,
            loadingVisitTaskDetails: false,
            loadingDelegates: false,
            delegatePlans: [],
            kamPlans: [],
            visitDetails: [],
            visitsCoordinates: [],
            tasksCoordinates: [],
            showMap: false,
            trackings: [],
            delegatePlanDeTournee: 0,
            kamPlanDeTournee: 0,
            delegateCouverturePortfeuille: 0,
            kamCouverturePortfeuille: 0,
            delegateMoyenneVisitesParJour: 0,
            kamMoyenneVisitesParJour: 0,
            delegateObjectifChiffreDaffaire: 0,
            kamObjectifChiffreDaffaire: 0,
            delegateObjectifVisites: 0,
            kamObjectifVisites: 0,
            delegateSuccessRate: 0,
            kamSuccessRate: 0,
            loadingReport: false,
        }
    }

    userService = UserService.getInstance();
    visitService = VisitService.getInstance();
    statisticsService = StatisticsService.getInstance();
    reportService = ReportService.getInstance();
    userTrackingService = UserTrackingService.getInstance();

    handleDisplayReport = async (visit: VisitModel,) => {
        this.setState({ loadingReport: true });
        let report = await this.reportService.getReport(visit.reportId!);
        visit.report = report;
        this.setState({ loadingReport: false, delegateReport: report, delegateVisit: visit });
    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ index: newValue, delegateReport: undefined, visitDetails: [] });
    };


    handleBackReportPanel = () => {
        this.setState({ loadingReport: false, delegateReport: undefined, delegateVisit: undefined });
    }

    handleSelectDelegate = async (delegate?: UserModel) => {
        this.setState({
            loadingVisitTasksData: true,
            selectedVisitTaskDate: undefined,
            visitDetails: [],
        });
        var plans = await this.visitService.getPlans(this.state.selectedDate, delegate!._id!);
        this.setState({
            selectedDelegate: delegate,
            delegatePlans: plans,
        });
        var planDeTournee = await this.statisticsService.getPlandetournee(this.state.selectedDate, delegate!._id!);
        var moyenneVisitesParJour = await this.statisticsService.getMoyenneVisitesParJour(this.state.selectedDate, delegate!._id!);
        var successRate = await this.statisticsService.getTauxdereussite(this.state.selectedDate, delegate!._id!);
        var couverturePortfeuille = await this.statisticsService.getCouverturePortefeuilleClient(this.state.selectedDate, delegate!._id!);
        var objectifChiffreDaffaire = await this.statisticsService.getObjectifChiffreDaffaire(this.state.selectedDate, delegate!._id!);
        var objectifVisites = await this.statisticsService.getObjectifvisites(this.state.selectedDate, delegate!._id!);

        this.setState({
            loadingVisitTasksData: false,
            delegatePlanDeTournee: planDeTournee,
            delegateMoyenneVisitesParJour: moyenneVisitesParJour,
            delegateSuccessRate: successRate,
            delegateCouverturePortfeuille: couverturePortfeuille,
            delegateObjectifChiffreDaffaire: objectifChiffreDaffaire,
            delegateObjectifVisites: objectifVisites,
        });
    }

    handleSelectKam = async (kam?: UserModel) => {
        this.setState({ loadingVisitTasksData: true, selectedVisitTaskDate: undefined, visitDetails: [], });
        var plans = await this.visitService.getPlans(this.state.selectedDate, kam!._id!);
        this.setState({ selectedKam: kam, kamPlans: plans, });
        var planDeTournee = await this.statisticsService.getPlandetournee(this.state.selectedDate, kam!._id!);
        var moyenneVisitesParJour = await this.statisticsService.getMoyenneVisitesParJour(this.state.selectedDate, kam!._id!);
        var successRate = await this.statisticsService.getTauxdereussite(this.state.selectedDate, kam!._id!);
        var couverturePortfeuille = await this.statisticsService.getCouverturePortefeuilleClient(this.state.selectedDate, kam!._id!);
        var objectifChiffreDaffaire = await this.statisticsService.getObjectifChiffreDaffaire(this.state.selectedDate, kam!._id!);
        var objectifVisites = await this.statisticsService.getObjectifvisites(this.state.selectedDate, kam!._id!);

        this.setState({
            selectedDelegate: kam,
            kamPlanDeTournee: planDeTournee,
            kamCouverturePortfeuille: couverturePortfeuille,
            kamMoyenneVisitesParJour: moyenneVisitesParJour,
            kamObjectifChiffreDaffaire: objectifChiffreDaffaire,
            kamObjectifVisites: objectifVisites,
            kamSuccessRate: successRate,
            loadingVisitTasksData: false
        });
    }

    handleOnPickDate = async (date: Date) => {
        if (this.state.selectedDelegate) {
            this.setState({ loadingVisitTasksData: true, selectedVisitTaskDate: undefined, visitDetails: [], });
            var plans = await this.visitService.getPlans(date, this.state.selectedDelegate!._id!);
            this.setState({
                selectedDate: date,
                delegatePlans: plans,

            });
            var planDeTournee = await this.statisticsService.getPlandetournee(date, this.state.selectedDelegate!._id!);
            var moyenneVisitesParJour = await this.statisticsService.getMoyenneVisitesParJour(date, this.state.selectedDelegate!._id!);
            var successRate = await this.statisticsService.getTauxdereussite(date, this.state.selectedDelegate!._id!);
            var couverturePortfeuille = await this.statisticsService.getCouverturePortefeuilleClient(date, this.state.selectedDelegate!._id!);
            var objectifChiffreDaffaire = await this.statisticsService.getObjectifChiffreDaffaire(date, this.state.selectedDelegate!._id!);
            var objectifVisites = await this.statisticsService.getObjectifvisites(date, this.state.selectedDelegate!._id!);

            this.setState({
                loadingVisitTasksData: false,
                selectedDate: date,
                delegatePlanDeTournee: planDeTournee,
                delegateMoyenneVisitesParJour: moyenneVisitesParJour,
                delegateSuccessRate: successRate,
                delegateCouverturePortfeuille: couverturePortfeuille,
                delegateObjectifChiffreDaffaire: objectifChiffreDaffaire,
                delegateObjectifVisites: objectifVisites,
            });
        }
        if (this.state.selectedKam) {
            this.setState({ loadingVisitTasksData: true, selectedVisitTaskDate: undefined, visitDetails: [], });
            var plans = await this.visitService.getPlans(date, this.state.selectedKam!._id!);
            var planDeTournee = await this.statisticsService.getPlandetournee(date, this.state.selectedKam!._id!);
            var couverturePortfeuille = await this.statisticsService.getCouverturePortefeuilleClient(date, this.state.selectedKam!._id!);
            var moyenneVisitesParJour = await this.statisticsService.getMoyenneVisitesParJour(date, this.state.selectedKam!._id!);
            var objectifChiffreDaffaire = await this.statisticsService.getObjectifChiffreDaffaire(date, this.state.selectedKam!._id!);
            var objectifVisites = await this.statisticsService.getObjectifvisites(date, this.state.selectedKam!._id!);
            var successRate = await this.statisticsService.getTauxdereussite(date, this.state.selectedKam!._id!);
            this.setState({ selectedDate: date, kamPlans: plans, });
            this.setState({
                selectedDate: date,
                kamPlanDeTournee: planDeTournee,
                kamCouverturePortfeuille: couverturePortfeuille,
                kamMoyenneVisitesParJour: moyenneVisitesParJour,
                kamObjectifChiffreDaffaire: objectifChiffreDaffaire,
                kamObjectifVisites: objectifVisites,
                kamSuccessRate: successRate,
                loadingVisitTasksData: false,
            });
        }
    }

    loadPlanPageData = async () => {
        if (this.props.currentUser.role === UserRole.supervisor) {
            var delegates = await this.userService.getUsers();
            this.setState({ isLoading: false, delegates: delegates, });
        }
        else {
            var supervisors = await this.userService.getUsers([UserRole.supervisor]);
            var kams = await this.userService.getUsers([UserRole.kam]);
            this.setState({
                isLoading: false,
                kams: kams,
                supervisors: supervisors,
            });
        }
    };

    handleSelectSupervisor = async (supervisor?: UserModel) => {

        this.setState({
            delegates: [],
            selectedSupervisor: supervisor,
            delegatePlans: [],
            loadingDelegates: true,
        });

        var delegates = await this.userService.getUsers([UserRole.delegate], supervisor!._id!,);

        this.setState({
            delegatePlanDeTournee: 0,
            delegateCouverturePortfeuille: 0,
            delegateMoyenneVisitesParJour: 0,
            delegateObjectifChiffreDaffaire: 0,
            delegateObjectifVisites: 0,
            delegateSuccessRate: 0,
            delegatePlans: [],
            loadingDelegates: false,
            delegates: delegates,
        });
    }

    handleSelectVisitTaskDate = async (date: Date,) => {
        this.setState({ loadingVisitTaskDetails: true, delegateReport: undefined });
        var visits = await this.visitService.getVisits(date, this.state.selectedDelegate!._id!);
        this.setState({ visitDetails: visits, loadingVisitTaskDetails: false });
    };

    compareDates = (a: VisitModel, b: VisitModel) => a!.visitDate!.getTime() - b!.visitDate!.getTime();

    handleDelegateDisplayMap = async (date: Date) => {
    
        
        this.setState({ loadingMap: true });
        var userTrackings = await this.userTrackingService.getUserTracking(date, this.state.selectedDelegate!._id!);
        this.setState({
            loadingMap: false,
            showMap: true,
            trackings: userTrackings.userTrackings,
            visitsCoordinates: userTrackings.visitsTracking,
            tasksCoordinates: userTrackings.tasksTracking,
        });
    };



    handleKamDisplayMap = async (date: Date) => {
        this.setState({ loadingMap: true });
        var userTrackings = await this.userTrackingService.getUserTracking(date, this.state.selectedKam!._id!);
        this.setState({
            loadingMap: false,
            showMap: true,
            trackings: userTrackings.userTrackings,
            visitsCoordinates: userTrackings.visitsTracking,
            tasksCoordinates: userTrackings.tasksTracking,
        });
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {

            this.loadPlanPageData();
        }
    }

    render() {
        if (this.state.isLoading) {
            this.loadPlanPageData();
            return (
                <div style={{
                    width: '100%',
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
                </div>
            );
        }
        else {
            return (
                <div className='plan-container'>
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
                            <div style={{
                                display: 'flex',
                                justifyContent: 'stretch',
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                flexGrow: '1',
                                height: 'calc(100vh  - 65px)',
                                width: '100%',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    {
                                        this.props.currentUser.role === UserRole.admin ?
                                            (<div style={{
                                                height: '50px',
                                                width: '150px',
                                                marginLeft: '8px'
                                            }}>
                                                <UserDropdown
                                                    users={this.state.supervisors}
                                                    selectedUser={this.state.selectedSupervisor}
                                                    onSelectUser={this.handleSelectSupervisor}
                                                    label='Superviseur'
                                                />
                                            </div>) : null
                                    }
                                    <div style={{ height: '50px', width: '150px', margin: '0px 8px' }}>
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
                                <div className='stats-panel' style={{ margin: '0px 8px 8px 8px', paddingLeft: '16px', backgroundColor: 'white' }}>
                                    <CircularProgressLabel colorStroke='#FC761E' direction='row' secondTitle='Realisation plan de tournee' value={this.state.delegatePlanDeTournee} />
                                    <CircularProgressLabel colorStroke='#CC38E0' direction='row' secondTitle='Couverture portefeuille client' value={this.state.delegateCouverturePortfeuille} />
                                    <CircularProgressLabel colorStroke='#38EB5D' direction='row' secondTitle="Objectif chiffre d'affaire" value={this.state.delegateObjectifChiffreDaffaire} />
                                    <CircularProgressLabel colorStroke='#2FBCEB' direction='row' secondTitle='Objectif visites' value={this.state.delegateObjectifVisites * 100} />
                                    <CircularProgressLabel colorStroke='#FC4630' direction='row' secondTitle='Moyen visite/jour' formatter={(val) => val.toFixed(0)} value={this.state.delegateMoyenneVisitesParJour} />
                                    <CircularProgressLabel colorStroke='#3A25E6' direction='row' secondTitle='Taux de réussite' value={this.state.delegateSuccessRate} />
                                </div>
                                <div style={{
                                    width: '100%',
                                    flexGrow: '1',
                                    display: 'flex',
                                    height: 'calc(100% - 220px)',

                                }}>
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <PlanTable
                                            onDisplayDetails={this.handleSelectVisitTaskDate}
                                            onDisplayMap={this.handleDelegateDisplayMap}
                                            isLoading={this.state.loadingVisitTasksData}
                                            id='plantable'
                                            data={this.state.delegatePlans}
                                        ></PlanTable>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            margin: '0px',
                                            borderRadius: '4px',
                                            flexGrow: '1',
                                            display: 'flex',
                                            border: '1px solid rgba(127,127,127,0.2)'
                                        }}>
                                            {
                                                this.state.loadingReport ?
                                                    (<div style={{
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                        flexGrow: '1',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: '8px',
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
                                                    this.state.delegateReport ? (
                                                        <ReportPanel onBackClick={this.handleBackReportPanel} showBackButton={true} location={this.state.delegateVisit?.report?.location} report={this.state.delegateReport} clientType={this.state.delegateVisit?.client?.type}></ReportPanel>
                                                    ) :
                                                        (
                                                            <PlanPanel onTaskClick={this.handleDisplayReport} isLoading={this.state.loadingVisitTaskDetails} data={this.state.visitDetails}></PlanPanel>
                                                        )
                                            }
                                        </div>
                                    </CompoundBox>
                                </div>
                                <MapDialog
                                    visitsCoordinates={this.state.visitsCoordinates}
                                    tasksCoordinates={this.state.tasksCoordinates}
                                    trackings={this.state.trackings}
                                    isOpen={this.state.showMap}
                                    onClose={() => {
                                        this.setState({ showMap: false });
                                    }} />

                                <div style={{

                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    display: this.state.loadingMap ? 'flex' : 'none',

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <DotSpinner

                                        size={40}
                                        speed={0.9}
                                        color="black"
                                    />
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={this.state.index} index={1} >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'stretch',
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                flexGrow: '1',
                                height: 'calc(100vh  - 65px)',
                                width: '100%',
                            }}>
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
                                <div className='stats-panel' style={{ margin: '0px 8px 8px 8px', paddingLeft: '16px', backgroundColor: 'white' }}>
                                    <CircularProgressLabel colorStroke='#FC761E' direction='row' secondTitle='Realisation plan de tournee' value={this.state.kamPlanDeTournee} />
                                    <CircularProgressLabel colorStroke='#CC38E0' direction='row' secondTitle='Couverture portefeuille client' value={this.state.kamCouverturePortfeuille} />
                                    <CircularProgressLabel colorStroke='#38EB5D' direction='row' secondTitle="Objectif chiffre d'affaire" value={this.state.kamObjectifChiffreDaffaire} />
                                    <CircularProgressLabel colorStroke='#2FBCEB' direction='row' secondTitle='Objectif visites' value={this.state.kamObjectifVisites * 100} />
                                    <CircularProgressLabel colorStroke='#FC4630' direction='row' secondTitle='Moyen visite/jour' formatter={(val) => val.toFixed(0)} value={this.state.kamMoyenneVisitesParJour} />
                                    <CircularProgressLabel colorStroke='#3A25E6' direction='row' secondTitle='Taux de réussite' value={this.state.kamSuccessRate} />
                                </div>
                                <div style={{
                                    width: '100%',
                                    flexGrow: '1',
                                    display: 'flex',
                                    height: 'calc(100% - 220px)',
                                }}>
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <PlanTable
                                            onDisplayDetails={this.handleSelectVisitTaskDate}
                                            onDisplayMap={this.handleKamDisplayMap}
                                            isLoading={this.state.loadingVisitTasksData}
                                            id='plantable'
                                            data={this.state.kamPlans}
                                        ></PlanTable>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            margin: '0px',
                                            borderRadius: '4px',
                                            flexGrow: '1',
                                            display: 'flex',
                                            border: '1px solid rgba(127,127,127,0.2)'
                                        }}>
                                            {
                                                this.state.loadingReport ?
                                                    (<div style={{
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                        flexGrow: '1',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: '8px',
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
                                                    this.state.delegateReport ? (
                                                        <ReportPanel onBackClick={this.handleBackReportPanel} showBackButton={true} location={this.state.delegateVisit?.report?.location} report={this.state.delegateReport} clientType={this.state.delegateVisit?.client?.type}></ReportPanel>
                                                    ) :
                                                        (
                                                            <PlanPanel onTaskClick={this.handleDisplayReport} isLoading={this.state.loadingVisitTaskDetails} data={this.state.visitDetails}></PlanPanel>
                                                        )
                                            }
                                        </div>
                                    </CompoundBox>
                                </div>
                                <MapDialog
                                    visitsCoordinates={this.state.visitsCoordinates}
                                    tasksCoordinates={this.state.tasksCoordinates}
                                    trackings={this.state.trackings}
                                    isOpen={this.state.showMap}
                                    onClose={() => {
                                        this.setState({ showMap: false });
                                    }} />
                                <div style={{

                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    display: this.state.loadingMap ? 'flex' : 'none',

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <DotSpinner

                                        size={40}
                                        speed={0.9}
                                        color="black"
                                    />
                                </div>
                            </div>
                        </CustomTabPanel>
                    </Box>


                </div>
            );
        }
    }
}

export default PlanPage;
