import React, { Component } from 'react';
import '../statistics-page/statistics-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserModel from '../../../domain/models/user.model';
import { ApexOptions } from 'apexcharts';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import { UserRole } from '../../../../../core/entities/user.entity';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import YearPicker from '../../../../../core/components/year-picker/year-picker.component';
import ReactApexChart from 'react-apexcharts';
import UserService from '../../../data/services/user.service';
import StatisticsService from '../../../data/services/statistics.service';
interface StatisticsPageProps {
    currentUser: UserModel;
}

interface StatisticsPageState {
    selectedDate: Date;
    isLoading: boolean;
    loadingDelegates: boolean;
    searchText: string;
    delegates: UserModel[];
    supervisors: UserModel[];
    kams: UserModel[];
    selectedDelegate?: UserModel;
    selectedSupervisor?: UserModel;
    selectedKam?: UserModel;
    loadingStatisticsData: boolean;
    visitTaskAreaChart: ApexOptions,
    delegateSuccessRateAreaChart: ApexOptions,
    visitGoalAreaChart: ApexOptions,
    delegateSalesAreaChart: ApexOptions,
    kamSalesAreaChart: ApexOptions,
    companySalesAreaChart: ApexOptions,
    kamChartPieOptions: ApexOptions,
    chartPieOptions: ApexOptions,
    kamSuccessRateAreaChart: ApexOptions,
    companySuccessRateAreaChart: ApexOptions,
    kamVisitTaskAreaChart: ApexOptions,
    teamContributionPieOptions: ApexOptions,
    kamVisitGoalAreaChart: ApexOptions,
    companyVisitTaskAreaChart: ApexOptions,
    delegatesContributionChartPie: ApexOptions,
    companyContributionChartPie: ApexOptions,
    teamSalesAreaChart: ApexOptions,
    teamSuccessRateAreaChart: ApexOptions,
    teamVisitGoalAreaChart: ApexOptions,
    teamVisitTaskAreaChart: ApexOptions,
    index: number;
}

