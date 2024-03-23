import React, { Component } from 'react';
import '../task-page/task-page.style.css';
import { DotSpinner } from '@uiball/loaders'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Snackbar from '@mui/material/Snackbar';
import UserModel from '../../../domain/models/user.model';
import TaskModel from '../../../domain/models/task.model';
import UserService from '../../../data/services/user.service';
import TaskService from '../../../data/services/task.service';
import CustomTabPanel from '../../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import { UserRole } from '../../../../../core/entities/user.entity';
import UserDropdown from '../../../../../core/components/user-dropdown/user-dropdown';
import CompoundBox, { RenderDirection } from '../../../../../core/components/compound-box/compound-box.component';
import TaskTable from '../../components/task-table/task-table.component';
import TaskPanel from '../../components/task-panel/task-panel.component';
import MonthYearPicker from '../../../../../core/components/month-year-picker/month-year-picker.component';
import TaskCancelDialog from '../../components/task-cancel-dialog/task-cancel-dialog.component';

interface TaskPageProps {
    currentUser: UserModel;
}

interface TaskPageState {
    isLoading: boolean;
    index: number;
    selectedDate: Date,
    supervisors: UserModel[];
    delegates: UserModel[];
    kams: UserModel[];
    delegateTasks: TaskModel[];
    kamTasks: TaskModel[];
    selectedSupervisor?: UserModel;
    selectedDelegate?: UserModel;
    selectedKam?: UserModel;
    loadingDelegates: boolean;
    loadingTasks: boolean;
    delegateTotal: number;
    delegatePage: number;
    delegateSize: number;
    kamPage: number;
    kamTotal: number;
    kamSize: number;
    showSnackbar: boolean;
    snackbarMessage: string;
    delegateProp?: string;
    delegateOrder: boolean;
    kamProp?: string;
    kamOrder: boolean;
    showCancelDialog: boolean;
    selectedTask?: TaskModel;
    cancelMessage: string;
}

