import React, { Component } from 'react';
import '../../presentation/pages/config-page.style.css';
import { DotSpinner } from '@uiball/loaders';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider/Divider';
import IconButton from '@mui/material/IconButton/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserModel from '../../domain/models/user.model';
import SpecialityModel from '../../domain/models/speciality.model';
import MotivationModel from '../../domain/models/motivation.model';
import CommentModel from '../../domain/models/comment.model';
import ClientModel from '../../domain/models/client.model';
import ProductModel from '../../domain/models/product.model';
import WilayaModel from '../../domain/models/wilaya.model';
import GoalModel from '../../domain/models/goal.model';
import ExpensesConfigModel from '../../domain/models/expenses-config.model';
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
import GoalTable from '../components/goal-table/goal-table.component';
import GoalService from '../../data/services/goal.service';
import MonthYearPicker from '../../../../core/components/month-year-picker/month-year-picker.component';
import SpecialityService from '../../data/services/speciality.service';
import { SpecialityType } from '../../../../core/entities/speciality.entity';
import SpecialityTypeDropdown from '../components/speciality-type-dropdown/speciality-type-dropdown.component';
import SpecialityDialog from '../components/speciality-dialog/speciality-dialog.component';
import CommentDialog from '../components/comment-dialog/comment-dialog.component';
import MotivationDialog from '../components/motivation-dialog/motivation-dialog.component';
import ProductDialog from '../components/product-dialog/product-dialog.component';
import ProductTable from '../components/product-table/product-table.component';
import ProductTypeDropdown from '../components/product-type-dropdown/product-type-dropdown.component';
import ProductService from '../../data/services/product.service';
import { ProductType } from '../../../../core/entities/product.entity';
import { ThirtyFpsSelect } from '@mui/icons-material';

interface ConfigPageProps {
    currentUser: UserModel;
}

interface ConfigPageState {
    company: CompanyModel;
    isLoading: boolean;
    loadingSpecialitiesData: boolean;
    specialities: SpecialityModel[];
    draftedSpecialities: SpecialityModel[];
    selectedSpeciality?: SpecialityModel;
    loadingCommentsData: boolean;
    motivations: MotivationModel[];
    draftedMotivations: MotivationModel[];
    loadingMotivationsData: boolean;
    comments: CommentModel[];
    draftedComments: CommentModel[];
    selectedDate: Date;
    selectedSpecialityType: SpecialityType;
    selectedProductType: ProductType;
    suppliers: ClientModel[];
    draftedSuppliers: ClientModel[];
    products: ProductModel[];
    draftedProducts: ProductModel[];
    loadingSuppliersData: boolean;
    loadingProductsData: boolean;
    wilayas: WilayaModel[];
    userGoals: GoalModel[];
    kamGoals: GoalModel[];
    selectedWilaya?: WilayaModel;
    expensesConfig: ExpensesConfigModel;
    showSnackbar: boolean;
    showDeleteSpecialityDialog: boolean;
    showSpecialityDialog: boolean;
    showRestoreSpecialityDialog: boolean;
    showDeleteCommentDialog: boolean;
    showCommentDialog: boolean;
    showRestoreCommentDialog: boolean;
    showDeleteMotivationDialog: boolean;
    showMotivationDialog: boolean;
    showRestoreMotivationDialog: boolean;
    showDeleteSupplierDialog: boolean;
    showRestoreCoProductDialog: boolean;
    showRestoreSupplierDialog: boolean;
    showDeleteProductDialog: boolean;
    showProductDialog: boolean;
    loadingCoProductsData: boolean;
    showRestoreProductDialog: boolean;
    showDeleteCoProductDialog: boolean;
    savingCompanyChanges: boolean;
    savingGoalsChanges: boolean;
    goalHasChanged: boolean;
    snackbarMessage: string;
    selectedComment?: CommentModel;
    selectedMotivation?: MotivationModel;
    selectedSupplier?: ClientModel;
    selectedProduct?: ProductModel;
    supplierPage: number;
    supplierSize: number;
    suppliersTotal: number;
    mainTabindex: number;
    subTabindex: number;
}


