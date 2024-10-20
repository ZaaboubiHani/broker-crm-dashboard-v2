import React, { Component } from "react";
import "../command-page/command-page.style.css";
import { DotSpinner } from "@uiball/loaders";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CommandModel from "../../../domain/models/command.model";
import UserModel from "../../../domain/models/user.model";
import UserService from "../../../data/services/user.service";
import CommandService from "../../../data/services/command.service";
import ClientModel from "../../../domain/models/client.model";
import { UserRole } from "../../../../../core/entities/user.entity";
import CustomTabPanel from "../../../../../core/components/custom-tab-panel/costum-tab-panel.component";
import UserDropdown from "../../../../../core/components/user-dropdown/user-dropdown";
import MonthYearPicker from "../../../../../core/components/month-year-picker/month-year-picker.component";
import CompoundBox, {
  RenderDirection,
} from "../../../../../core/components/compound-box/compound-box.component";
import CommandPanel from "../../../../../core/components/comand-panel/command-panel.component";
import ClientService from "../../../data/services/client.service";
import CommandDelegateTable from "../../components/command-delegate-table/command-delegate-table.component";
import CommandCamTable from "../../components/command-cam-table/command-cam-table.component";
import { CommandStatus } from "../../../../../core/entities/command.entity";

interface CommandPageProps {
  currentUser: UserModel;
}
interface CommandPageState {
  selectedDateDelegate: Date;
  selectedDateKam: Date;
  isLoading: boolean;
  loadingDelegates: boolean;
  showDialog: boolean;
  showSuppliersDialog: boolean;
  dialogMessage: string;
  loadingDelegateCommandsData: boolean;
  loadingKamCommandsData: boolean;
  delegateCommands: CommandModel[];
  kamCommands: CommandModel[];
  delegateCommandData?: CommandModel;
  kamCommandData?: CommandModel;
  delegateSearchText: string;
  kamSearchText: string;
  delegates: UserModel[];
  kams: UserModel[];
  supervisors: UserModel[];
  suppliers: ClientModel[];
  selectedSupervisor?: UserModel;
  selectedDelegate?: UserModel;
  selectedKam?: UserModel;
  loadingDelegateCommandData?: boolean;
  loadingKamCommandData?: boolean;
  index: number;

  totalDelegate: number;
  sizeDelegate: number;
  delegatePage: number;
  totalKam: number;
  sizeKam: number;
  kamPage: number;
  commandIndex: number;
}