class TaskPage extends Component<TaskPageProps, TaskPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            isLoading: true,
            delegates: [],
            supervisors: [],
            kams: [],
            loadingDelegates: false,
            delegateTasks: [],
            kamTasks: [],
            loadingTasks: false,
            delegatePage: 1,
            delegateTotal: 0,
            delegateSize: 100,
            kamPage: 1,
            kamTotal: 0,
            kamSize: 100,
            showSnackbar: false,
            snackbarMessage: '',
            selectedDate: new Date(),
            delegateOrder: false,
            showCancelDialog: false,
            kamOrder: false,
            cancelMessage: '',
        }
    }

    userService = UserService.getInstance();
    taskService = TaskService.getInstance();


    loadTaskPageData = async () => {

        if (this.props.currentUser.role === UserRole.supervisor) {

            var delegates = await this.userService.getUsers();

            this.setState({
                isLoading: false,
                delegates: delegates,
            });

        } else if (this.props.currentUser.role === UserRole.admin) {
            var supervisors = await this.userService.getUsers([UserRole.supervisor], );
            var kams = await this.userService.getUsers([UserRole.kam],);

            this.setState({
                supervisors: supervisors,
                kams: kams,
                isLoading: false,

            });
        }

        this.setState({
            isLoading: false,
        });
    };

    handleSelectSupervisor = async (supervisor?: UserModel) => {
        this.setState({
            selectedSupervisor: supervisor,
            loadingDelegates: true,
            selectedDelegate: undefined,
            delegateTasks: [],
            delegatePage: 1
        });

        var delegates = await this.userService.getUsers([UserRole.delegate], supervisor!._id);
        this.setState({
            selectedSupervisor: supervisor,
            loadingDelegates: false,
            delegates: delegates,
        });
    }

    handleSelectDelegate = async (delegate?: UserModel) => {
        this.setState({
            selectedDelegate: delegate,
            loadingDelegates: true,
            loadingTasks: true,
            delegatePage: 1
        });
        var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, delegate!._id!, 1, this.state.delegateSize, this.state.delegateOrder, this.state.delegateProp);
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
            delegateTasks: tasks,
            delegateTotal: total,
        });
    }

    handleSelectKam = async (kam?: UserModel) => {
        this.setState({
            selectedKam: kam,
            loadingTasks: true,
            kamPage: 1
        });
        var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, kam!._id!, 1, this.state.kamSize, this.state.kamOrder, this.state.kamProp);
        this.setState({
            loadingTasks: false,
            kamTasks: tasks,
            kamTotal: total,
        });
    }

    handleDelegatePageChange = async (page: number, size: number) => {
        this.setState({
            delegatePage: page,
            delegateSize: size,
            loadingDelegates: true,
            loadingTasks: true,
        });

        if (this.state.selectedDelegate) {
            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedDelegate!._id!, page, size, this.state.delegateOrder, this.state.delegateProp);
            this.setState({
                delegateTasks: tasks,
                delegateTotal: total,
            });
        }
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }
    handleKamPageChange = async (page: number, size: number) => {
        this.setState({
            kamPage: page,
            kamSize: size,
            loadingDelegates: true,
            loadingTasks: true,
        });

        if (this.state.selectedKam) {
            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedKam!._id!, page, size, this.state.kamOrder, this.state.kamProp);
            this.setState({
                kamTasks: tasks,
                kamTotal: total,
            });
        }
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }

    handleCreateDelegateTask = async (task: TaskModel) => {
        this.setState({
            loadingTasks: true,
        });
        if (!task.action) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Action requis',
            })
        }
        else if (!task.task) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Tâche requis',
            })
        }
        else if (!task.region) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Région requis',
            })
        }
        else if (!task.assignerRemark) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Remarque requis',
            })
        } else if (!task.startDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Date de début requis',
            })
        } else if (!task.endDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Date de fin requis',
            })
        } else if (task.endDate <= task.startDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'La date de fin doit être postérieure à la date de début',
            });
        } else {
            task.target = this.state.selectedDelegate;
            let res = await this.taskService.createTask(task);
            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedDelegate!._id!, this.state.delegatePage, this.state.delegateSize, this.state.delegateOrder, this.state.delegateProp);
            this.setState({
                delegateTasks: tasks,
                delegateTotal: total,
            });
            if (res) {
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: 'Tâche ajoutée avec succès',
                });
            }
            else {
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: "Erreur lors de l'ajout de la tâche",
                });
            }
        }
        this.setState({
            loadingTasks: false,

        });
    }
    handleCreateKamTask = async (task: TaskModel) => {
        this.setState({
            loadingTasks: true,
        });
        if (!task.action) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Action requis',
            })
        }
        else if (!task.task) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Tâche requis',
            })
        }
        else if (!task.region) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Région requis',
            })
        }
        else if (!task.assignerRemark) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Remarque requis',
            })
        } else if (!task.startDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Date de début requis',
            })
        } else if (!task.endDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'champ Date de fin requis',
            })
        } else if (task.endDate <= task.startDate) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'La date de fin doit être postérieure à la date de début',
            });
        } else {
            task.target = this.state.selectedKam;
            let res = await this.taskService.createTask(task);
            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedKam!._id!, this.state.kamPage, this.state.kamSize, this.state.kamOrder, this.state.kamProp);
            this.setState({
                kamTasks: tasks,
                kamTotal: total,
            });
            if (res) {
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: 'Tâche ajoutée avec succès',
                });
            }
            else {
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: "Erreur lors de l'ajout de la tâche",
                });
            }
        }
        this.setState({
            loadingTasks: false,

        });
    }

    handleOnPickDate = async (date: Date) => {
        this.setState({
            selectedDate: date,
            loadingDelegates: true,
            loadingTasks: true,
            delegatePage: 1
        });
        if (this.state.selectedDelegate) {

            var { tasks, total } = await this.taskService.getTasks(date, this.state.selectedDelegate!._id!, 1, this.state.delegateSize, this.state.delegateOrder, this.state.delegateProp);
            this.setState({
                delegateTasks: tasks,
                delegateTotal: total,
            });
        }
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }

    handleDelegateSort = async (field: string, order: boolean) => {
        this.setState({
            delegateOrder: order,
            delegateProp: field,
            loadingDelegates: true,
            loadingTasks: true,
            delegatePage: 1
        });
        if (this.state.selectedDelegate) {

            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedDelegate!._id!, 1, this.state.delegateSize, order, field);
            this.setState({
                delegateTasks: tasks,
                delegateTotal: total,
            });
        }
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }
    handleKamSort = async (field: string, order: boolean) => {
        this.setState({
            kamOrder: order,
            kamProp: field,
            loadingTasks: true,
            kamPage: 1
        });
        if (this.state.selectedKam) {
            var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedKam!._id!, 1, this.state.kamSize, order, field);
            this.setState({
                kamTasks: tasks,
                kamTotal: total,
            });
        }
        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }
    handleCancelTask = async () => {
        this.setState({
            loadingDelegates: true,
            loadingTasks: true,
        });
        if (this.state.selectedTask) {
            var res = await this.taskService.cancelTask(this.state.selectedTask!._id!, this.state.cancelMessage);
            if (res) {
                var { tasks, total } = await this.taskService.getTasks(this.state.selectedDate, this.state.selectedDelegate!._id!, 1, this.state.delegateSize, this.state.delegateOrder, this.state.delegateProp);
                this.setState({
                    delegateTasks: tasks,
                    delegateTotal: total,
                    cancelMessage: '',
                    selectedTask: undefined,
                    showCancelDialog: false,
                });
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: "Tâche annulée avec succès"
                });
            } else {

                this.setState({
                    showSnackbar: true,
                    snackbarMessage: "Erreur lors de l'annulation de la tache"
                });
            }
        } else {
            this.setState({
                showSnackbar: true,
                snackbarMessage: "Tâche n'existe pas"
            });
        }


        this.setState({
            loadingDelegates: false,
            loadingTasks: false,
        });
    }

    handleCloseSanckbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        this.setState({ showSnackbar: false });
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadTaskPageData();
        }
    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ index: newValue, });
    };

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
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#eee' }}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={this.state.index} onChange={this.handleTabChange} aria-label="basic tabs example">
                                <Tab label="Superviseurs" />
                                {
                                    this.props.currentUser.role !== UserRole.supervisor ? (<Tab label="Kams" />) : null
                                }
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={this.state.index} index={0} >
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 65px)', width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'stretch',
                                    marginTop: '8px',
                                    marginBottom: '8px',
                                    height: '50px',
                                }}>
                                    {
                                        this.props.currentUser.role === UserRole.admin ?
                                            (<div style={{ height: '50px', width: '150px', marginRight: '8px' }}>
                                                <UserDropdown
                                                    users={this.state.supervisors}
                                                    selectedUser={this.state.selectedSupervisor}
                                                    onSelectUser={this.handleSelectSupervisor}
                                                    label='Superviseur'
                                                />
                                            </div>) : null
                                    }
                                    <div style={{ height: '50px', width: '150px', }}>
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
                                    flex: '1',
                                    display: 'flex',
                                    flexGrow: '1',
                                }}>
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <TaskTable
                                            id='task-table'
                                            data={this.state.delegateTasks}
                                            isLoading={this.state.loadingTasks}
                                            page={this.state.delegatePage}
                                            size={this.state.delegateSize}
                                            total={this.state.delegateTotal}
                                            pageChange={this.handleDelegatePageChange}
                                            sorting={{ field: this.state.delegateProp ?? '', order: this.state.delegateOrder }}
                                            sortChange={this.handleDelegateSort}
                                            cancel={(task) => {
                                                this.setState({
                                                    showCancelDialog: true,
                                                    selectedTask: task,
                                                });
                                            }}
                                        ></TaskTable>
                                        <TaskPanel
                                            disabled={this.state.selectedDelegate === undefined}
                                            onCreateTask={this.handleCreateDelegateTask}
                                        ></TaskPanel>
                                    </CompoundBox>
                                </div>
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    onClose={this.handleCloseSanckbar} open={this.state.showSnackbar} autoHideDuration={3000} message={this.state.snackbarMessage} />
                                <TaskCancelDialog onClose={() => {
                                    this.setState({ showCancelDialog: false, selectedTask: undefined, });
                                }}
                                    onNo={() => {
                                        this.setState({ showCancelDialog: false, selectedTask: undefined, });
                                    }}
                                    onYes={this.handleCancelTask}
                                    onMessageChange={(msg) => {
                                        this.setState({ cancelMessage: msg });
                                    }}
                                    isOpen={this.state.showCancelDialog}
                                    message='Êtes-vous sûr de vouloir annuler cette tâche ?'></TaskCancelDialog>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={this.state.index} index={1} >
                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: 'calc(100vh  - 65px)', width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'stretch',
                                    marginTop: '8px',
                                    marginBottom: '8px',
                                    height: '50px',
                                }}>

                                    <div style={{ height: '50px', width: '150px', }}>
                                        <UserDropdown
                                            users={this.state.kams}
                                            selectedUser={this.state.selectedKam}
                                            onSelectUser={this.handleSelectKam}
                                            label='kam'
                                        />
                                    </div>
                                    <MonthYearPicker onPick={this.handleOnPickDate}></MonthYearPicker >
                                </div>
                                <div style={{
                                    flex: '1',
                                    display: 'flex',
                                    flexGrow: '1',
                                }}>
                                    <CompoundBox
                                        direction={RenderDirection.horizontal}
                                        flexes={[70, 30]}
                                    >
                                        <TaskTable
                                            id='task-table'
                                            data={this.state.kamTasks}
                                            isLoading={this.state.loadingTasks}
                                            page={this.state.kamPage}
                                            size={this.state.kamSize}
                                            total={this.state.kamTotal}
                                            pageChange={this.handleKamPageChange}
                                            sorting={{ field: this.state.kamProp ?? '', order: this.state.kamOrder }}
                                            sortChange={this.handleKamSort}
                                            cancel={(task) => {
                                                this.setState({
                                                    showCancelDialog: true,
                                                    selectedTask: task,
                                                });
                                            }}
                                        ></TaskTable>
                                        <TaskPanel
                                            disabled={this.state.selectedKam === undefined}
                                            onCreateTask={this.handleCreateKamTask}
                                        ></TaskPanel>
                                    </CompoundBox>
                                </div>
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    onClose={this.handleCloseSanckbar}
                                    open={this.state.showSnackbar}
                                    autoHideDuration={3000}
                                    message={this.state.snackbarMessage} />
                                <TaskCancelDialog onClose={() => {
                                    this.setState({ showCancelDialog: false, selectedTask: undefined, });
                                }}
                                    onNo={() => {
                                        this.setState({ showCancelDialog: false, selectedTask: undefined, });
                                    }}
                                    onYes={this.handleCancelTask}
                                    onMessageChange={(msg) => {
                                        this.setState({ cancelMessage: msg });
                                    }}
                                    isOpen={this.state.showCancelDialog}
                                    message='Êtes-vous sûr de vouloir annuler cette tâche ?'></TaskCancelDialog>
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
            );
        }
    }
}



export default TaskPage;