class StatisticsPage extends Component<StatisticsPageProps, StatisticsPageState> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            selectedDate: new Date(),
            isLoading: true,
            searchText: '',
            delegates: [],
            supervisors: [],
            kams: [],
            loadingStatisticsData: false,
            loadingDelegates: false,
            kamChartPieOptions: {
                chart: {
                    type: 'pie',
                },
                fill: {
                    type: 'gradient',
                },
                series: [],
                labels: [],
                colors: ['#2AEB80', '#FF5747'],
                title: {
                    text: 'Diagramme de contribution au chiffre d\'affaire annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                }
            },
            chartPieOptions: {
                chart: {
                    type: 'pie',
                },
                fill: {
                    type: 'gradient',
                },
                series: [],
                labels: [],
                colors: ['#2AEB80', '#FF5747'],
                title: {
                    text: 'Diagramme de contribution au chiffre d\'affaire annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                }
            },
            teamContributionPieOptions: {
                chart: {
                    type: 'pie',
                },
                fill: {
                    type: 'gradient',
                },
                series: [],
                labels: [],
                colors: ['#2AEB80', '#FF5747'],
                title: {
                    text: 'Diagramme de contribution au chiffre d\'affaire annuel d\'equipe',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                }
            },
            delegatesContributionChartPie: {
                chart: {
                    type: 'pie',
                },
                fill: {
                    type: 'gradient',
                },
                series: [],
                labels: [],
                title: {
                    text: 'Diagramme de contribution au chiffre d\'affaire annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                }
            },
            companyContributionChartPie: {
                chart: {
                    type: 'pie',
                },
                fill: {
                    type: 'gradient',
                },
                series: [],
                labels: [],
                title: {
                    text: 'Diagramme de contribution au chiffre d\'affaire annuel de l\'entreprise',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                }
            },
            kamSuccessRateAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des taux de réussite annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#2AEB80'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            companySuccessRateAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des taux de réussite annuel de l\'entreprise',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#2AEB80'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            delegateSuccessRateAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des taux de réussite annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#2AEB80'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            teamSuccessRateAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des taux de réussite annuel de l\'équipe',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#2AEB80'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            kamSalesAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des objectifs de ventes annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#6571EB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            companySalesAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe du chiffre d\'affaires de l\'entreprise',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            delegateSalesAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des objectifs de ventes annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#6571EB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            kamVisitTaskAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe du plan de tournee annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#EA572C'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            companyVisitTaskAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe du plan de tournee annuel de l\'entreprise',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#EA572C'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            visitTaskAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe du plan de tournee annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#EA572C'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            kamVisitGoalAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des objectifs de visites annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#2FBCEB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            visitGoalAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des objectifs de visites annuel',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#2FBCEB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            teamSalesAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe de ventes annuel de l\'équipe',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#CC38E0', '#6571EB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            teamVisitGoalAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe des objectifs de visites annuel de l\'équipe',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#2FBCEB'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            teamVisitTaskAreaChart: {
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Graphe du plan de tournee annuel de l\'équipe',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                },
                colors: ['#38EB5D', '#EA572C'],
                series: [],
                xaxis: {
                    categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                }
            },
            index: 0,
        }
    }

    userService = UserService.getInstance();
    statisticsService = StatisticsService.getInstance();

    handleSelectKam = async (kam?: UserModel) => {

        this.setState({ loadingStatisticsData: true, });
        var userStats = await this.statisticsService.getUserStats(kam!._id!, this.state.selectedDate);
        var contributionStats = await this.statisticsService.getContributionUser(kam!._id!, this.state.selectedDate,);

        this.state.kamChartPieOptions.series = [contributionStats.userSales, contributionStats.teamSales - contributionStats.userSales];
        this.state.kamChartPieOptions.labels?.splice(0, this.state.kamChartPieOptions.labels?.length);
        this.state.kamChartPieOptions.labels?.push(kam!.username!);
        this.state.kamChartPieOptions.labels?.push('reste d\'equipe');

        this.state.kamSuccessRateAreaChart.series = [
            {
                name: 'Total de bon de commandes honores',
                data: userStats.map(e => e.honoredCommands),
            },
            {
                name: 'Total visites',
                data: userStats.map(e => e.doneVisits),
            },
        ];

        this.state.kamSalesAreaChart.series = [
            {
                name: 'Total chiffre d\'affaire',
                data: userStats.map(e => e.totalSales),
            },
            {
                name: 'Objectifs chiffre d\'affaire',
                data: userStats.map(e => e.goalSales),
            },
        ];

        this.state.kamVisitGoalAreaChart.series = [
            {
                name: 'Visites réalisées',
                data: userStats.map(e => e.doneVisits),
            },
            {
                name: 'Objectifs de visites',
                data: userStats.map(e => e.goalVisits),
            },
        ];

        this.state.kamVisitTaskAreaChart.series = [
            {
                name: 'Visites réalisées',
                data: userStats.map(e => e.doneVisits),
            },
            {
                name: 'visites programmées',
                data: userStats.map(e => e.allVisits),
            },
        ];

        this.setState({
            selectedKam: kam,
            loadingStatisticsData: false,
        });
    }

    handleSelectDelegate = async (delegate?: UserModel) => {

        this.setState({ loadingStatisticsData: true, });
        var userStats = await this.statisticsService.getUserStats(delegate!._id!, this.state.selectedDate);
        var contributionStats = await this.statisticsService.getContributionUser(delegate!._id!, this.state.selectedDate);

        this.state.chartPieOptions.series = [contributionStats.userSales, contributionStats.teamSales - contributionStats.userSales];
        this.state.chartPieOptions.labels?.splice(0, this.state.chartPieOptions.labels?.length);
        this.state.chartPieOptions.labels?.push(delegate!.fullName!);
        this.state.chartPieOptions.labels?.push('reste d\'equipe');

        this.state.delegateSuccessRateAreaChart.series = [
            {
                name: 'Total de bon de commandes honores',
                data: userStats.map(e => e.honoredCommands),
            },
            {
                name: 'Total visites',
                data: userStats.map(e => e.doneVisits),
            },
        ];

        this.state.delegateSalesAreaChart.series = [
            {
                name: 'Total chiffre d\'affaire',
                data: userStats.map(e => e.totalSales),
            },
            {
                name: 'Objectifs chiffre d\'affaire',
                data: userStats.map(e => e.goalSales),
            },
        ];

        this.state.visitGoalAreaChart.series = [
            {
                name: 'Visites réalisées',
                data: userStats.map(e => e.doneVisits),
            },
            {
                name: 'Objectifs de visites',
                data: userStats.map(e => e.goalVisits),
            },
        ];

        this.state.visitTaskAreaChart.series = [
            {
                name: 'Visites réalisées',
                data: userStats.map(e => e.doneVisits),
            },
            {
                name: 'visites programmées',
                data: userStats.map(e => e.allVisits),
            },
        ];



        this.setState({
            selectedDelegate: delegate,
            loadingStatisticsData: false,
        });
    }

    handleOnPickDate = async (date: Date) => {

        this.setState({ loadingStatisticsData: true, });
       
        if (this.state.selectedDelegate) {
            var userStats = await this.statisticsService.getUserStats(this.state.selectedDelegate!._id!, date);
            var contributionStats = await this.statisticsService.getContributionUser(this.state.selectedDelegate!._id!, date);

            this.state.chartPieOptions.series = [contributionStats.userSales, contributionStats.teamSales - contributionStats.userSales];
            this.state.chartPieOptions.labels?.splice(0, this.state.chartPieOptions.labels?.length);
            this.state.chartPieOptions.labels?.push(this.state.selectedDelegate!.fullName!);
            this.state.chartPieOptions.labels?.push('reste d\'equipe');

            this.state.delegateSuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: userStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: userStats.map(e => e.doneVisits),
                },
            ];

            this.state.delegateSalesAreaChart.series = [
                {
                    name: 'Total chiffre d\'affaire',
                    data: userStats.map(e => e.totalSales),
                },
                {
                    name: 'Objectifs chiffre d\'affaire',
                    data: userStats.map(e => e.goalSales),
                },
            ];

            this.state.visitGoalAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: userStats.map(e => e.doneVisits),
                },
                {
                    name: 'Objectifs de visites',
                    data: userStats.map(e => e.goalVisits),
                },
            ];

            this.state.visitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: userStats.map(e => e.doneVisits),
                },
                {
                    name: 'visites programmées',
                    data: userStats.map(e => e.allVisits),
                },
            ];
        }
        if (this.state.selectedKam) {
            var userStats = await this.statisticsService.getUserStats(this.state.selectedKam!._id!, date);
            var contributionStats = await this.statisticsService.getContributionUser(this.state.selectedKam!._id!, date);

            this.state.kamChartPieOptions.series = [contributionStats.userSales, contributionStats.teamSales - contributionStats.userSales];
            this.state.kamChartPieOptions.labels?.splice(0, this.state.kamChartPieOptions.labels?.length);
            this.state.kamChartPieOptions.labels?.push(this.state.selectedKam!.username!);
            this.state.kamChartPieOptions.labels?.push('reste d\'equipe');

            this.state.kamSuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: userStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: userStats.map(e => e.doneVisits),
                },
            ];

            this.state.kamSalesAreaChart.series = [
                {
                    name: 'Total chiffre d\'affaire',
                    data: userStats.map(e => e.totalSales),
                },
                {
                    name: 'Objectifs chiffre d\'affaire',
                    data: userStats.map(e => e.goalSales),
                },
            ];

            this.state.kamVisitGoalAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: userStats.map(e => e.doneVisits),
                },
                {
                    name: 'Objectifs de visites',
                    data: userStats.map(e => e.goalVisits),
                },
            ];

            this.state.kamVisitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: userStats.map(e => e.doneVisits),
                },
                {
                    name: 'visites programmées',
                    data: userStats.map(e => e.allVisits),
                },
            ];

        }
        if (this.state.selectedSupervisor) {
            var teamStats = await this.statisticsService.getTeamStats(this.state.selectedSupervisor!._id!, date);
            var usersContributions = await this.statisticsService.getContributionsUsers(this.state.selectedSupervisor!._id!, date);
            var teamContribution = await this.statisticsService.getContributionTeam(this.state.selectedSupervisor!._id!, date);

            this.state.teamContributionPieOptions.series = [teamContribution.teamSales, teamContribution.allSales - teamContribution.teamSales];
            this.state.delegatesContributionChartPie.series = [...usersContributions.map(e => e.total)];
            this.state.delegatesContributionChartPie.labels = [];
            usersContributions.forEach(e => {
                this.state.delegatesContributionChartPie.labels?.push(e.fullName);
            });


            this.state.teamContributionPieOptions.labels?.splice(0, this.state.teamContributionPieOptions.labels?.length);
            this.state.teamContributionPieOptions.labels?.push('equipe');
            this.state.teamContributionPieOptions.labels?.push('entreprise');


            this.state.teamSuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: teamStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: teamStats.map(e => e.doneVisits),
                },
            ];

            this.state.teamSalesAreaChart.series = [
                {
                    name: 'Total des ventes',
                    data: teamStats.map(e => e.totalSales),
                },
                {
                    name: 'Objectifs chiffre d\'affaire',
                    data: teamStats.map(e => e.goalSales),
                },
            ];

            this.state.teamVisitGoalAreaChart.series = [
                {
                    name: 'Total visites',
                    data: teamStats.map(e => e.allVisits),
                },
                {
                    name: 'Objectifs de visites',
                    data: teamStats.map(e => e.goalVisits),
                },
            ];
            this.state.teamVisitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: teamStats.map(e => e.doneVisits),
                },
                {
                    name: 'Visites programmées',
                    data: teamStats.map(e => e.goalVisits),
                },
            ];

        }
        else if(this.state.selectedSupervisor === undefined && this.props.currentUser.role === UserRole.supervisor){
            var teamStats = await this.statisticsService.getTeamStats(this.props.currentUser!._id!, date);
            var usersContributions = await this.statisticsService.getContributionsUsers(this.props.currentUser!._id!,date);
            var teamContribution = await this.statisticsService.getContributionTeam(this.props.currentUser!._id!, date);

            this.state.teamContributionPieOptions.series = [teamContribution.teamSales, teamContribution.allSales - teamContribution.teamSales];
            this.state.delegatesContributionChartPie.series = [...usersContributions.map(e => e.total)];
            this.state.delegatesContributionChartPie.labels = [];
            usersContributions.forEach(e => {
                this.state.delegatesContributionChartPie.labels?.push(e.fullName);
            });


            this.state.teamContributionPieOptions.labels?.splice(0, this.state.teamContributionPieOptions.labels?.length);
            this.state.teamContributionPieOptions.labels?.push('equipe');
            this.state.teamContributionPieOptions.labels?.push('entreprise');


            this.state.teamSuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: teamStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: teamStats.map(e => e.doneVisits),
                },
            ];

            this.state.teamSalesAreaChart.series = [
                {
                    name: 'Total des ventes',
                    data: teamStats.map(e => e.totalSales),
                },
                {
                    name: 'Objectifs chiffre d\'affaire',
                    data: teamStats.map(e => e.goalSales),
                },
            ];

            this.state.teamVisitGoalAreaChart.series = [
                {
                    name: 'Total visites',
                    data: teamStats.map(e => e.allVisits),
                },
                {
                    name: 'Objectifs de visites',
                    data: teamStats.map(e => e.goalVisits),
                },
            ];
            this.state.teamVisitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: teamStats.map(e => e.doneVisits),
                },
                {
                    name: 'Visites programmées',
                    data: teamStats.map(e => e.goalVisits),
                },
            ];
        }
        if(this.props.currentUser.role === UserRole.admin){
            var companyStats = await this.statisticsService.getCompanyStats(date);
            var companyContribution = await this.statisticsService.getContributionCompany(date);
            this.state.companyContributionChartPie.series = [...companyContribution.map(e => e.totalRemised)];
            this.state.companyContributionChartPie.labels = [];
            companyContribution.forEach(e => {
                this.state.companyContributionChartPie.labels?.push(e.fullName);
            });
            this.state.companySalesAreaChart.series = [
                {
                    name: 'Total chiffre d\'affaire',
                    data: companyStats.map(e => e.totalSales),
                },
            ];
            this.state.companyVisitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: companyStats.map(e => e.doneVisits),
                },
                {
                    name: 'visites programmées',
                    data: companyStats.map(e => e.allVisits),
                },
            ];
            this.state.companySuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: companyStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: companyStats.map(e => e.doneVisits),
                },
            ];
        }
        this.setState({
            selectedDate: date,
            loadingStatisticsData: false,
        });
    }

    handleSelectSupervisor = async (supervisor?: UserModel) => {
        this.setState({ loadingDelegates: true, loadingStatisticsData: true, });
        var delegates = await this.userService.getUsers([UserRole.delegate], supervisor?._id);
        var teamStats = await this.statisticsService.getTeamStats(supervisor!._id!, this.state.selectedDate);
        var usersContributions = await this.statisticsService.getContributionsUsers(supervisor!._id!, this.state.selectedDate,);
        var teamContribution = await this.statisticsService.getContributionTeam(supervisor!._id!, this.state.selectedDate,);

        this.state.teamContributionPieOptions.series = [teamContribution.teamSales, teamContribution.allSales - teamContribution.teamSales];
        this.state.delegatesContributionChartPie.series = [...usersContributions.map(e => e.total)];
        this.state.delegatesContributionChartPie.labels = [];
        usersContributions.forEach(e => {
            this.state.delegatesContributionChartPie.labels?.push(e.fullName);
        });


        this.state.teamContributionPieOptions.labels?.splice(0, this.state.teamContributionPieOptions.labels?.length);
        this.state.teamContributionPieOptions.labels?.push('equipe');
        this.state.teamContributionPieOptions.labels?.push('entreprise');


        this.state.teamSuccessRateAreaChart.series = [
            {
                name: 'Total de bon de commandes honores',
                data: teamStats.map(e => e.honoredCommands),
            },
            {
                name: 'Total visites',
                data: teamStats.map(e => e.doneVisits),
            },
        ];

        this.state.teamSalesAreaChart.series = [
            {
                name: 'Total des ventes',
                data: teamStats.map(e => e.totalSales),
            },
            {
                name: 'Objectifs chiffre d\'affaire',
                data: teamStats.map(e => e.goalSales),
            },
        ];

        this.state.teamVisitGoalAreaChart.series = [
            {
                name: 'Total visites',
                data: teamStats.map(e => e.allVisits),
            },
            {
                name: 'Objectifs de visites',
                data: teamStats.map(e => e.goalVisits),
            },
        ];
        this.state.teamVisitTaskAreaChart.series = [
            {
                name: 'Visites réalisées',
                data: teamStats.map(e => e.doneVisits),
            },
            {
                name: 'Visites programmées',
                data: teamStats.map(e => e.goalVisits),
            },
        ];
        this.setState({
            selectedSupervisor: supervisor,
            delegates: delegates,
            loadingDelegates: false,
            loadingStatisticsData: false,
        });
    }


    loadStatisticsPageData = async () => {


        if (this.props.currentUser.role === UserRole.supervisor) {
            var delegates = await this.userService.getUsers([UserRole.delegate]);
            this.setState({ delegates: delegates, });
        } else {
            var supervisors = await this.userService.getUsers([UserRole.supervisor]);
            var kams = await this.userService.getUsers([UserRole.kam]);
            var companyStats = await this.statisticsService.getCompanyStats(new Date());
            var companyContribution = await this.statisticsService.getContributionCompany(new Date());
            this.state.companyContributionChartPie.series = [...companyContribution.map(e => e.totalRemised)];
            this.state.companyContributionChartPie.labels = [];
            companyContribution.forEach(e => {
                this.state.companyContributionChartPie.labels?.push(e.fullName);
            });
            this.state.companySalesAreaChart.series = [
                {
                    name: 'Total chiffre d\'affaire',
                    data: companyStats.map(e => e.totalSales),
                },
            ];
            this.state.companyVisitTaskAreaChart.series = [
                {
                    name: 'Visites réalisées',
                    data: companyStats.map(e => e.doneVisits),
                },
                {
                    name: 'visites programmées',
                    data: companyStats.map(e => e.allVisits),
                },
            ];
            this.state.companySuccessRateAreaChart.series = [
                {
                    name: 'Total de bon de commandes honores',
                    data: companyStats.map(e => e.honoredCommands),
                },
                {
                    name: 'Total visites',
                    data: companyStats.map(e => e.doneVisits),
                },
            ];
            this.setState({
                supervisors: supervisors,
                kams: kams,
            });
        }

        this.setState({ isLoading: false });

    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ index: newValue });
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadStatisticsPageData();
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
                <div className='statistics-container'>
                    <div style={{
                        width: '100%', display: 'flex', flexGrow: '1', minHeight: '100vh'
                    }} >
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={this.state.index} onChange={this.handleTabChange} aria-label="basic tabs example">
                                    <Tab label="Délégué" />
                                    <Tab label={this.props.currentUser.role === UserRole.admin ? "Superviseur" : "Équipe"} />
                                    {
                                        this.props.currentUser.role === UserRole.admin ? (<Tab label="Kam" />) : undefined
                                    }
                                    {
                                        this.props.currentUser.role === UserRole.admin ? (<Tab label="Entreprise" />) : undefined
                                    }
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={this.state.index} index={0} >
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
                                    <div style={{ height: '40px', width: '150px', marginRight: '8px' }}>
                                        <UserDropdown
                                            users={this.state.delegates}
                                            selectedUser={this.state.selectedDelegate}
                                            onSelectUser={this.handleSelectDelegate}
                                            label='Délégué'
                                            loading={this.state.loadingDelegates}
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <YearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></YearPicker >
                                    </div>
                                </div>
                                {
                                    this.state.loadingStatisticsData ? (
                                        <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', alignItems: 'center', height: '700px' }}>
                                            <DotSpinner
                                                size={40}
                                                speed={0.9}
                                                color="black"
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '0px 8px', width: 'calc(100% - 16px)', overflow: 'hidden' }}>
                                            <div style={{ display: 'flex', }}>
                                                <ReactApexChart
                                                    options={this.state.delegateSalesAreaChart}
                                                    series={this.state.delegateSalesAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '4px 0px 0px 0px',
                                                        padding: '16px',
                                                        width: 'calc(50% - 33.5px)'
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.chartPieOptions}
                                                    series={this.state.chartPieOptions.series}
                                                    type="pie"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        width: 'calc(50% - 33.5px)',
                                                        borderRadius: '0px 4px 0px 0px',
                                                        padding: '16px',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', }}>
                                                <ReactApexChart
                                                    options={this.state.visitGoalAreaChart}
                                                    series={this.state.visitGoalAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        padding: '16px',
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.visitTaskAreaChart}
                                                    series={this.state.visitTaskAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px',
                                                        padding: '16px',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.delegateSuccessRateAreaChart}
                                                    series={this.state.delegateSuccessRateAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(100% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 4px 4px',
                                                        padding: '16px',
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    )

                                }
                            </CustomTabPanel>
                            <CustomTabPanel value={this.state.index} index={1}>
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
                                    <div style={{ display: 'flex' }}>
                                        <YearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></YearPicker >
                                    </div>
                                </div>
                                {
                                    this.state.loadingStatisticsData ? (
                                        <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
                                            <DotSpinner
                                                size={40}
                                                speed={0.9}
                                                color="black"
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '0px 8px', width: 'calc(100% - 16px)', overflow: 'hidden' }}>
                                            <div style={{ display: 'flex', }}>
                                                <ReactApexChart
                                                    options={this.state.teamSalesAreaChart}
                                                    series={this.state.teamSalesAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '4px 0px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.teamVisitGoalAreaChart}
                                                    series={this.state.teamVisitGoalAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 4px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', }}>
                                                <ReactApexChart
                                                    options={this.state.teamVisitTaskAreaChart}
                                                    series={this.state.teamVisitTaskAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.delegatesContributionChartPie}
                                                    series={this.state.delegatesContributionChartPie.series}
                                                    type="pie"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px',
                                                        padding: '16px'
                                                    }}
                                                />

                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.teamSuccessRateAreaChart}
                                                    series={this.state.teamSuccessRateAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 0px 4px',
                                                        padding: '16px',
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.teamContributionPieOptions}
                                                    series={this.state.teamContributionPieOptions.series}
                                                    type="pie"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 4px 0px',
                                                        padding: '16px',
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    )
                                }
                            </CustomTabPanel>
                            <CustomTabPanel value={this.state.index} index={2} >
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>

                                    <div style={{ height: '40px', width: '150px', marginRight: '8px', marginLeft: '8px' }}>
                                        <UserDropdown
                                            users={this.state.kams}
                                            selectedUser={this.state.selectedKam}
                                            onSelectUser={this.handleSelectKam}
                                            label='Kam'
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <YearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></YearPicker >
                                    </div>
                                </div>
                                {
                                    this.state.loadingStatisticsData ? (
                                        <div style={{
                                            display: 'flex',
                                            flexGrow: '1',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '700px'
                                        }}>
                                            <DotSpinner
                                                size={40}
                                                speed={0.9}
                                                color="black"
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '0px 8px', width: 'calc(100% - 16px)', overflow: 'hidden' }}>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.kamSalesAreaChart}
                                                    series={this.state.kamSalesAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '4px 0px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.kamChartPieOptions}
                                                    series={this.state.kamChartPieOptions.series}
                                                    type="pie"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 4px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.kamVisitGoalAreaChart}
                                                    series={this.state.kamVisitGoalAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        padding: '16px',
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.kamVisitTaskAreaChart}
                                                    series={this.state.kamVisitTaskAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 4px 0px',
                                                        padding: '16px',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.kamSuccessRateAreaChart}
                                                    series={this.state.kamSuccessRateAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(100% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 4px 4px',
                                                        padding: '16px',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )

                                }
                            </CustomTabPanel>
                            <CustomTabPanel value={this.state.index} index={3} >
                                <div style={{ display: 'flex', justifyContent: 'stretch', flexGrow: '1', marginTop: '16px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <YearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></YearPicker >
                                    </div>
                                </div>
                                {
                                    this.state.loadingStatisticsData ? (
                                        <div style={{
                                            display: 'flex',
                                            flexGrow: '1',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '700px'
                                        }}>
                                            <DotSpinner
                                                size={40}
                                                speed={0.9}
                                                color="black"
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '0px 8px', width: 'calc(100% - 16px)', overflow: 'hidden' }}>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.companySalesAreaChart}
                                                    series={this.state.companySalesAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '4px 0px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.companyContributionChartPie}
                                                    series={this.state.companyContributionChartPie.series}
                                                    type="pie"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 4px 0px 0px',
                                                        padding: '16px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <ReactApexChart
                                                    options={this.state.companySuccessRateAreaChart}
                                                    series={this.state.companySuccessRateAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 0px 4px',
                                                        padding: '16px',
                                                    }}
                                                />
                                                <ReactApexChart
                                                    options={this.state.companyVisitTaskAreaChart}
                                                    series={this.state.companyVisitTaskAreaChart.series}
                                                    type="area"
                                                    height={350}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: 'calc(50% - 33.5px)',
                                                        border: 'solid rgba(0,0,0,0.2) 1px',
                                                        borderRadius: '0px 0px 4px 0px',
                                                        padding: '16px',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )

                                }
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div >
            );
        }
    }
}


export default StatisticsPage;
