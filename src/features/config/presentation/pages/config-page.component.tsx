import React, { Component } from 'react';
import '../../presentation/pages/config-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import Button from '@mui/material/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider/Divider';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import Table from '@mui/material/Table/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Snackbar from '@mui/material/Snackbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserModel from '../../domain/models/user.model';
import SpecialityModel from '../../domain/models/speciality.model';
import MotivationModel from '../../domain/models/motivation.model';
import CommentModel from '../../domain/models/comment.model';
import ClientModel from '../../domain/models/client.model';
import CoProductModel from '../../domain/models/co-product.model';
import ProductModel from '../../domain/models/product.model';
import WilayaModel from '../../domain/models/wilaya.model';
import GoalModel from '../../domain/models/goal.model';
import ExpensesConfigModel from '../../domain/models/expenses-config.model';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import CustomTabPanel from '../../../../core/components/custom-tab-panel/costum-tab-panel.component';
import SpecialityTable from '../components/speciality-table/speciality-table.component';
import CommentTable from '../components/comment-table/comment-table.component';
import MotivationTable from '../components/motivation-table/motivation-table.component';
import SupplierTable from '../components/supplier-table/supplier-table.component';
import { UserRole } from '../../../../core/entities/user.entity';
import YesNoDialog from '../../../../core/components/yes-no-dialog/yes-no-dialog.component';
import CommentPanel from '../components/comment-panel/comment-panel.component';
import FileService from '../../data/services/file.service';
import CompanyModel from '../../domain/models/company.model';
import CompanyService from '../../data/services/company.service';
import CompanyPanel from '../components/company-panel/company-panel.component';
import PdfPreview from '../components/pdf-preview/pdf-preview.component';
import ExpensesConfigService from '../../data/services/expenses-config.service';
import MotivationPanel from '../components/motivation-panel/motivation-panel.component';
import CommentService from '../../data/services/comment.service';
import MotivationService from '../../data/services/motivation.service';

interface ConfigPageProps {
    currentUser: UserModel;
}

interface ConfigPageState {
    company: CompanyModel;
    isLoading: boolean;
    specialityName: string;
    loadingSpecialitiesData: boolean;
    medicalSpecialities: SpecialityModel[];
    draftedMedicalSpecialities: SpecialityModel[];
    loadingCommentsData: boolean;
    motivations: MotivationModel[];
    draftedMotivations: MotivationModel[];
    loadingMotivationsData: boolean;
    comments: CommentModel[];
    draftedComments: CommentModel[];
    supplier: ClientModel;
    product: ProductModel;
    coproduct: CoProductModel;
    suppliers: ClientModel[];
    draftedSuppliers: ClientModel[];
    products: ProductModel[];
    coproducts: CoProductModel[];
    draftedProducts: ProductModel[];
    draftedCoProducts: CoProductModel[];
    loadingSuppliersData: boolean;
    loadingProductsData: boolean;
    wilayas: WilayaModel[];
    goals: GoalModel[];
    selectedWilaya?: WilayaModel;
    expensesConfig: ExpensesConfigModel;
    showSnackbar: boolean;
    showDeleteSpecialityDialog: boolean;
    showRestoreSpecialityDialog: boolean;
    showDeleteCommentDialog: boolean;
    showRestoreCommentDialog: boolean;
    showDeleteMotivationDialog: boolean;
    showRestoreMotivationDialog: boolean;
    showDeleteSupplierDialog: boolean;
    showRestoreCoProductDialog: boolean;
    showRestoreSupplierDialog: boolean;
    showDeleteProductDialog: boolean;
    loadingCoProductsData: boolean;
    showRestoreProductDialog: boolean;
    showDeleteCoProductDialog: boolean;
    savingCompanyChanges: boolean;
    snackbarMessage: string;
    selectedSpecialityId?: string;
    selectedCommentId?: string;
    selectedMotivationId?: string;
    selectedSupplierId?: string;
    selectedProductId?: string;
    selectedCoProductId?: string;
    supplierPage: number;
    supplierSize: number;
    suppliersTotal: number;
    mainTabindex: number;
    subTabindex: number;
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values: any) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix="DA "
            />
        );
    },
);

