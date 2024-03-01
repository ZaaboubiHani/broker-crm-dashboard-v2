import React, { Component } from 'react';
import '../report-page/report-page.style.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VisitModel from '../../../domain/models/visit.model';
import ReportModel from '../../../domain/models/report.model';
import UserModel from '../../../domain/models/user.model';
import UserService from '../../../data/services/user.service';
import VisitService from '../../../data/services/visit.service';
import ReportService from '../../../data/services/report.service';
import { DotSpinner } from '@uiball/loaders';
import UserEntity, { UserRole } from '../../../../../core/entities/user.entity';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import MonthYearPicker from '../../../../../core/components/month-year-picker/month-year-picker.component';
import CompoundBox, { RenderDirection } from '../../../../../core/components/compound-box/compound-box.component';
import ReportPanel from '../../../../../core/components/report-panel/report-panel.component';
import ReportTable from '../../components/report-table/report-table.component';

interface ReportPageProps {
    currentUser: UserEntity;
}

interface ReportPageState {
    selectedDate: Date;
    isLoading: boolean;
    loadingVisitsData: boolean;
    loadingReportData: boolean;
    loadingDelegates: boolean;
    delegateSearchText: string;
    kamSearchText: string;
    selectedVisit?: VisitModel;
    reportData?: ReportModel;
    delegateVisits: VisitModel[];
    kamVisits: VisitModel[];
    delegates: UserModel[];
    supervisors: UserModel[];
    kams: UserModel[];
    selectedDelegate?: UserModel;
    selectedSupervisor?: UserModel;
    selectedKam?: UserModel;
    totalDelegate: number;
    sizeDelegate: number;
    delegatePage: number;
    totalKam: number;
    sizeKam: number;
    kamPage: number;
    index: number;
}