class CommandPage extends Component<CommandPageProps, CommandPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      supervisors: [],
      selectedDateDelegate: new Date(),
      selectedDateKam: new Date(),
      delegateSearchText: "",
      kamSearchText: "",
      dialogMessage: "",
      loadingDelegates: false,
      isLoading: true,
      showDialog: false,
      loadingDelegateCommandsData: false,
      loadingKamCommandsData: false,
      delegateCommands: [],
      kamCommands: [],
      delegates: [],
      kams: [],
      index: 0,
      totalDelegate: 0,
      sizeDelegate: 100,
      delegatePage: 1,
      totalKam: 0,
      sizeKam: 100,
      kamPage: 1,
      suppliers: [],
      commandIndex: -1,
      showSuppliersDialog: false,
    };
  }

  userService = UserService.getInstance();
  commandService = CommandService.getInstance();
  clientService = ClientService.getInstance();

  handleCloseDialog = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showDialog: false });
  };

  handleSelectDelegate = async (delegate?: UserModel) => {
    this.setState({
      loadingDelegateCommandsData: true,
      delegateCommandData: undefined,
      delegatePage: 1,
    });
    var { commands: commands, total: total } =
      await this.commandService.getCommands(
        this.state.selectedDateDelegate,
        1,
        this.state.sizeDelegate,
        delegate?._id
      );
    this.setState({
      selectedDelegate: delegate,
      delegateCommands: commands,
      delegatePage: 1,
      totalDelegate: total,
      loadingDelegateCommandsData: false,
    });
  };

  handleSelectKam = async (kam?: UserModel) => {
    this.setState({
      loadingKamCommandsData: true,
      kamCommandData: undefined,
      kamPage: 1,
    });
    var { commands: commands, total: total } =
      await this.commandService.getCommands(
        this.state.selectedDateKam,
        1,
        this.state.sizeKam,
        kam!._id!
      );
    this.setState({
      selectedKam: kam,
      kamCommands: commands,
      kamPage: 1,
      totalKam: total,
      loadingKamCommandsData: false,
    });
  };

  handleOnPickDateDelegate = async (date: Date) => {
    this.setState({
      loadingDelegateCommandsData: true,
      delegateCommandData: undefined,
      delegatePage: 1,
    });
    var { commands: commands, total: total } =
      await this.commandService.getCommands(
        date,
        1,
        this.state.sizeDelegate,
        this.state.selectedDelegate!._id!
      );
    this.setState({
      selectedDateDelegate: date,
      delegateCommands: commands,
      delegatePage: 1,
      totalDelegate: total,
      loadingDelegateCommandsData: false,
    });
  };

  handleOnPickDateKam = async (date: Date) => {
    this.setState({
      loadingKamCommandsData: true,
      kamCommandData: undefined,
      kamPage: 1,
    });
    var { commands: commands, total: total } =
      await this.commandService.getCommands(
        date,
        1,
        this.state.sizeKam,
        this.state.selectedKam!._id!
      );
    this.setState({
      selectedDateKam: date,
      kamCommands: commands,
      kamPage: 1,
      totalKam: total,
      loadingKamCommandsData: false,
    });
  };

  loadCommandPageData = async () => {
    if (this.props.currentUser.role === UserRole.supervisor) {
      let delegates = await this.userService.getUsers();
      var suppliers = await this.clientService.getSuppliers();
      this.setState({
        delegates: delegates,
        suppliers: suppliers,
      });
    } else {
      let supervisors = await this.userService.getUsers([UserRole.supervisor]);
      let kams = await this.userService.getUsers([UserRole.kam]);
      var suppliers = await this.clientService.getSuppliers();
      this.setState({
        supervisors: supervisors,
        kams: kams,
        suppliers: suppliers,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  handleDisplayDelegateCommand = async (command: CommandModel) => {
    this.setState({ delegateCommandData: command });
  };

  handleDisplayKamCommand = async (command: CommandModel) => {
    this.setState({ kamCommandData: command });
  };

  handleHonorDelegateCommand = async (command: CommandModel) => {
    console.log(command);
    
    await this.commandService.updateCommandStatus(
      command.status ?? CommandStatus.onHold,
      command!._id!,
      command!.finalSupplier?._id
    );
    this.setState({
      showDialog: true,
      dialogMessage: "état de la commande changé",
    });
  };

  handleHonorKamCommand = async (command: CommandModel) => {
    await this.commandService.updateCommandStatus(
      command.status ?? CommandStatus.onHold,
      command!._id!,
      command!.finalSupplier?._id
    );
    this.setState({
      showDialog: true,
      dialogMessage: "état de la commande changé",
    });
  };

  handleSelectSupervisor = async (supervisor?: UserModel) => {
    this.setState({
      delegateCommandData: undefined,
      delegates: [],
      delegateCommands: [],
      loadingDelegates: true,
    });
    var delegates = await this.userService.getUsers(
      [UserRole.delegate],
      supervisor?._id
    );
    this.setState({
      selectedSupervisor: supervisor,
      loadingDelegates: false,
      delegates: delegates,
    });
  };

  handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ index: newValue });
  };

  handleDelegatePageChange = async (page: number, size: number) => {
    if (this.state.selectedDelegate) {
      this.setState({
        loadingDelegateCommandsData: true,
        delegateCommandData: undefined,
      });
      var { commands: commands, total: total } =
        await this.commandService.getCommands(
          this.state.selectedDateDelegate,
          page,
          size,
          this.state.selectedDelegate!._id!
        );
      this.setState({
        delegateCommands: commands,
        totalDelegate: total,
        loadingDelegateCommandsData: false,
      });
    }
    this.setState({
      delegatePage: page,
      loadingDelegateCommandsData: false,
      sizeDelegate: size,
    });
  };

  handleKamPageChange = async (page: number, size: number) => {
    if (this.state.selectedKam) {
      this.setState({
        loadingKamCommandsData: true,
        kamCommandData: undefined,
        sizeKam: size,
      });
      var { commands: commands, total: total } =
        await this.commandService.getCommands(
          this.state.selectedDateKam,
          page,
          size,
          this.state.selectedKam!._id!
        );
      this.setState({
        kamPage: page,
        kamCommands: commands,
        totalKam: total,
        loadingKamCommandsData: false,
        sizeKam: size,
      });
    }
    this.setState({
      kamPage: page,
      loadingKamCommandsData: false,
      sizeKam: size,
    });
  };

  handleShowSuppliersDialog = async (index: number) => {
    this.setState({
      commandIndex: index,
      showSuppliersDialog: true,
    });
  };

  componentDidMount(): void {
    if (localStorage.getItem("isLogged") === "true") {
      this.loadCommandPageData();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DotSpinner size={40} speed={0.9} color="black" />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "stretch",
            backgroundColor: "#eee",
          }}
        >
          <Box sx={{ width: "100%", height: "50px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={this.state.index}
                onChange={this.handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Délégués" />
                {this.props.currentUser.role !== UserRole.supervisor ? (
                  <Tab label="Kam" />
                ) : null}
              </Tabs>
            </Box>
          </Box>
          <CustomTabPanel value={this.state.index} index={0}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                height: "calc(100vh  - 65px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "stretch",
                  flexGrow: "1",
                  marginTop: "16px",
                }}
              >
                {this.props.currentUser.role !== UserRole.supervisor ? (
                  <div
                    style={{
                      height: "50px",
                      width: "150px",
                      margin: "0px 8px",
                    }}
                  >
                    <UserDropdown
                      users={this.state.supervisors}
                      selectedUser={this.state.selectedSupervisor}
                      onSelectUser={this.handleSelectSupervisor}
                      label="Superviseur"
                    />
                  </div>
                ) : null}
                <div
                  style={{ height: "50px", width: "150px", marginRight: "8px" }}
                >
                  <UserDropdown
                    users={this.state.delegates}
                    selectedUser={this.state.selectedDelegate}
                    onSelectUser={this.handleSelectDelegate}
                    label="Délégué"
                    loading={this.state.loadingDelegates}
                  />
                </div>
                <MonthYearPicker
                  initialDate={this.state.selectedDateDelegate}
                  onPick={this.handleOnPickDateDelegate}
                ></MonthYearPicker>
              </div>
              <div
                style={{
                  width: "100%",
                  flexGrow: "1",
                  display: "flex",
                  height: "calc(100% - 60px)",
                }}
              >
                <CompoundBox
                  direction={RenderDirection.horizontal}
                  flexes={[70, 30]}
                >
                  <CommandDelegateTable
                    id="command-delegate-table"
                    total={this.state.totalDelegate}
                    page={this.state.delegatePage}
                    size={this.state.sizeDelegate}
                    suppliers={this.state.suppliers}
                    pageChange={this.handleDelegatePageChange}
                    data={this.state.delegateCommands}
                    isLoading={this.state.loadingDelegateCommandsData}
                    displayCommand={this.handleDisplayDelegateCommand}
                    onHonor={this.handleHonorDelegateCommand}
                  ></CommandDelegateTable>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      margin: "0px 0px 8px",
                      borderRadius: "4px",
                      border: "1px solid rgba(127,127,127,0.2)",
                    }}
                  >
                    {this.state.loadingDelegateCommandData ? (
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          flexGrow: "1",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "all 300ms ease",
                        }}
                      >
                        <DotSpinner size={40} speed={0.9} color="black" />
                      </div>
                    ) : (
                      <CommandPanel
                        command={this.state.delegateCommandData}
                      ></CommandPanel>
                    )}
                  </div>
                </CompoundBox>
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={this.state.showDialog}
                autoHideDuration={3000}
                onClose={this.handleCloseDialog}
                message={this.state.dialogMessage}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={this.state.index} index={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                height: "calc(100vh  - 65px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "stretch",
                  flexGrow: "1",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{ height: "50px", width: "150px", margin: "0px 8px" }}
                >
                  <UserDropdown
                    users={this.state.kams}
                    selectedUser={this.state.selectedKam}
                    onSelectUser={this.handleSelectKam}
                    label="Kam"
                  />
                </div>
                <MonthYearPicker
                  initialDate={this.state.selectedDateKam}
                  onPick={this.handleOnPickDateKam}
                ></MonthYearPicker>
              </div>
              <div
                style={{
                  width: "100%",
                  flexGrow: "1",
                  display: "flex",
                  height: "calc(100% - 60px)",
                }}
                key={0}
              >
                <CompoundBox
                  direction={RenderDirection.horizontal}
                  flexes={[70, 30]}
                >
                  <CommandCamTable
                    id="command-cam-table"
                    total={this.state.totalKam}
                    page={this.state.kamPage}
                    size={this.state.sizeKam}
                    suppliers={this.state.suppliers}
                    pageChange={this.handleKamPageChange}
                    data={this.state.kamCommands}
                    onHonor={this.handleHonorKamCommand}
                    isLoading={this.state.loadingKamCommandsData}
                    displayCommand={this.handleDisplayKamCommand}
                  ></CommandCamTable>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.5)",
                      margin: "0px 0px 8px",
                      borderRadius: "4px",
                      border: "1px solid rgba(127,127,127,0.2)",
                    }}
                  >
                    {this.state.loadingKamCommandData ? (
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          flexGrow: "1",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "all 300ms ease",
                        }}
                      >
                        <DotSpinner size={40} speed={0.9} color="black" />
                      </div>
                    ) : (
                      <CommandPanel
                        command={this.state.kamCommandData}
                      ></CommandPanel>
                    )}
                  </div>
                </CompoundBox>
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={this.state.showDialog}
                autoHideDuration={3000}
                onClose={this.handleCloseDialog}
                message={this.state.dialogMessage}
              />
            </div>
          </CustomTabPanel>
        </div>
      );
    }
  }
}

export default CommandPage;