class ConfigPage extends Component<ConfigPageProps, ConfigPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            loadingSpecialitiesData: false,
            specialities: [],
            draftedSpecialities: [],
            draftedProducts: [],
            draftedSuppliers: [],
            loadingCommentsData: false,
            comments: [],
            draftedComments: [],
            draftedMotivations: [],
            loadingMotivationsData: false,
            showSpecialityDialog: false,
            motivations: [],
            company: new CompanyModel({}),
            suppliers: [],
            loadingSuppliersData: false,
            loadingProductsData: false,
            loadingCoProductsData: false,
            savingCompanyChanges: false,
            savingGoalsChanges: false,
            goalHasChanged: false,
            wilayas: [],
            products: [],
            expensesConfig: new ExpensesConfigModel({}),
            userGoals: [],
            kamGoals: [],
            showSnackbar: false,
            supplierPage: 1,
            supplierSize: 25,
            suppliersTotal: 0,
            showDeleteSpecialityDialog: false,
            showRestoreSpecialityDialog: false,
            showDeleteCoProductDialog: false,
            showDeleteCommentDialog: false,
            showCommentDialog: false,
            showRestoreCommentDialog: false,
            showDeleteMotivationDialog: false,
            showMotivationDialog: false,
            showRestoreMotivationDialog: false,
            showDeleteSupplierDialog: false,
            showRestoreProductDialog: false,
            showProductDialog: false,
            showRestoreCoProductDialog: false,
            showRestoreSupplierDialog: false,
            showDeleteProductDialog: false,
            snackbarMessage: '',
            mainTabindex: 0,
            subTabindex: 0,
            selectedDate: new Date(),
            selectedSpecialityType: SpecialityType.doctor,
            selectedProductType: ProductType.regular,
        }
    }
    fileService = FileService.getInstance();
    companyService = CompanyService.getInstance();
    expensesConfigService = ExpensesConfigService.getInstance();
    specialityService = SpecialityService.getInstance();
    commentService = CommentService.getInstance();
    motivationService = MotivationService.getInstance();
    // supplierService = SupplierService.getInstance();
    goalService = GoalService.getInstance();
    productService = ProductService.getInstance();

    loadConfigPageData = async () => {
        let company = await this.companyService.getSingleCompany();
        let expensesConfig = await this.expensesConfigService.getSingleExpensesConfig();
        let comments = await this.commentService.getAllComments();
        let motivations = await this.motivationService.getAllMotivations();
        let kamGoals = await this.goalService.getGoals(new Date(), UserRole.kam);
        let supGoals = await this.goalService.getGoals(new Date(), UserRole.supervisor);
        let specialities = await this.specialityService.getSpecialities(SpecialityType.doctor, false);
        let products = await this.productService.getProducts(ProductType.regular, false);
        this.setState({
            company: company,
            expensesConfig: expensesConfig,
            comments: comments,
            motivations: motivations,
            userGoals: supGoals,
            kamGoals: kamGoals,
            specialities: specialities,
            products: products,
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

    handleCreateSpeciality = async (speciality: SpecialityModel) => {
        this.setState({
            loadingSpecialitiesData: true,
            showSpecialityDialog: false
        });
        await this.specialityService.createSpeciality(speciality);
        var specialities = await this.specialityService.getSpecialities(this.state.selectedSpecialityType, false);
        this.setState({
            loadingSpecialitiesData: false,
            specialities: specialities,
            showSnackbar: true,
            snackbarMessage: 'Spécialité créé',
        });
    }

    handleEditSpeciality = async (speciality: SpecialityModel) => {
        this.setState({ loadingSpecialitiesData: true, showSpecialityDialog: false });
        await this.specialityService.updateSpeciality(speciality);
        var specialities = await this.specialityService.getSpecialities(this.state.selectedSpecialityType, false);
        this.setState({
            loadingSpecialitiesData: false,
            specialities: specialities,
            showSnackbar: true,
            snackbarMessage: 'Spécialité modifié',
        });
    }
    handleEditComment = async (comment: CommentModel) => {
        this.setState({ loadingCommentsData: true, showCommentDialog: false });
        await this.commentService.updateComment(comment);
        var comments = await this.commentService.getAllComments();
        this.setState({
            loadingCommentsData: false,
            comments: comments,
            showSnackbar: true,
            snackbarMessage: 'Commentaire modifié',
        });
    }
    handleEditMotivation = async (motivation: MotivationModel) => {
        this.setState({ loadingMotivationsData: true, showMotivationDialog: false });
        await this.motivationService.updateMotivation(motivation);
        var motivations = await this.motivationService.getAllMotivations();
        this.setState({
            loadingMotivationsData: false,
            motivations: motivations,
            showSnackbar: true,
            snackbarMessage: 'Motivation modifié',
        });
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
        await this.motivationService.draftMotivation(this.state.selectedMotivation!);
        var motivations = await this.motivationService.getAllMotivations();
        var draftedMotivations = await this.motivationService.getAllDraftedMotivations();
        this.setState({
            loadingMotivationsData: false,
            motivations: motivations,
            draftedMotivations: draftedMotivations,
            selectedMotivation: undefined,
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

    handleCreateProduct = async (product: ProductModel) => {
        this.setState({
            loadingProductsData: true,
            showProductDialog: false,
        });
        await this.productService.createProduct(product);
        var prodcts = await this.productService.getProducts(this.state.selectedProductType, false);
        this.setState({
            loadingProductsData: false,
            products: prodcts,
            showSnackbar: true,
            snackbarMessage: 'Produit créé'
        });
    }

    handleEditProduct = async (product: ProductModel) => {
        this.setState({  loadingProductsData: true,
            showProductDialog: false, });
        await this.productService.updateProduct(product);
        var prodcts = await this.productService.getProducts(this.state.selectedProductType, false);
       
        this.setState({  loadingProductsData: false,
            products: prodcts,
            showSnackbar: true,
            snackbarMessage: 'Produit modifié' });
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


    handleRestoreProduct = async () => {
        // this.setState({ loadingProductsData: true, showRestoreProductDialog: false });
        // await this.productService.publishProduct(this.state.selectedProductId);
        // var products = await this.productService.getAllProducts();
        // var draftedProducts = await this.productService.getAllDraftedProducts();
        // this.setState({ loadingProductsData: false, products: products, draftedProducts: draftedProducts });
        // this.setState({ showSnackbar: true, snackbarMessage: 'Produit restauré' });
    }

    handleSaveGoalsChange = async () => {
        this.setState({ savingGoalsChanges: true })
        let changedGoals = this.state.userGoals.filter((goal) => goal.hasChanged);
        changedGoals = changedGoals.concat(this.state.kamGoals.filter((goal) => goal.hasChanged));
        if (changedGoals.length > 0) {
            this.goalService.updateGoals(changedGoals);
            let kamGoals = await this.goalService.getGoals(this.state.selectedDate, UserRole.kam);
            let supGoals = await this.goalService.getGoals(this.state.selectedDate, UserRole.supervisor);
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Modifications d\'objectifs enregistrées',
                userGoals: supGoals,
                kamGoals: kamGoals,
            });
        }
        this.setState({
            savingGoalsChanges: false,
        });
    }

    handleCloseSanckbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        this.setState({ showSnackbar: false });
    };

    handleOnPickDate = async (date: Date) => {
        this.setState({
            savingGoalsChanges: true,
            selectedDate: date
        })
        let changedGoals = this.state.userGoals.filter((goal) => goal.hasChanged);
        changedGoals = changedGoals.concat(this.state.kamGoals.filter((goal) => goal.hasChanged));
        if (changedGoals.length > 0) {
            this.goalService.updateGoals(changedGoals);
        }
        let kamGoals = await this.goalService.getGoals(this.state.selectedDate, UserRole.kam);
        let supGoals = await this.goalService.getGoals(this.state.selectedDate, UserRole.supervisor);

        this.setState({
            savingGoalsChanges: false,
            userGoals: supGoals,
            kamGoals: kamGoals,
        });
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
    handleSelectSpecialityType = async (type: SpecialityType) => {

        this.setState({ loadingSpecialitiesData: true, selectedSpecialityType: type });
        let specialities = await this.specialityService.getSpecialities(type, false);
        this.setState({ loadingSpecialitiesData: false, specialities: specialities });

    };
    handleSelectProductType = async (type: ProductType) => {
        this.setState({ loadingProductsData: true, selectedProductType: type });
        let products = await this.productService.getProducts(type, false);
        this.setState({ loadingProductsData: false, products: products });

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
                                        <Tab label="Clients" />
                                        <Tab label="Commentaires et Motivations" />
                                        <Tab label="Objectifs d'équipe" />
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
                                        <div style={{ width: '100%', }}>
                                            <div style={{
                                                display: 'flex'
                                            }}>
                                                <ProductTypeDropdown
                                                    onSelect={this.handleSelectProductType}
                                                ></ProductTypeDropdown>
                                                <IconButton onClick={() => {
                                                    this.setState({ showProductDialog: true, selectedProduct: undefined });
                                                }}
                                                    sx={{
                                                        marginLeft: '8px',
                                                        border: 'solid grey 1px',
                                                        backgroundColor: 'white',
                                                        borderRadius: '4px',
                                                        height: '40px',
                                                        marginBottom: '8px'
                                                    }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                            <ProductTable
                                                id='ProductTable'
                                                data={this.state.products}
                                                onRemove={(product) => {
                                                    this.setState({ showDeleteProductDialog: true, selectedProduct: product });
                                                }}
                                                onEdit={(product) => {
                                                    this.setState({ showProductDialog: true, selectedProduct: product });
                                                }}
                                                isLoading={this.state.loadingProductsData}
                                            ></ProductTable>
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
                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
                                            <div style={{ width: '30%', padding: '0px 8px' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}>
                                                    <SpecialityTypeDropdown onSelect={this.handleSelectSpecialityType} />
                                                    <IconButton onClick={() => {
                                                        this.setState({ showSpecialityDialog: true, selectedSpeciality: undefined });
                                                    }}
                                                        sx={{
                                                            marginLeft: '8px',
                                                            border: 'solid grey 1px',
                                                            backgroundColor: 'white',
                                                            borderRadius: '4px',
                                                            height: '40px',
                                                        }}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>

                                                <SpecialityTable
                                                    isLoading={this.state.loadingSpecialitiesData}
                                                    data={this.state.specialities}
                                                    onRemove={(speciality) => {
                                                        this.setState({ showDeleteSpecialityDialog: true, selectedSpeciality: speciality });
                                                    }}
                                                    onEdit={(speciality) => {
                                                        this.setState({ showSpecialityDialog: true, selectedSpeciality: speciality });
                                                    }}
                                                />
                                            </div>
                                            <Divider orientation="vertical" flexItem component="div" style={{ width: '0.5%' }} sx={{ borderRight: 'solid grey 1px' }} />
                                            <div style={{ width: '70%', padding: '0px 8px' }}>

                                                <SupplierTable
                                                    isLoading={this.state.loadingSuppliersData}
                                                    data={this.state.suppliers}
                                                    page={this.state.supplierPage}
                                                    size={this.state.supplierSize}
                                                    total={this.state.suppliersTotal}
                                                    onRemove={(id) => {
                                                        // this.setState({ showDeleteSupplierDialog: true, selectedSupplierId: id });
                                                    }}
                                                    pageChange={this.handleSupplierPageChange}
                                                ></SupplierTable>

                                            </div>
                                        </div>
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
                                                            this.setState({ showCommentDialog: true, selectedComment: comment });
                                                        }}
                                                        onRemove={(comment) => {
                                                            this.setState({ showDeleteCommentDialog: true, selectedComment: comment });
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
                                                            this.setState({ showMotivationDialog: true, selectedMotivation: motivation });
                                                        }}
                                                        onRemove={(motivation) => {
                                                            this.setState({ showDeleteMotivationDialog: true, selectedMotivation: motivation });
                                                        }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </CustomTabPanel>
                                <CustomTabPanel style={{
                                    flex: '1 1 auto',
                                }}
                                    value={this.state.subTabindex}
                                    index={4} >
                                    <div style={{
                                    }}>
                                        <MonthYearPicker initialDate={this.state.selectedDate} onPick={this.handleOnPickDate}></MonthYearPicker >

                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                        }}>
                                            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>

                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: '1',
                                                    alignItems: 'stretch',
                                                    padding: '8px 8px 0px 8px',
                                                }}>
                                                    <GoalTable
                                                        isLoading={this.state.savingGoalsChanges}
                                                        data={this.state.userGoals}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>

                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: '1',
                                                    alignItems: 'stretch',
                                                    padding: '8px 8px 0px 8px',
                                                }}>
                                                    <GoalTable
                                                        isLoading={this.state.savingGoalsChanges}
                                                        data={this.state.kamGoals}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <IconButton
                                            onClick={this.handleSaveGoalsChange}
                                            sx={{
                                                marginLeft: '8px',
                                                marginTop: '16px',
                                                border: 'solid grey 1px',
                                                backgroundColor: 'white',
                                                borderRadius: '4px',
                                                height: '40px',
                                                fontSize: '16px',
                                                width: '245px',
                                                color: 'teal'
                                            }}>
                                            <SaveIcon />
                                            Enregistrer les modifications
                                        </IconButton>
                                    </div>

                                </CustomTabPanel>
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={this.handleCloseSanckbar} open={this.state.showSnackbar} autoHideDuration={3000} message={this.state.snackbarMessage} />
                                <YesNoDialog onNo={() => {
                                    this.setState({ showDeleteSpecialityDialog: false });
                                }} onYes={() => this.handleRemoveSpeciality()} isOpen={this.state.showDeleteSpecialityDialog} onClose={() => {
                                    this.setState({ showDeleteSpecialityDialog: false });
                                }} message="Vous n'avez pas enregistré les modifications, voulez-vous continuer sans enregistrer?"></YesNoDialog>
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
                                <SpecialityDialog
                                    isOpen={this.state.showSpecialityDialog}
                                    initSpeciality={this.state.selectedSpeciality}
                                    onClose={() => {
                                        this.setState({ showSpecialityDialog: false, selectedSpeciality: undefined });
                                    }}
                                    initType={this.state.selectedSpecialityType}
                                    onAdd={this.handleCreateSpeciality}
                                    onEdit={this.handleEditSpeciality}
                                ></SpecialityDialog>
                                <CommentDialog
                                    isOpen={this.state.showCommentDialog}
                                    initComment={this.state.selectedComment!}
                                    onClose={() => {
                                        this.setState({ showCommentDialog: false, selectedComment: undefined });
                                    }}
                                    onEdit={this.handleEditComment}
                                ></CommentDialog>
                                <MotivationDialog
                                    isOpen={this.state.showMotivationDialog}
                                    initMotivation={this.state.selectedMotivation!}
                                    onClose={() => {
                                        this.setState({ showMotivationDialog: false, selectedMotivation: undefined });
                                    }}
                                    onEdit={this.handleEditMotivation}
                                ></MotivationDialog>
                                <ProductDialog
                                    isOpen={this.state.showProductDialog}
                                    initProduct={this.state.selectedProduct!}
                                    onClose={() => {
                                        this.setState({ showProductDialog: false, selectedProduct: undefined });
                                    }}
                                    onEdit={this.handleEditProduct}
                                    onAdd={this.handleCreateProduct}
                                ></ProductDialog>
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