class ReportPage extends Component<ReportPageProps, ReportPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            isLoading: true,
            loadingVisitsData: false,
            loadingReportData: false,
            loadingDelegates: false,
            delegateVisits: [],
            kamVisits: [],
            delegateSearchText: '',
            kamSearchText: '',
            delegates: [],
            supervisors: [],
            kams: [],
            totalDelegate: 0,
            sizeDelegate: 100,
            delegatePage: 1,
            totalKam: 0,
            sizeKam: 100,
            kamPage: 1,
            index: 0,
        }
    }

    userService = UserService.getInstance();
    visitService = VisitService.getInstance();
    reportService = ReportService.getInstance();

    handleSelectDelegate = async (delegate?: UserModel) => {
        this.setState({ loadingVisitsData: true, reportData: undefined, selectedVisit: undefined, });
        let { visits: visits, total: total } = await this.visitService.getVisits(this.state.selectedDate, this.state.delegatePage, this.state.sizeDelegate, delegate!._id!);
        this.setState({ selectedDelegate: delegate, delegateVisits: visits, loadingVisitsData: false, totalDelegate: total });
    }

    handleSelectKam = async (kam?: UserModel) => {
        this.setState({ loadingVisitsData: true, reportData: undefined, selectedVisit: undefined, });
        var { visits: visits, total: total } = await this.visitService.getVisits(this.state.selectedDate, this.state.kamPage, this.state.sizeKam, kam!._id!);
        this.setState({ selectedKam: kam, kamVisits: visits, loadingVisitsData: false, totalKam: total });
    }

    handleOnPickDate = async (date: Date) => {
        this.setState({ loadingVisitsData: true, reportData: undefined, selectedVisit: undefined, });
        if (this.state.selectedDelegate) {
            var { visits: delegateVisits, total: delegateTotal } = await this.visitService.getVisits(date, this.state.delegatePage, this.state.sizeDelegate, this.state.selectedDelegate!._id!);
            this.setState({
                delegateVisits: delegateVisits,
                totalDelegate: delegateTotal,
            });
        }
        if (this.state.selectedKam) {
            var { visits: kamVisits, total: kamTotal } = await this.visitService.getVisits(date, this.state.kamPage, this.state.sizeKam, this.state.selectedKam!._id!);
            this.setState({
                kamVisits: kamVisits,
                totalKam: kamTotal,
            });
        }
        this.setState({
            selectedDate: date,
            loadingVisitsData: false,
        });
    }

    loadRepportPageData = async () => {
        if (this.props.currentUser.role === UserRole.supervisor) {
            let delegates = await this.userService.getUsers([UserRole.delegate]);
            this.setState({ delegates: delegates, });
        }
        else {
            let supervisors = await this.userService.getUsers([UserRole.supervisor]);
            let kams = await this.userService.getUsers([UserRole.kam]);
            this.setState({
                supervisors: supervisors,
                kams: kams
            });
        }
        this.setState({
            isLoading: false,
        });


    }


    handleDisplayReport = async (visit: VisitModel) => {
        this.setState({ loadingReportData: true, reportData: undefined, selectedVisit: undefined, });
        let report = await this.reportService.getReport(visit.reportId!);
        visit.report = report;
        this.setState({ loadingReportData: false, reportData: report, selectedVisit: visit, });
    };

    handleDelegatePageChange = async (page: number, size: number) => {
        // if (this.state.selectedDelegate) {
        //     this.setState({ loadingVisitsData: true, delegatePage: page, reportData: undefined, selectedVisit: undefined, sizeDelegate: size });
        //     var { visits: visits, total: total } = await this.visitService.getAllVisitsOfDelegate(page, size, this.state.selectedDate, this.state.selectedDelegate!.id!);
        //     this.setState({
        //         delegateVisits: visits,
        //         loadingVisitsData: false,
        //         totalDelegate: total,
        //         sizeDelegate: size
        //     });
        // }
        // this.setState({
        //     loadingVisitsData: false,
        //     sizeDelegate: size,
        //     delegatePage: page,
        // });
    }

    handleKamPageChange = async (page: number, size: number) => {
        // if (this.state.selectedKam) {
        //     this.setState({ loadingVisitsData: true, kamPage: page, reportData: undefined, selectedVisit: undefined, sizeKam: size });
        //     var { visits: visits, total: total } = await this.visitService.getAllVisitsOfDelegate(page, size, this.state.selectedDate, this.state.selectedKam!.id!);
        //     this.setState({
        //         kamVisits: visits,
        //         loadingVisitsData: false,
        //         totalKam: total,
        //         sizeKam: size
        //     });
        // }
        // this.setState({
        //     loadingVisitsData: false,
        //     kamPage: page,
        //     sizeKam: size
        // });
    }

    handleDelegateRowNumChange = async (size: number) => {
        // this.setState({ loadingVisitsData: true, delegatePage: 1, sizeDelegate: size, reportData: undefined, selectedVisit: undefined, });
        // var { visits: visits, total: total } = await this.visitService.getAllVisitsOfDelegate(1, size, this.state.selectedDate, this.state.selectedDelegate!.id!);
        // this.setState({ delegateVisits: visits, loadingVisitsData: false, totalDelegate: total });
    }
    handleKamRowNumChange = async (size: number) => {
        // this.setState({ loadingVisitsData: true, kamPage: 1, sizeDelegate: size, reportData: undefined, selectedVisit: undefined, });
        // var { visits: visits, total: total } = await this.visitService.getAllVisitsOfDelegate(1, size, this.state.selectedDate, this.state.selectedKam!.id!);
        // this.setState({ kamVisits: visits, loadingVisitsData: false, totalKam: total });
    }

    handleSelectSupervisor = async (supervisor?: UserModel) => {
        this.setState({
            delegatePage: 1,
            delegates: [],
            totalDelegate: 0,
            delegateVisits: [],
            loadingDelegates: true,
        });
        let delegates = await this.userService.getUsers([UserRole.delegate], supervisor?._id);

        this.setState({
            selectedSupervisor: supervisor,
            delegates: delegates,
            loadingDelegates: false,
        });
        // this.setState({
        //     delegatePage: 1,
        //     delegates: [],
        //     totalDelegate: 0,
        //     delegateVisits: [],
        //     loadingDelegates: true,
        // });
        // var delegates = await this.userService.getUsersByCreator(supervisor!.id!, UserType.delegate);

        // this.setState({
        //     selectedSupervisor: supervisor,
        //     delegates: delegates,
        //     loadingDelegates: false,
        // });
    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({
            index: newValue,
            selectedVisit: undefined,
            reportData: undefined,
        });
    };


    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadRepportPageData();
        }
    }

    render() {
        if (this.state.isLoading) {
            this.loadRepportPageData();
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
                            <div className='report-container'>
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    {this.props.currentUser.role !== UserRole.supervisor ?
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
                                    <div style={{ height: '40px', width: '150px', marginRight: '8px' }}>
                                        <UserDropdown
                                            users={this.state.delegates}
                                            selectedUser={this.state.selectedDelegate}
                                            onSelectUser={this.handleSelectDelegate}
                                            label='Délégué'
                                            loading={this.state.loadingDelegates}
                                        />
                                    </div>
                                    <MonthYearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></MonthYearPicker >
                                </div>
                                <div style={{
                                    width: '100%',
                                    flexGrow: '1',
                                    display: 'flex',
                                    height: 'calc(100% - 66px)'
                                }} >
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <ReportTable
                                            id='reporttable'
                                            total={this.state.totalDelegate}
                                            page={this.state.delegatePage}
                                            size={this.state.sizeDelegate}
                                            pageChange={this.handleDelegatePageChange}
                                            isLoading={this.state.loadingVisitsData}
                                            displayReport={this.handleDisplayReport}
                                            data={this.state.delegateVisits}
                                        ></ReportTable>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            margin: '0px 0px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(127,127,127,0.2)'
                                        }}>
                                            {
                                                this.state.loadingReportData ?
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
                                                        <ReportPanel clientType={this.state.selectedVisit?.client?.type} location={this.state.selectedVisit?.client?.location} report={this.state.reportData} ></ReportPanel>
                                                    )
                                            }
                                        </div>
                                    </CompoundBox>
                                </div>
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={this.state.index} index={1} >
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 65px)' }}>
                            <div className='report-container'>
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    <div style={{ height: '50px', width: '150px', margin: '0px 8px' }}>
                                        <UserDropdown
                                            users={this.state.kams}
                                            selectedUser={this.state.selectedKam}
                                            onSelectUser={this.handleSelectKam}
                                            label='Kam'
                                        />
                                    </div>
                                    <MonthYearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></MonthYearPicker >
                                </div>
                                <div style={{
                                    width: '100%',
                                    flexGrow: '1',
                                    display: 'flex',
                                    height: 'calc(100% - 66px)'
                                }} key={0}>
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <ReportTable
                                            id='reporttable'
                                            total={this.state.totalKam}
                                            page={this.state.kamPage}
                                            size={this.state.sizeKam}
                                            pageChange={this.handleKamPageChange}
                                            isLoading={this.state.loadingVisitsData}
                                            displayReport={this.handleDisplayReport}
                                            data={this.state.kamVisits}
                                        ></ReportTable>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            margin: '0px 0px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(127,127,127,0.2)'
                                        }}>
                                            {
                                                this.state.loadingReportData ?
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
                                                        <ReportPanel location={this.state.selectedVisit?.client?.location} report={this.state.reportData} ></ReportPanel>
                                                    )
                                            }
                                        </div>
                                    </CompoundBox>
                                </div>
                            </div>
                        </div>
                    </CustomTabPanel>

                </div>

            );
        }
    }
}

export default ReportPage;