class ConfigPage extends Component<ConfigPageProps, ConfigPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            specialityName: '',
            loadingSpecialitiesData: false,
            medicalSpecialities: [],
            draftedMedicalSpecialities: [],
            draftedProducts: [],
            draftedSuppliers: [],
            loadingCommentsData: false,
            comments: [],
            draftedComments: [],
            draftedMotivations: [],
            loadingMotivationsData: false,
            motivations: [],
            supplier: new ClientModel({}),
            product: new ProductModel({}),
            company: new CompanyModel({}),
            coproduct: new CoProductModel({}),
            suppliers: [],
            loadingSuppliersData: false,
            loadingProductsData: false,
            loadingCoProductsData: false,
            savingCompanyChanges: false,
            wilayas: [],
            products: [],
            coproducts: [],
            draftedCoProducts: [],
            expensesConfig: new ExpensesConfigModel({}),
            goals: [],
            showSnackbar: false,
            supplierPage: 1,
            supplierSize: 25,
            suppliersTotal: 0,
            showDeleteSpecialityDialog: false,
            showRestoreSpecialityDialog: false,
            showDeleteCoProductDialog: false,
            showDeleteCommentDialog: false,
            showRestoreCommentDialog: false,
            showDeleteMotivationDialog: false,
            showRestoreMotivationDialog: false,
            showDeleteSupplierDialog: false,
            showRestoreProductDialog: false,
            showRestoreCoProductDialog: false,
            showRestoreSupplierDialog: false,
            showDeleteProductDialog: false,
            snackbarMessage: '',
            mainTabindex: 0,
            subTabindex: 0,
        }
    }
    fileService = FileService.getInstance();
    companyService = CompanyService.getInstance();
    expensesConfigService = ExpensesConfigService.getInstance();
    // specialityService = SpecialityService.getInstance();
    commentService = CommentService.getInstance();
    motivationService = MotivationService.getInstance();
    // supplierService = SupplierService.getInstance();
    // wilayaService = WilayaService.getInstance();
    // expenseService = ExpenseService.getInstance();
    // goalService = GoalService.getInstance();
    // userService = UserService.getInstance();
    // productService = ProductService.getInstance();

    loadConfigPageData = async () => {
        let company = await this.companyService.getSingleCompany();
        let expensesConfig = await this.expensesConfigService.getSingleExpensesConfig();
        let comments = await this.commentService.getAllComments();
        let motivations = await this.motivationService.getAllMotivations();
        this.setState({
            company: company,
            expensesConfig: expensesConfig,
            comments: comments,
            motivations: motivations,
        });
        // var { specialities, total: specialitiesTotal } = await this.specialityService.getAllMedicalSpecialities(this.state.specialityPage, this.state.specialitySize);
        // var draftedSpecialities = await this.specialityService.getAllDraftedMedicalSpecialities();
        // var { comments: comments, total: commentsTotal } = await this.commentService.getAllComments(this.state.commentPage, this.state.commentSize);
        // var draftedComments = await this.commentService.getDraftedComments();
        // var { motivations: motivations, total: motivationsTotal } = await this.motivationService.getAllMotivations(this.state.motivationPage, this.state.motivationSize);
        // var draftedMotivations = await this.motivationService.getAllDraftedMotivations();
        // var { suppliers: suppliers, total: suppliersTotal } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
        // var draftedSuppliers = await this.supplierService.getAllDraftedSuppliers();
        // var wilayas = await this.wilayaService.getAllWilayas();
        // var expensesConfig = await this.expenseService.getExpensesConfig();
        // var currentUser = await this.userService.getMe();
        // var goals = await this.goalService.getAllGoalsOfUserByDateMoth(new Date(), currentUser.id!);
        // var products = await this.productService.getAllProducts();
        // var draftedProducts = await this.productService.getAllDraftedProducts();
        // var coproducts = await this.productService.getAllCoProducts();
        // var draftedCoProducts = await this.productService.getAllDraftedCoProducts();
        // if (!expensesConfig) {
        //     expensesConfig = await this.expenseService.createExpensesConfig();
        // }
        // this.setState({
        //     currentUser: currentUser,
        //     specialitiesTotal: specialitiesTotal,
        //     isLoading: false,
        //     suppliersTotal: suppliersTotal,
        //     medicalSpecialities: specialities,
        //     draftedComments: draftedComments,
        //     draftedMotivations: draftedMotivations,
        //     draftedMedicalSpecialities: draftedSpecialities,
        //     draftedProducts: draftedProducts,
        //     draftedSuppliers: draftedSuppliers,
        //     motivations: motivations,
        //     motivationsTotal: motivationsTotal,
        //     comments: comments,
        //     commentsTotal: commentsTotal,
        //     suppliers: suppliers,
        //     wilayas: wilayas,
        //     expensesConfig: expensesConfig!,
        //     goals: goals,
        //     products: products,
        //     coproducts: coproducts,
        //     draftedCoProducts: draftedCoProducts,
        // });
        this.setState({
            isLoading: false,
        });

    }

    handleRemoveSpeciality = async () => {
        // this.setState({ loadingSpecialitiesData: true, showDeleteSpecialityDialog: false });
        // await this.specialityService.draftMedicalSpeciality(this.state.selectedSpecialityId);
        // var { specialities, total: specialitiesTotal } = await this.specialityService.getAllMedicalSpecialities(this.state.specialityPage, this.state.specialitySize);
        // var draftedSpecialities = await this.specialityService.getAllDraftedMedicalSpecialities();
        // this.setState({
        //     loadingSpecialitiesData: false,
        //     medicalSpecialities: specialities,
        //     draftedMedicalSpecialities: draftedSpecialities,
        // });
        // this.setState({
        //     showSnackbar: true,
        //     snackbarMessage: 'Spécialité supprimé',
        // });
    }

    handleRestoreSpeciality = async () => {
        // this.setState({ loadingSpecialitiesData: true, showRestoreSpecialityDialog: false });
        // await this.specialityService.publishMedicalSpeciality(this.state.selectedSpecialityId);
        // var { specialities, total: specialitiesTotal } = await this.specialityService.getAllMedicalSpecialities(this.state.specialityPage, this.state.specialitySize);
        // var draftedSpecialities = await this.specialityService.getAllDraftedMedicalSpecialities();
        // this.setState({
        //     loadingSpecialitiesData: false,
        //     medicalSpecialities: specialities,
        //     specialitiesTotal: specialitiesTotal,
        //     draftedMedicalSpecialities: draftedSpecialities
        // });
        // this.setState({
        //     showSnackbar: true,
        //     snackbarMessage: 'Spécialité restauré'
        // });
    }

    handleCreateSpeciality = async () => {
        // this.setState({ loadingSpecialitiesData: true });
        // await this.specialityService.createMedicalSpeciality(this.state.specialityName);
        // var { specialities, total: specialitiesTotal } = await this.specialityService.getAllMedicalSpecialities(this.state.specialityPage, this.state.specialitySize);
        // this.setState({
        //     loadingSpecialitiesData: false,
        //     medicalSpecialities: specialities,
        //     specialitiesTotal: specialitiesTotal,
        //     specialityName: '',
        // });
        // this.setState({
        //     showSnackbar: true,
        //     snackbarMessage: 'Spécialité créé',
        // });
    }

    handleSpecialityPageChange = async (page: number, size: number) => {
        // this.setState({ loadingSpecialitiesData: true });
        // var { specialities, total: specialitiesTotal } = await this.specialityService.getAllMedicalSpecialities(page, size);
        // this.setState({
        //     loadingSpecialitiesData: false,
        //     specialitiesTotal: specialitiesTotal,
        //     medicalSpecialities: specialities,
        //     specialityPage: page,
        //     specialitySize: size,
        // });
    }



    handleSupplierPageChange = async (page: number, size: number) => {
        // this.setState({ loadingSuppliersData: true });
        // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(page, size);
        // this.setState({
        //     loadingSuppliersData: false,
        //     suppliersTotal: total,
        //     suppliers: suppliers,
        //     supplierPage: page,
        //     supplierSize: size,
        // });
    }

    handleSpecialityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ specialityName: event.target.value });
    }

    handleRemoveComment = async () => {
        // this.setState({ loadingCommentsData: true, showDeleteCommentDialog: false });
        // await this.commentService.draftComment(this.state.selectedCommentId);
        // var { comments, total } = await this.commentService.getAllComments(this.state.commentPage, this.state.commentSize);
        // var draftedComments = await this.commentService.getDraftedComments();
        // this.setState({ loadingCommentsData: false, comments: comments, commentsTotal: total, draftedComments: draftedComments });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Commentaire supprimé' });
    }

    handleRestoreComment = async () => {
        // this.setState({ loadingCommentsData: true, showRestoreCommentDialog: false });
        // if (this.state.comments.length < 5) {
        //     await this.commentService.publishComment(this.state.selectedCommentId);
        //     var { comments, total } = await this.commentService.getAllComments(this.state.commentPage, this.state.commentSize);
        //     var draftedComments = await this.commentService.getDraftedComments();
        //     this.setState({ loadingCommentsData: false, comments: comments, commentsTotal: total, draftedComments: draftedComments });
        //     this.setState({ showSnackbar: true, snackbarMessage: 'Commentaire restauré' });
        // } else {
        //     var { comments, total } = await this.commentService.getAllComments(this.state.commentPage, this.state.commentSize);
        //     var draftedComments = await this.commentService.getDraftedComments();
        //     this.setState({ loadingCommentsData: false, comments: comments, commentsTotal: total, draftedComments: draftedComments });
        //     this.setState({ showSnackbar: true, snackbarMessage: 'Nombre de commentaires dépassés, veuillez supprimer un commentaire puis réessayer' });
        // }
    }

    handleCreateComment = async (content: string) => {
        this.setState({ loadingCommentsData: true });
        await this.commentService.createComment(content);
        var comments = await this.commentService.getAllComments();
        this.setState({
            loadingCommentsData: false,
            comments: comments,
        });
        this.setState({
            showSnackbar: true,
            snackbarMessage: 'Commentaire créé'
        });
    }



    handleRemoveMotivation = async () => {
        this.setState({ loadingMotivationsData: true, showDeleteMotivationDialog: false });
        await this.motivationService.draftMotivation(this.state.selectedMotivationId!);
        var motivations = await this.motivationService.getAllMotivations();
        var draftedMotivations = await this.motivationService.getAllDraftedMotivations();
        this.setState({
            loadingMotivationsData: false,
            motivations: motivations,
            draftedMotivations: draftedMotivations
        });
        this.setState({ showSnackbar: true, snackbarMessage: 'Motivation supprimé' });
    }

    handleRestoreMotivation = async () => {
        // this.setState({ loadingMotivationsData: true, showRestoreMotivationDialog: false });
        // await this.motivationService.publishMotivation(this.state.selectedMotivationId);
        // var { motivations, total } = await this.motivationService.getAllMotivations(this.state.motivationPage, this.state.motivationSize);
        // var draftedMotivations = await this.motivationService.getAllDraftedMotivations();
        // this.setState({ loadingMotivationsData: false, motivations: motivations, motivationsTotal: total, draftedMotivations: draftedMotivations });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Motivation restauré' });
    }

    handleCreateMotivation = async (content: string) => {
        this.setState({ loadingMotivationsData: true });
        await this.motivationService.createMotivation(content);
        var motivations = await this.motivationService.getAllMotivations();
        this.setState({
            loadingMotivationsData: false,
            motivations: motivations,
        });
        this.setState({
            showSnackbar: true,
            snackbarMessage: 'Motivation créé'
        });
    }



    handleCreateSupplier = async () => {
        // this.setState({ loadingSuppliersData: true });
        // await this.supplierService.createSupplier(this.state.supplier);
        // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
        // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, supplier: new SupplierModel({}) });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur créé' });
    }

    handleCreateProduct = async () => {
        // this.setState({ loadingProductsData: true });
        // await this.productService.createProduct(this.state.product);
        // var prodcts = await this.productService.getAllProducts();
        // this.setState({ loadingProductsData: false, products: prodcts, product: new ProductModel({}) });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit créé' });
    }

    handleCreateCoProduct = async () => {
        // this.setState({ loadingCoProductsData: true });
        // await this.productService.createCoProduct(this.state.coproduct);
        // var coprodcts = await this.productService.getAllCoProducts();
        // this.setState({ loadingCoProductsData: false, coproducts: coprodcts, coproduct: new ProductModel({}) });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit concurrent créé' });
    }

    handleRemoveSupplier = async () => {
        // this.setState({ loadingSuppliersData: true, showDeleteSupplierDialog: false });
        // await this.supplierService.draftSupplier(this.state.selectedSupplierId);
        // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
        // var draftedSuppliers = await this.supplierService.getAllDraftedSuppliers();
        // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, draftedSuppliers: draftedSuppliers });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur supprimé' });
    }

    handleRestoreSupplier = async () => {
        // this.setState({ loadingSuppliersData: true, showRestoreSupplierDialog: false });
        // await this.supplierService.publishSupplier(this.state.selectedSupplierId);
        // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
        // var draftedSuppliers = await this.supplierService.getAllDraftedSuppliers();
        // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, draftedSuppliers: draftedSuppliers });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur restauré' });
    }

    handleRemoveProduct = async () => {
        // this.setState({ loadingProductsData: true, showDeleteProductDialog: false });
        // await this.productService.draftProduct(this.state.selectedProductId);
        // var products = await this.productService.getAllProducts();
        // var draftedProducts = await this.productService.getAllDraftedProducts();
        // this.setState({ loadingProductsData: false, products: products, draftedProducts: draftedProducts });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit supprimé' });
    }

    handleRemoveCoProduct = async () => {
        // this.setState({ loadingCoProductsData: true, showDeleteCoProductDialog: false });
        // await this.productService.draftCoProduct(this.state.selectedCoProductId);
        // var coproducts = await this.productService.getAllCoProducts();
        // var draftedCoProducts = await this.productService.getAllDraftedCoProducts();
        // this.setState({ loadingCoProductsData: false, coproducts: coproducts, draftedCoProducts: draftedCoProducts });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit concurrent supprimé' });
    }

    handleRestoreProduct = async () => {
        // this.setState({ loadingProductsData: true, showRestoreProductDialog: false });
        // await this.productService.publishProduct(this.state.selectedProductId);
        // var products = await this.productService.getAllProducts();
        // var draftedProducts = await this.productService.getAllDraftedProducts();
        // this.setState({ loadingProductsData: false, products: products, draftedProducts: draftedProducts });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit restauré' });
    }
    handleRestoreCoProduct = async () => {
        // this.setState({ loadingCoProductsData: true, showRestoreCoProductDialog: false });
        // await this.productService.publishCoProduct(this.state.selectedCoProductId);
        // var coproducts = await this.productService.getAllCoProducts();
        // var draftedCoProducts = await this.productService.getAllDraftedCoProducts();
        // this.setState({ loadingCoProductsData: false, coproducts: coproducts, draftedCoProducts: draftedCoProducts });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit concurrent restauré' });
    }

    handleSaveGoalsChange = async () => {
        // for (var goal of this.state.goals) {
        //     await this.goalService.updateGoal(goal);
        // }
        // this.setState({ showSnackbar: true, snackbarMessage: 'Modifications d\'objectifs enregistrées' });
    }

    handleCloseSanckbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        this.setState({ showSnackbar: false });
    };

    handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ mainTabindex: newValue });
    };
    handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ subTabindex: newValue });
    };

    handleSaveChanges = async (company: CompanyModel, expensesConfig: ExpensesConfigModel) => {
        this.setState({ savingCompanyChanges: true });
        if (company.file) {
            let fileId = await this.fileService.uploadFile(company.file);
            company.logo = { _id: fileId, url: '' };
        }
        let newCompany = await this.companyService.updateCompany(company);
        let newExpensesConfig = await this.expensesConfigService.updateExpensesConfig(expensesConfig);
        this.setState({
            company: newCompany,
            expensesConfig: newExpensesConfig,
            savingCompanyChanges: false,
        });
    };

    componentDidMount(): void {
        if (localStorage.getItem('isLogged') === 'true') {
            this.loadConfigPageData();
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', backgroundColor: '#eee', height: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={this.state.mainTabindex} onChange={this.handleMainTabChange} aria-label="basic tabs example">
                                <Tab label="Configuration" />
                                <Tab label="Corbeille" />
                            </Tabs>
                        </Box>
                        <CustomTabPanel style={{
                            display: 'flex',
                            flexFlow: 'column',
                            height: 'calc(100% - 50px)',
                        }} value={this.state.mainTabindex} index={0} >
                            <Box sx={{
                                flex: '1 1 auto',
                            }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={this.state.subTabindex} onChange={this.handleSubTabChange} aria-label="basic tabs example">
                                        <Tab label="Entreprise" />
                                        <Tab label="Produits" />
                                        <Tab label="Fournisseurs" />
                                        <Tab label="Commentaires et Motivations" />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel style={{
                                    flex: '1 1 auto',
                                    height: 'calc(100% - 50px)',
                                }}
                                    value={this.state.subTabindex}
                                    index={0} >
                                    {
                                        this.state.savingCompanyChanges ? (<div style={{
                                            width: '100%',
                                            height: '80vh',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <DotSpinner
                                                size={40}
                                                speed={0.9}
                                                color="black"
                                            />
                                        </div>) :
                                            (
                                                <div style={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    marginTop: '8px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        width: '50%',
                                                    }}>
                                                        <CompanyPanel
                                                            company={this.state.company}
                                                            expensesConfig={this.state.expensesConfig}
                                                            saveChanges={this.handleSaveChanges}
                                                        ></CompanyPanel>
                                                    </div>
                                                    <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                                    <div style={{
                                                        display: 'flex',
                                                        width: '50%',
                                                    }}>
                                                        <PdfPreview company={this.state.company}></PdfPreview>
                                                    </div>
                                                </div>)
                                    }
                                </CustomTabPanel>
                                <CustomTabPanel style={{

                                    flex: '1 1 auto',
                                }} value={this.state.subTabindex} index={1} >
                                    <div className='config-container'>

                                        <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />

                                        <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                        <div style={{ width: '100%', display: 'flex', maxHeight: '450px' }}>
                                            <div style={{ width: '40%', margin: '8px 0px 8px 8px', backgroundColor: 'white', borderRadius: '4px', padding: '16px' }}>
                                                <h4>
                                                    Configuration des produits
                                                </h4>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.product.name} onChange={(event) => {
                                                        this.state.product.name = event.target.value;
                                                    }} size="small" id="outlined-basic" label="Nom de produit" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                    <TextField
                                                        value={this.state.product.ug}
                                                        onChange={(event) => {
                                                            this.state.product.ug = Number(event.target.value) ?? 0.0;
                                                        }}
                                                        type='number'
                                                        size="small"
                                                        label="UG"
                                                        variant="outlined"
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            borderRadius: '4px',
                                                            height: '40px',
                                                            flexGrow: '1'
                                                        }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.product.remise} onChange={(event) => {
                                                        this.state.product.remise = Number(event.target.value) ?? 0.0;
                                                    }} type='number' size="small" id="outlined-basic" label="Remise" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />

                                                    <TextField
                                                        value={this.state.product.wholesalerPriceUnit} onChange={(event) => {
                                                            this.state.product.wholesalerPriceUnit = Number(event.target.value) ?? 0;
                                                        }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }}
                                                        size="small"
                                                        label="Grossiste prix unitaire"
                                                        variant="outlined"
                                                        sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.product.pharmacyPriceUnit} onChange={(event) => {
                                                        this.state.product.pharmacyPriceUnit = Number(event.target.value) ?? 0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }}
                                                        size="small" id="outlined-basic" label="Pharmacie prix unitaire" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />

                                                    <TextField value={this.state.product.superWholesalerPriceUnit} onChange={(event) => {
                                                        this.state.product.superWholesalerPriceUnit = Number(event.target.value) ?? 0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }}
                                                        size="small" label="Super grossiste prix unitaire" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px 0px' }}>
                                                    <TextField value={this.state.product.collision} onChange={(event) => {
                                                        this.state.product.collision = Number(event.target.value) ?? 0;
                                                    }} type='number' size="small" id="outlined-basic" label="Collisage" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                    <TextField value={this.state.product.collision} onChange={(event) => {
                                                        this.state.product.PPA = Number(event.target.value) ?? 0.0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }}
                                                        size="small" id="outlined-basic" label="PPA" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '16px 0px 16px 0px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker value={this.state.product.DDP} onChange={(date) => {
                                                            this.state.product.DDP = new Date(date!.toString());
                                                        }} label="DDP" />
                                                    </LocalizationProvider>
                                                    <Button onClick={() => this.handleCreateProduct()} startIcon={<AddIcon />} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', marginLeft: '16px' }}>
                                                        Ajouter
                                                    </Button>
                                                </div>
                                            </div>
                                            <div style={{ width: '60%', display: 'flex', flexGrow: '1', padding: '8px 8px 0px 8px', marginBottom: '8px', maxHeight: '400px' }}>
                                                <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                                    <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                        <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                            <TableCell sx={{ width: '50%' }} align="left">Nom de fournisseur</TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="left"> UG </TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="left">Prix grossiste</TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="right">Supprimer</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                        {
                                                            this.state.loadingProductsData ? (<div style={{
                                                                width: '100%',
                                                                flexGrow: '1',
                                                                overflow: 'hidden',
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
                                                            </div>) :
                                                                this.state.products.map((row) => (
                                                                    <TableRow
                                                                        key={row._id}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell sx={{ width: '32%' }} align="left">{row.name}</TableCell>
                                                                        <TableCell sx={{ width: '32%' }} align="left">{row.ug}</TableCell>
                                                                        <TableCell sx={{ width: '50%' }} align="left">{row.wholesalerPriceUnit}</TableCell>
                                                                        <TableCell sx={{ padding: '0px 16px 0px 0px' }} align="right">
                                                                            <IconButton onClick={() => {
                                                                                this.setState({ showDeleteProductDialog: true, selectedProductId: row._id! });
                                                                            }} >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                        <div style={{ width: '100%', display: 'flex', maxHeight: '450px' }}>
                                            <div style={{ width: '40%', margin: '8px 0px 8px 8px', backgroundColor: 'white', borderRadius: '4px', padding: '16px' }}>
                                                <h4>
                                                    Configuration des produits concurrents
                                                </h4>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.coproduct.name} onChange={(event) => {
                                                        this.state.coproduct.name = event.target.value;
                                                    }} size="small" id="outlined-basic" label="Nom de produit" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                    <TextField value={this.state.coproduct.ug} onChange={(event) => {
                                                        this.state.coproduct.ug = parseInt(event.target.value);
                                                    }} type='number' size="small" label="UG" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.coproduct.remise} onChange={(event) => {
                                                        this.state.coproduct.remise = parseInt(event.target.value);
                                                    }} type='number' size="small" id="outlined-basic" label="Remise" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />

                                                    <TextField value={this.state.coproduct.wholesalerPriceUnit} onChange={(event) => {
                                                        this.state.coproduct.wholesalerPriceUnit = Number(event.target.value) ?? 0.0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }}
                                                        size="small" label="Grossiste prix unitaire" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                    <TextField value={this.state.coproduct.pharmacyPriceUnit} onChange={(event) => {
                                                        this.state.coproduct.pharmacyPriceUnit = Number(event.target.value) ?? 0.0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }} size="small" id="outlined-basic" label="Pharmacie prix unitaire" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />

                                                    <TextField value={this.state.coproduct.superWholesalerPriceUnit} onChange={(event) => {
                                                        this.state.coproduct.superWholesalerPriceUnit = Number(event.target.value) ?? 0.0;
                                                    }}
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom as any,
                                                        }} size="small" label="Super grossiste prix unitaire" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                </div>
                                                <div style={{ display: 'flex', margin: '8px 0px 0px' }}>
                                                    <TextField value={this.state.coproduct.collision} onChange={(event) => {
                                                        this.state.coproduct.collision = parseInt(event.target.value);
                                                    }} type='number' size="small" id="outlined-basic" label="Collisage" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />


                                                </div>
                                                <div style={{ display: 'flex', margin: '16px 0px 16px 0px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker value={this.state.coproduct.DDP} onChange={(date) => {
                                                            this.state.coproduct.DDP = date ?? undefined;
                                                        }} label="DDP" />
                                                    </LocalizationProvider>
                                                    <Button onClick={() => this.handleCreateCoProduct()} startIcon={<AddIcon />} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', marginLeft: '16px' }}>
                                                        Ajouter
                                                    </Button>
                                                </div>
                                            </div>
                                            <div style={{ width: '60%', display: 'flex', flexGrow: '1', padding: '8px 8px 0px 8px', marginBottom: '8px', maxHeight: '400px' }}>
                                                <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                                    <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                        <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                            <TableCell sx={{ width: '50%' }} align="left">Nom de fournisseur</TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="left">
                                                                UG
                                                            </TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="left">Prix grossiste</TableCell>
                                                            <TableCell sx={{ width: '50%' }} align="right">Supprimer</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                        {
                                                            this.state.loadingCoProductsData ? (<div style={{
                                                                width: '100%',
                                                                flexGrow: '1',
                                                                overflow: 'hidden',
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
                                                            </div>) :
                                                                this.state.coproducts.map((row) => (
                                                                    <TableRow
                                                                        key={row._id}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell sx={{ width: '32%' }} align="left">{row.name}</TableCell>
                                                                        <TableCell sx={{ width: '32%' }} align="left">{row.ug}</TableCell>
                                                                        <TableCell sx={{ width: '50%' }} align="left">{row.wholesalerPriceUnit}</TableCell>
                                                                        <TableCell sx={{ padding: '0px 16px 0px 0px' }} align="right">
                                                                            <IconButton onClick={() => {
                                                                                this.setState({ showDeleteCoProductDialog: true, selectedCoProductId: row._id! });
                                                                            }} >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        {
                                            this.props.currentUser
                                                .role === UserRole.admin ? (
                                                <div>
                                                    <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                                    <div style={{ width: '100%', maxHeight: '450px' }}>
                                                        <div style={{ margin: '8px', backgroundColor: 'white', borderRadius: '4px', padding: '16px' }}>
                                                            <h4>
                                                                Configuration des notes des frais
                                                            </h4>
                                                            <div style={{ display: 'flex', marginTop: '8px' }}>
                                                                <TextField value={this.state.expensesConfig.nightPrice} onChange={(event) => {
                                                                    this.state.expensesConfig.nightPrice = Number(event.target.value) ?? 0.0;
                                                                    this.setState({ expensesConfig: this.state.expensesConfig });
                                                                }}
                                                                    InputProps={{
                                                                        inputComponent: NumericFormatCustom as any,
                                                                    }}
                                                                    size="small" id="outlined-basic" label="Prix de nuit" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                                <TextField value={this.state.expensesConfig.kmPrice} onChange={(event) => {
                                                                    this.state.expensesConfig.kmPrice = Number(event.target.value) ?? 0.0;
                                                                    this.setState({ expensesConfig: this.state.expensesConfig });
                                                                }}
                                                                    InputProps={{
                                                                        inputComponent: NumericFormatCustom as any,
                                                                    }}
                                                                    size="small" id="outlined-basic" label="km Prix" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                        <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                        <div style={{ width: '100%', display: 'flex', flexGrow: '1', flexDirection: 'column', padding: '8px 0px 0px 8px', marginBottom: '8px', maxHeight: '400px' }}>
                                            {/* <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                        <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                            <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                <TableCell sx={{ width: '25%' }} align="left">Délégué</TableCell>
                                                <TableCell sx={{ width: '55%' }} align="left">Objectifs de ventes</TableCell>
                                                <TableCell sx={{ width: '55%' }} align="left">Objectifs de visites</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                        {
                                            this.state.loadingSuppliersData ? (<div style={{
                                                width: '100%',
                                                flexGrow: '1',
                                                overflow: 'hidden',
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
                                                </div>) :
                                                    this.state.goals.map((row) => (
                                                        <TableRow
                                                            key={row._id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                        <TableCell sx={{ width: '25%' }} align="left">{row.user?.username}</TableCell>
                                                            <TableCell sx={{ width: '55%' }} align="left">
                                                                <TextField value={row.totalSales} onChange={(event) => {
                                                                    row.totalSales = parseInt(event.target.value);
                                                                    this.setState({});
                                                                }} type="number" size="small" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                            </TableCell>
                                                            <TableCell sx={{ width: '55%' }} align="left">
                                                                <TextField value={row.totalVisits} onChange={(event) => {
                                                                    row.totalVisits = parseInt(event.target.value);
                                                                    this.setState({});
                                                                }}
                                                                    name="numberformat"
                                                                    id="formatted-numberformat-input"
                                                                    type="number"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                            </TableCell>


                                                            </TableRow>
                                                    ))}
                                        </TableBody>
                                    </Table> */}
                                            <Button startIcon={<SaveIcon />} onClick={() => this.handleSaveGoalsChange()} sx={{ width: '350px', border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', height: '40px', margin: '8px' }}>
                                                enregistrer les modifications
                                            </Button>
                                        </div>


                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel
                                    style={{
                                        flex: '1 1 auto',
                                        height: 'calc(100% - 50px)',
                                    }} value={this.state.subTabindex} index={2} >
                                    <div style={{
                                        flex: '1 1 auto',
                                    }}>
                                        <SupplierTable
                                            isLoading={this.state.loadingSuppliersData}
                                            data={this.state.suppliers}
                                            page={this.state.supplierPage}
                                            size={this.state.supplierSize}
                                            total={this.state.suppliersTotal}
                                            onRemove={(id) => {
                                                this.setState({ showDeleteSupplierDialog: true, selectedSupplierId: id });
                                            }}
                                            pageChange={this.handleSupplierPageChange}
                                        ></SupplierTable>
                                        {/* <div style={{ width: '50%', margin: '8px 0px 8px 8px', backgroundColor: 'white', borderRadius: '4px', padding: '16px' }}>
                                            <h4>
                                                Configuration des fournisseurs
                                            </h4>
                                            <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                <TextField value={this.state.supplier.fullName} onChange={(event) => {
                                                    this.state.supplier.fullName = event.target.value;
                                                }} size="small" id="outlined-basic" label="Nom de fournisseur" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                                <TextField value={this.state.supplier.email} onChange={(event) => {
                                                    this.state.supplier.email = event.target.value;
                                                }} type='email' size="small" label="Adresse e-mail" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                            </div>
                                            <div style={{ display: 'flex', margin: '8px 0px' }}>
                                                <TextField value={this.state.supplier.phoneNumberOne} onChange={(event) => {
                                                    this.state.supplier.phoneNumberOne = event.target.value;
                                                }} size="small" id="outlined-basic" label="Numéro de téléphone 1" variant="outlined" sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />

                                                <TextField value={this.state.supplier.phoneNumberTwo} onChange={(event) => {
                                                    this.state.supplier.phoneNumberTwo = event.target.value;
                                                }} size="small" label="Numéro de téléphone 2" variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} />
                                            </div>
                                            <div style={{ display: 'flex', margin: '16px 0px' }}>
                                                <FormControl sx={{ width: '50%', marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} size="small">
                                                    <InputLabel id="demo-select-small-label">Wilaya</InputLabel>
                                                    <Select
                                                        value={this.state.supplier.wilaya}
                                                        onChange={(event) => {
                                                            // this.state.supplier.wilaya = event.target.value;
                                                            // this.setState({
                                                            //     selectedWilaya:
                                                            //         event.target.value.length > 0 ?
                                                            //             this.state.wilayas.find((e) => e.name === event.target.value)
                                                            //             : undefined
                                                            // });
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            this.state.wilayas.map((e) => (
                                                                <MenuItem value={e.name}>{e.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ width: '50%', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} size="small">
                                                    <InputLabel id="demo-select-small-label">Commune</InputLabel>
                                                    <Select
                                                        disabled={!this.state.selectedWilaya}
                                                        value={this.state.supplier.commune}
                                                        onChange={(event) => {
                                                            this.state.supplier.commune = event.target.value;
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            this.state.selectedWilaya?.communes?.map((e) => (
                                                                <MenuItem value={e}>{e}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div style={{ display: 'flex', margin: '16px 0px 0px 0px' }}>
                                                <FormControl sx={{ marginRight: '16px', backgroundColor: 'white', borderRadius: '4px', height: '40px', flexGrow: '1' }} size="small">
                                                    <InputLabel id="demo-select-small-label">Type</InputLabel>
                                                    <Select
                                                        value={this.state.supplier.type}
                                                        onChange={(event) => {
                                                            // this.state.supplier.type = event.target.value;
                                                            // this.setState({ supplier: this.state.supplier });
                                                        }}>
                                                        <MenuItem value={0}>Pharmacétique</MenuItem>
                                                        <MenuItem value={1}>Parapharmacétique</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button onClick={() => this.handleCreateSupplier()} startIcon={<AddIcon />} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', height: '40px', }}>
                                                    Ajouter
                                                </Button>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            flexDirection: 'column',
                                            flex: '1',
                                            alignItems: 'stretch',
                                            width: '50%',
                                            flexGrow: '1',
                                            padding: '8px 8px 0px 8px',
                                            marginBottom: '8px',
                                            height: '100%'
                                        }}>
                                            <SupplierTable
                                                isLoading={this.state.loadingSuppliersData}
                                                data={this.state.suppliers}
                                                page={this.state.supplierPage}
                                                size={this.state.supplierSize}
                                                total={this.state.suppliersTotal}
                                                onRemove={(id) => {
                                                    this.setState({ showDeleteSupplierDialog: true, selectedSupplierId: id });
                                                }}
                                                pageChange={this.handleSupplierPageChange}
                                            ></SupplierTable>
                                        </div> */}
                                    </div>

                                </CustomTabPanel>
                                <CustomTabPanel style={{
                                    flex: '1 1 auto',
                                }}
                                    value={this.state.subTabindex}
                                    index={3} >
                                    <div style={{
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                        }}>
                                            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                                                {/* <div style={{ display: 'flex', padding: '8px 8px 0px 8px', }}>
                                                    <TextField
                                                        value={this.state.specialityName}
                                                        onChange={this.handleSpecialityNameChange}
                                                        size="small"
                                                        label="Nom de spécialité"
                                                        variant="outlined"
                                                        sx={{
                                                            marginRight: '8px',
                                                            backgroundColor: 'white',
                                                            borderRadius: '4px',
                                                            height: '40px',
                                                            flex: '1',
                                                        }} />
                                                    <IconButton onClick={() => this.handleCreateSpeciality()} sx={{ border: 'solid grey 1px', backgroundColor: 'white', borderRadius: '4px', height: '40px', }}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: '1',
                                                    alignItems: 'stretch',
                                                    padding: '8px 8px 0px 8px',
                                                    marginBottom: '8px',
                                                    height: '392px',
                                                }}>
                                                    <SpecialityTable
                                                        isLoading={this.state.loadingSpecialitiesData}
                                                        data={this.state.medicalSpecialities}
                                                        page={this.state.specialityPage}
                                                        size={this.state.specialitySize}
                                                        total={this.state.specialitiesTotal}
                                                        onRemove={(id) => {
                                                            this.setState({ showDeleteSpecialityDialog: true, selectedSpecialityId: id });
                                                        }}
                                                        pageChange={this.handleSpecialityPageChange}
                                                    />
                                                </div>
                                            </div>
                                            <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                            <div style={{ width: '33%', display: 'flex', flexDirection: 'column' }}> */}
                                                <CommentPanel
                                                    disabled={this.state.comments.length === 5}
                                                    onAdd={this.handleCreateComment}
                                                ></CommentPanel>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: '1',
                                                    alignItems: 'stretch',
                                                    padding: '8px 8px 0px 8px',
                                                }}>
                                                    <CommentTable
                                                        isLoading={this.state.loadingCommentsData}
                                                        data={this.state.comments}
                                                        onEdit={(comment) => {

                                                        }}
                                                        onRemove={(id) => {
                                                            this.setState({ showDeleteCommentDialog: true, selectedCommentId: id });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                                                <MotivationPanel
                                                    onAdd={this.handleCreateMotivation}
                                                ></MotivationPanel>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: '1',
                                                    alignItems: 'stretch',
                                                    padding: '8px 8px 0px 8px',
                                                }}>
                                                    <MotivationTable
                                                        isLoading={this.state.loadingMotivationsData}
                                                        data={this.state.motivations}
                                                        onEdit={(motivation) => {

                                                        }}
                                                        onRemove={(id) => {
                                                            this.setState({ showDeleteMotivationDialog: true, selectedMotivationId: id });
                                                        }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </CustomTabPanel>
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={this.handleCloseSanckbar} open={this.state.showSnackbar} autoHideDuration={3000} message={this.state.snackbarMessage} />
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteSpecialityDialog: false });
                                }} onYes={() => this.handleRemoveSpeciality()} isOpen={this.state.showDeleteSpecialityDialog} onClose={() => {
                                    this.setState({ showDeleteSpecialityDialog: false });
                                }} message='Voulez-vous supprimer cette spécialité?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteCommentDialog: false });
                                }} onYes={() => this.handleRemoveComment()} isOpen={this.state.showDeleteCommentDialog} onClose={() => {
                                    this.setState({ showDeleteCommentDialog: false });
                                }} message='Voulez-vous supprimer ce commentaire?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteMotivationDialog: false });
                                }} onYes={() => this.handleRemoveMotivation()} isOpen={this.state.showDeleteMotivationDialog} onClose={() => {
                                    this.setState({ showDeleteMotivationDialog: false });
                                }} message='Voulez-vous supprimer cette motivation?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteSupplierDialog: false });
                                }} onYes={() => this.handleRemoveSupplier()} isOpen={this.state.showDeleteSupplierDialog} onClose={() => {
                                    this.setState({ showDeleteSupplierDialog: false });
                                }} message='Voulez-vous supprimer cette fournisseur?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteProductDialog: false });
                                }} onYes={() => this.handleRemoveProduct()} isOpen={this.state.showDeleteProductDialog} onClose={() => {
                                    this.setState({ showDeleteProductDialog: false });
                                }} message='Voulez-vous supprimer ce produit?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteCoProductDialog: false });
                                }} onYes={() => this.handleRemoveCoProduct()} isOpen={this.state.showDeleteCoProductDialog} onClose={() => {
                                    this.setState({ showDeleteCoProductDialog: false });
                                }} message='Voulez-vous supprimer  ce produit concurrent?'></YesNoDialog>
                            </Box>
                        </CustomTabPanel>
                        {/* <CustomTabPanel style={{ display: 'flex', flexDirection: 'row', flexGrow: '1', height: 'calc(100% - 50px)', }} value={this.state.index} index={1} >
                            <div className='config-container'>
                                <div style={{ display: 'flex', width: '100%', maxHeight: '450px', marginTop: '8px' }}>
                                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexGrow: '1', padding: '8px 8px 0px 16px', marginBottom: '8px', maxHeight: '392px' }}>
                                            <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                                <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                    <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                        <TableCell sx={{ width: '100%' }} align="left">Nom de spécialité </TableCell>
                                                        <TableCell sx={{ width: '100%' }} align="right">Restaurer</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                    {
                                                        this.state.loadingSpecialitiesData ? (<div style={{
                                                            width: '100%',
                                                            flexGrow: '1',
                                                            overflow: 'hidden',
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
                                                        </div>) :
                                                            this.state.draftedMedicalSpecialities.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell sx={{ width: '100%' }} align="left">{row.name}</TableCell>
                                                                    <TableCell sx={{ width: '100%', padding: '0px 16px 0px 0px' }} align="right">
                                                                        <IconButton onClick={() => {
                                                                            this.setState({ showRestoreSpecialityDialog: true, selectedSpecialityId: row.id! });
                                                                        }} >
                                                                            <RestoreIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                </TableBody>
                                            </Table>

                                        </div>
                                    </div>
                                    <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column' }}>

                                        <div style={{ display: 'flex', flexGrow: '1', padding: '8px 8px 0px 16px', marginBottom: '8px', maxHeight: '392px' }}>
                                            <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                                <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                    <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                        <TableCell sx={{ width: '100%' }} align="left">Contenu du commentaire</TableCell>
                                                        <TableCell sx={{ width: '100%' }} align="right">Restaurer</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                    {
                                                        this.state.loadingCommentsData ? (<div style={{
                                                            width: '100%',
                                                            flexGrow: '1',
                                                            overflow: 'hidden',
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
                                                        </div>) :
                                                            this.state.draftedComments.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell sx={{ width: '100%' }} align="left">{row.comment}</TableCell>
                                                                    <TableCell sx={{ width: '100%', padding: '0px 16px 0px 0px' }} align="right">
                                                                        <IconButton onClick={() => {
                                                                            this.setState({ showRestoreCommentDialog: true, selectedCommentId: row.id! });
                                                                        }}>
                                                                            <RestoreIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                    <div style={{ width: '33%', display: 'flex', flexDirection: 'column' }}>

                                        <div style={{ display: 'flex', flexGrow: '1', padding: '8px 8px 0px 16px', marginBottom: '8px', maxHeight: '392px' }}>
                                            <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                                <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                    <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                        <TableCell sx={{ width: '100%' }} align="left">Nom de motivation</TableCell>
                                                        <TableCell sx={{ width: '100%' }} align="right">Restaurer</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                    {
                                                        this.state.loadingMotivationsData ? (<div style={{
                                                            width: '100%',
                                                            flexGrow: '1',
                                                            overflow: 'hidden',
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
                                                        </div>) :
                                                            this.state.draftedMotivations.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell sx={{ width: '100%' }} align="left">{row.content}</TableCell>
                                                                    <TableCell sx={{ width: '100%', padding: '0px 16px 0px 0px' }} align="right">
                                                                        <IconButton onClick={() => {
                                                                            this.setState({ showRestoreMotivationDialog: true, selectedMotivationId: row.id! });
                                                                        }} >
                                                                            <RestoreIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                <div style={{ width: '100%', display: 'flex', maxHeight: '450px' }}>

                                    <div style={{ width: '60%', display: 'flex', flexGrow: '1', padding: '8px 8px 0px 8px', marginBottom: '8px', maxHeight: '400px' }}>
                                        <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                            <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                    <TableCell sx={{ width: '50%' }} align="left">Nom de fournisseur</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">Wilaya et commune</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">Type</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="right">Restaurer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                {
                                                    this.state.loadingSuppliersData ? (<div style={{
                                                        width: '100%',
                                                        flexGrow: '1',
                                                        overflow: 'hidden',
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
                                                    </div>) :
                                                        this.state.draftedSuppliers.map((row) => (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.name}</TableCell>
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.wilaya + ', ' + row.commun}</TableCell>
                                                                <TableCell sx={{ width: '50%' }} align="left">{row.type ? 'Pharmacétique' : 'Parapharmacétique'}</TableCell>
                                                                <TableCell sx={{ padding: '0px 16px 0px 0px' }} align="right">
                                                                    <IconButton onClick={() => {
                                                                        this.setState({ showRestoreSupplierDialog: true, selectedSupplierId: row.id! });
                                                                    }} >
                                                                        <RestoreIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                <div style={{ width: '100%', display: 'flex', maxHeight: '450px', flexDirection: 'column', }}>
                                    <h4 style={{ marginLeft: '16px' }}>
                                        Produits
                                    </h4>
                                    <div style={{ display: 'flex', flexGrow: '1', padding: '0px 8px', marginBottom: '8px', maxHeight: '400px', width: '100%', }}>
                                        <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                            <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                    <TableCell sx={{ width: '50%' }} align="left">Nom de fournisseur</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">
                                                        UG
                                                    </TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">Prix grossiste</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="right">Restaurer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                {
                                                    this.state.loadingProductsData ? (<div style={{
                                                        width: '100%',
                                                        flexGrow: '1',
                                                        overflow: 'hidden',
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
                                                    </div>) :
                                                        this.state.draftedProducts.map((row) => (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.name}</TableCell>
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.ug}</TableCell>
                                                                <TableCell sx={{ width: '50%' }} align="left">{row.wholesalePriceUnit}</TableCell>
                                                                <TableCell sx={{ padding: '0px 16px 0px 0px' }} align="right">
                                                                    <IconButton onClick={() => {
                                                                        this.setState({ showRestoreProductDialog: true, selectedProductId: row.id! });
                                                                    }} >
                                                                        <RestoreIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <Divider component="div" style={{ margin: '0px 16px' }} sx={{ borderBottom: 'solid grey 1px' }} />
                                <div style={{ width: '100%', display: 'flex', maxHeight: '450px', flexDirection: 'column' }}>
                                    <h4 style={{ marginLeft: '16px' }}>
                                        Produits concurrent
                                    </h4>
                                    <div style={{ display: 'flex', flexGrow: '1', padding: '0px 8px', marginBottom: '8px', maxHeight: '400px', width: '100%', }}>
                                        <Table sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: '0px', width: "100%", borderRadius: '4px', }} aria-label="simple table">
                                            <TableHead sx={{ height: '45px', display: 'flex', width: '100%' }}>
                                                <TableRow sx={{ display: 'flex', width: '100%' }}>
                                                    <TableCell sx={{ width: '50%' }} align="left">Nom de fournisseur</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">  UG </TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="left">Prix grossiste</TableCell>
                                                    <TableCell sx={{ width: '50%' }} align="right">Restaurer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', }}>
                                                {
                                                    this.state.loadingCoProductsData ? (<div style={{
                                                        width: '100%',
                                                        flexGrow: '1',
                                                        overflow: 'hidden',
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
                                                    </div>) :
                                                        this.state.draftedCoProducts.map((row) => (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.name}</TableCell>
                                                                <TableCell sx={{ width: '32%' }} align="left">{row.ug}</TableCell>
                                                                <TableCell sx={{ width: '50%' }} align="left">{row.wholesalePriceUnit}</TableCell>
                                                                <TableCell sx={{ padding: '0px 16px 0px 0px' }} align="right">
                                                                    <IconButton onClick={() => {
                                                                        this.setState({ showRestoreCoProductDialog: true, selectedCoProductId: row.id! });
                                                                    }} >
                                                                        <RestoreIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={this.handleCloseSanckbar} open={this.state.showSnackbar} autoHideDuration={3000} message={this.state.snackbarMessage} />
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreSpecialityDialog: false });
                                }} onYes={() => this.handleRestoreSpeciality()} isOpen={this.state.showRestoreSpecialityDialog} onClose={() => {
                                    this.setState({ showRestoreSpecialityDialog: false });
                                }} message='Voulez-vous restaurer cette spécialité?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreCommentDialog: false });
                                }} onYes={() => this.handleRestoreComment()} isOpen={this.state.showRestoreCommentDialog} onClose={() => {
                                    this.setState({ showRestoreCommentDialog: false });
                                }} message='Voulez-vous restaurer ce commentaire?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreMotivationDialog: false });
                                }} onYes={() => this.handleRestoreMotivation()} isOpen={this.state.showRestoreMotivationDialog} onClose={() => {
                                    this.setState({ showRestoreMotivationDialog: false });
                                }} message='Voulez-vous restaurer cette motivation?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreSupplierDialog: false });
                                }} onYes={() => this.handleRestoreSupplier()} isOpen={this.state.showRestoreSupplierDialog} onClose={() => {
                                    this.setState({ showRestoreSupplierDialog: false });
                                }} message='Voulez-vous restaurer cette fournisseur?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreProductDialog: false });
                                }} onYes={() => this.handleRestoreProduct()} isOpen={this.state.showRestoreProductDialog} onClose={() => {
                                    this.setState({ showRestoreProductDialog: false });
                                }} message='Voulez-vous restaurer ce produit?'></YesNoDialog>
                                <YesNoDialog onNo={() => {
                                    this.setState({ showRestoreCoProductDialog: false });
                                }} onYes={() => this.handleRestoreCoProduct()} isOpen={this.state.showRestoreCoProductDialog} onClose={() => {
                                    this.setState({ showRestoreCoProductDialog: false });
                                }} message='Voulez-vous restaurer ce produit concurrent?'></YesNoDialog>
                            </div>
                        </CustomTabPanel> */}
                    </Box >
                </div >

            );
        }
    }
}

export default ConfigPage;