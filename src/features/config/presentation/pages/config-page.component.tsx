import React, { Component } from "react";
import "../../presentation/pages/config-page.style.css";
import { DotSpinner } from "@uiball/loaders";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider/Divider";
import IconButton from "@mui/material/IconButton/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserModel from "../../domain/models/user.model";
import SpecialityModel from "../../domain/models/speciality.model";
import MotivationModel from "../../domain/models/motivation.model";
import CommentModel from "../../domain/models/comment.model";
import ClientModel from "../../domain/models/client.model";
import ProductModel from "../../domain/models/product.model";
import WilayaModel from "../../domain/models/wilaya.model";
import GoalModel from "../../domain/models/goal.model";
import ExpensesConfigModel from "../../domain/models/expenses-config.model";
import CustomTabPanel from "../../../../core/components/custom-tab-panel/costum-tab-panel.component";
import SpecialityTable from "../components/speciality-table/speciality-table.component";
import CommentTable from "../components/comment-table/comment-table.component";
import MotivationTable from "../components/motivation-table/motivation-table.component";
import SupplierTable from "../components/supplier-table/supplier-table.component";
import { UserRole } from "../../../../core/entities/user.entity";
import YesNoDialog from "../../../../core/components/yes-no-dialog/yes-no-dialog.component";
import CommentPanel from "../components/comment-panel/comment-panel.component";
import FileService from "../../data/services/file.service";
import CompanyModel from "../../domain/models/company.model";
import CompanyService from "../../data/services/company.service";
import CompanyPanel from "../components/company-panel/company-panel.component";
import PdfPreview from "../components/pdf-preview/pdf-preview.component";
import ExpensesConfigService from "../../data/services/expenses-config.service";
import MotivationPanel from "../components/motivation-panel/motivation-panel.component";
import CommentService from "../../data/services/comment.service";
import MotivationService from "../../data/services/motivation.service";
import GoalTable from "../components/goal-table/goal-table.component";
import GoalService from "../../data/services/goal.service";
import MonthYearPicker from "../../../../core/components/month-year-picker/month-year-picker.component";
import SpecialityService from "../../data/services/speciality.service";
import { SpecialityType } from "../../../../core/entities/speciality.entity";
import SpecialityTypeDropdown from "../components/speciality-type-dropdown/speciality-type-dropdown.component";
import SpecialityDialog from "../components/speciality-dialog/speciality-dialog.component";
import CommentDialog from "../components/comment-dialog/comment-dialog.component";
import MotivationDialog from "../components/motivation-dialog/motivation-dialog.component";
import ProductDialog from "../components/product-dialog/product-dialog.component";
import ProductTable from "../components/product-table/product-table.component";
import ProductTypeDropdown from "../components/product-type-dropdown/product-type-dropdown.component";
import ProductService from "../../data/services/product.service";
import { ProductType } from "../../../../core/entities/product.entity";
import { ThirtyFpsSelect } from "@mui/icons-material";
import DraftedProductTable from "../components/drafted-product-table/drafted-product-table.component";
import DraftedCommentTable from "../components/drafted-comment-table/drafted-comment-table.component";
import DraftedMotivationTable from "../components/drafted-motivation-table/drafted-motivation-table.component";
import DraftedSpecialityTable from "../components/drafted-speciality-table/drafted-speciality-table.component";
import EstablishmentModel from "../../domain/models/establishment.model";
import EstablishmentService from "../../data/services/establishment.service";
import EstablishmentTable from "../components/establishment-table/establishment-table.component";
import EstablishmentDialog from "../components/establishment-dialog/establishment-dialog.component";
import WilayaService from "../../data/services/wilaya.service";
import DraftedEstablishmentTable from "../components/drafted-establishment-table/drafted-establishment-table.component";

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
  selectedEstablishment?: EstablishmentModel;
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
  establishments: EstablishmentModel[];
  draftedEstablishments: EstablishmentModel[];
  loadingSuppliersData: boolean;
  loadingProductsData: boolean;
  loadingEstablishmentsData: boolean;
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
  showEstablishmentDialog: boolean;
  showRestoreCommentDialog: boolean;
  showDeleteMotivationDialog: boolean;
  showMotivationDialog: boolean;
  showRestoreMotivationDialog: boolean;
  showRestoreEstablishmentDialog: boolean;
  showDeleteSupplierDialog: boolean;
  showDeleteEstablishmentDialog: boolean;
  showRestoreSupplierDialog: boolean;
  showDeleteProductDialog: boolean;
  showProductDialog: boolean;
  showRestoreProductDialog: boolean;
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
      establishments: [],
      draftedEstablishments: [],
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
      loadingEstablishmentsData: false,
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
      showDeleteCommentDialog: false,
      showCommentDialog: false,
      showRestoreCommentDialog: false,
      showDeleteMotivationDialog: false,
      showMotivationDialog: false,
      showRestoreMotivationDialog: false,
      showDeleteSupplierDialog: false,
      showRestoreProductDialog: false,
      showProductDialog: false,
      showRestoreSupplierDialog: false,
      showDeleteProductDialog: false,
      showEstablishmentDialog: false,
      showDeleteEstablishmentDialog: false,
      showRestoreEstablishmentDialog: false,
      snackbarMessage: "",
      mainTabindex: 0,
      subTabindex: 0,
      selectedDate: new Date(),
      selectedSpecialityType: SpecialityType.doctor,
      selectedProductType: ProductType.regular,
    };
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
  establishmentService = EstablishmentService.getInstance();
  wilayaService = WilayaService.getInstance();

  loadConfigPageData = async () => {
    let company = await this.companyService.getSingleCompany();
    let expensesConfig =
      await this.expensesConfigService.getSingleExpensesConfig();
    let comments = await this.commentService.getAllComments();
    let draftedComments = await this.commentService.getAllDraftedComments();
    let motivations = await this.motivationService.getAllMotivations();
    let draftedMotivations =
      await this.motivationService.getAllDraftedMotivations();
    let kamGoals = await this.goalService.getGoals(new Date(), UserRole.kam);
    let supGoals = await this.goalService.getGoals(
      new Date(),
      UserRole.supervisor
    );
    let specialities = await this.specialityService.getSpecialities(
      SpecialityType.doctor,
      false
    );
    let draftedSpecialities = await this.specialityService.getSpecialities(
      SpecialityType.doctor,
      true
    );
    let products = await this.productService.getProducts(
      ProductType.regular,
      false
    );
    let draftedProducts = await this.productService.getProducts(
      ProductType.regular,
      true
    );
    let establishments = await this.establishmentService.getEstablishments(
      false
    );
    let draftedEstablishments =
      await this.establishmentService.getEstablishments(true);
    let wilayas = await this.wilayaService.getAllWilayas();

    this.setState({
      company: company,
      wilayas: wilayas,
      expensesConfig: expensesConfig,
      comments: comments,
      motivations: motivations,
      userGoals: supGoals,
      kamGoals: kamGoals,
      specialities: specialities,
      products: products,
      draftedProducts: draftedProducts,
      draftedComments: draftedComments,
      draftedMotivations: draftedMotivations,
      draftedSpecialities: draftedSpecialities,
      establishments: establishments,
      draftedEstablishments: draftedEstablishments,
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
    // });
    this.setState({
      isLoading: false,
    });
  };

  handleRemoveSpeciality = async () => {
    this.setState({
      loadingSpecialitiesData: true,
      showDeleteSpecialityDialog: false,
    });
    await this.specialityService.draftSpeciality(
      this.state.selectedSpeciality!
    );
    var specialities = await this.specialityService.getSpecialities(
      this.state.selectedSpecialityType,
      false
    );
    var draftedSpecialities = await this.specialityService.getSpecialities(
      this.state.selectedSpecialityType,
      true
    );
    this.setState({
      loadingSpecialitiesData: false,
      specialities: specialities,
      draftedSpecialities: draftedSpecialities,
      showSnackbar: true,
      snackbarMessage: "Spécialité supprimé",
    });
  };

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
  };

  handleCreateSpeciality = async (speciality: SpecialityModel) => {
    this.setState({
      loadingSpecialitiesData: true,
      showSpecialityDialog: false,
    });
    await this.specialityService.createSpeciality(speciality);
    var specialities = await this.specialityService.getSpecialities(
      this.state.selectedSpecialityType,
      false
    );
    this.setState({
      loadingSpecialitiesData: false,
      specialities: specialities,
      showSnackbar: true,
      snackbarMessage: "Spécialité créé",
    });
  };

  handleEditSpeciality = async (speciality: SpecialityModel) => {
    this.setState({
      loadingSpecialitiesData: true,
      showSpecialityDialog: false,
    });
    await this.specialityService.updateSpeciality(speciality);
    var specialities = await this.specialityService.getSpecialities(
      this.state.selectedSpecialityType,
      false
    );
    this.setState({
      loadingSpecialitiesData: false,
      specialities: specialities,
      showSnackbar: true,
      snackbarMessage: "Spécialité modifié",
    });
  };

  handleEditComment = async (comment: CommentModel) => {
    this.setState({ loadingCommentsData: true, showCommentDialog: false });
    await this.commentService.updateComment(comment);
    var comments = await this.commentService.getAllComments();
    this.setState({
      loadingCommentsData: false,
      comments: comments,
      showSnackbar: true,
      snackbarMessage: "Commentaire modifié",
    });
  };

  handleEditMotivation = async (motivation: MotivationModel) => {
    this.setState({
      loadingMotivationsData: true,
      showMotivationDialog: false,
    });
    await this.motivationService.updateMotivation(motivation);
    var motivations = await this.motivationService.getAllMotivations();
    this.setState({
      loadingMotivationsData: false,
      motivations: motivations,
      showSnackbar: true,
      snackbarMessage: "Motivation modifié",
    });
  };

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
  };

  handleRemoveComment = async () => {
    this.setState({
      loadingCommentsData: true,
      showDeleteCommentDialog: false,
    });
    await this.commentService.draftComment(this.state.selectedComment!);
    var comments = await this.commentService.getAllComments();
    var draftedComments = await this.commentService.getAllDraftedComments();
    this.setState({
      loadingCommentsData: false,
      comments: comments,
      draftedComments: draftedComments,
      showSnackbar: true,
      snackbarMessage: "Commentaire supprimé",
    });
  };

  handleRestoreComment = async () => {
    this.setState({
      loadingCommentsData: true,
      showRestoreCommentDialog: false,
    });
    if (this.state.comments.length < 5) {
      await this.commentService.undraftComment(this.state.selectedComment!);
      var comments = await this.commentService.getAllComments();
      var draftedComments = await this.commentService.getAllDraftedComments();
      this.setState({
        loadingCommentsData: false,
        comments: comments,
        draftedComments: draftedComments,
        showSnackbar: true,
        snackbarMessage: "Commentaire restauré",
      });
    } else {
      this.setState({
        loadingCommentsData: false,
        showSnackbar: true,
        snackbarMessage:
          "Nombre de commentaires dépassés, veuillez supprimer un commentaire puis réessayer",
      });
    }
  };

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
      snackbarMessage: "Commentaire créé",
    });
  };

  handleRemoveMotivation = async () => {
    this.setState({
      loadingMotivationsData: true,
      showDeleteMotivationDialog: false,
    });
    await this.motivationService.draftMotivation(
      this.state.selectedMotivation!
    );
    var motivations = await this.motivationService.getAllMotivations();
    var draftedMotivations =
      await this.motivationService.getAllDraftedMotivations();
    this.setState({
      loadingMotivationsData: false,
      motivations: motivations,
      draftedMotivations: draftedMotivations,
      selectedMotivation: undefined,
    });
    this.setState({
      showSnackbar: true,
      snackbarMessage: "Motivation supprimé",
    });
  };

  handleRestoreMotivation = async () => {
    this.setState({
      loadingMotivationsData: true,
      showRestoreMotivationDialog: false,
    });
    await this.motivationService.undraftMotivation(
      this.state.selectedMotivation!
    );
    var motivations = await this.motivationService.getAllMotivations();
    var draftedMotivations =
      await this.motivationService.getAllDraftedMotivations();
    this.setState({
      loadingMotivationsData: false,
      motivations: motivations,
      draftedMotivations: draftedMotivations,
      showSnackbar: true,
      snackbarMessage: "Motivation restauré",
    });
  };

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
      snackbarMessage: "Motivation créé",
    });
  };

  handleCreateSupplier = async () => {
    // this.setState({ loadingSuppliersData: true });
    // await this.supplierService.createSupplier(this.state.supplier);
    // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
    // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, supplier: new SupplierModel({}) });
    // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur créé' });
  };

  handleCreateProduct = async (product: ProductModel) => {
    this.setState({
      loadingProductsData: true,
      showProductDialog: false,
    });
    await this.productService.createProduct(product);
    var prodcts = await this.productService.getProducts(
      this.state.selectedProductType,
      false
    );
    this.setState({
      loadingProductsData: false,
      products: prodcts,
      showSnackbar: true,
      snackbarMessage: "Produit créé",
    });
  };

  handleEditProduct = async (product: ProductModel) => {
    this.setState({
      loadingProductsData: true,
      showProductDialog: false,
    });
    await this.productService.updateProduct(product);
    var prodcts = await this.productService.getProducts(
      this.state.selectedProductType,
      false
    );

    this.setState({
      loadingProductsData: false,
      products: prodcts,
      showSnackbar: true,
      snackbarMessage: "Produit modifié",
    });
  };

  handleRemoveSupplier = async () => {
    // this.setState({ loadingSuppliersData: true, showDeleteSupplierDialog: false });
    // await this.supplierService.draftSupplier(this.state.selectedSupplierId);
    // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
    // var draftedSuppliers = await this.supplierService.getAllDraftedSuppliers();
    // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, draftedSuppliers: draftedSuppliers });
    // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur supprimé' });
  };

  handleRestoreSupplier = async () => {
    // this.setState({ loadingSuppliersData: true, showRestoreSupplierDialog: false });
    // await this.supplierService.publishSupplier(this.state.selectedSupplierId);
    // var { suppliers, total } = await this.supplierService.getSuppliersPaginated(this.state.supplierPage, this.state.supplierSize);
    // var draftedSuppliers = await this.supplierService.getAllDraftedSuppliers();
    // this.setState({ loadingSuppliersData: false, suppliers: suppliers, suppliersTotal: total, draftedSuppliers: draftedSuppliers });
    // this.setState({ showSnackbar: true, snackbarMessage: 'Fournisseur restauré' });
  };

  handleRemoveProduct = async () => {
    this.setState({
      loadingProductsData: true,
      showDeleteProductDialog: false,
    });
    await this.productService.draftProduct(this.state.selectedProduct!);
    var products = await this.productService.getProducts(
      this.state.selectedProductType,
      false
    );
    var draftedProducts = await this.productService.getProducts(
      this.state.selectedProductType,
      true
    );
    this.setState({
      loadingProductsData: false,
      products: products,
      draftedProducts: draftedProducts,
      showSnackbar: true,
      snackbarMessage: "Produit supprimé",
    });
  };

  handleRestoreProduct = async () => {
    this.setState({
      loadingProductsData: true,
      showRestoreProductDialog: false,
    });
    await this.productService.undraftProduct(this.state.selectedProduct!);
    var products = await this.productService.getProducts(
      this.state.selectedProductType,
      false
    );
    var draftedProducts = await this.productService.getProducts(
      this.state.selectedProductType,
      true
    );
    this.setState({
      loadingProductsData: false,
      products: products,
      draftedProducts: draftedProducts,
      showSnackbar: true,
      snackbarMessage: "Produit restauré",
    });
  };

  handleSaveGoalsChange = async () => {
    this.setState({ savingGoalsChanges: true });
    let changedGoals = this.state.userGoals.filter((goal) => goal.hasChanged);
    changedGoals = changedGoals.concat(
      this.state.kamGoals.filter((goal) => goal.hasChanged)
    );
    if (changedGoals.length > 0) {
      this.goalService.updateGoals(changedGoals);
      let kamGoals = await this.goalService.getGoals(
        this.state.selectedDate,
        UserRole.kam
      );
      let supGoals = await this.goalService.getGoals(
        this.state.selectedDate,
        UserRole.supervisor
      );
      this.setState({
        showSnackbar: true,
        snackbarMessage: "Modifications d'objectifs enregistrées",
        userGoals: supGoals,
        kamGoals: kamGoals,
      });
    }
    this.setState({
      savingGoalsChanges: false,
    });
  };

  handleCloseSanckbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    this.setState({ showSnackbar: false });
  };

  handleOnPickDate = async (date: Date) => {
    this.setState({
      savingGoalsChanges: true,
      selectedDate: date,
    });
    let changedGoals = this.state.userGoals.filter((goal) => goal.hasChanged);
    changedGoals = changedGoals.concat(
      this.state.kamGoals.filter((goal) => goal.hasChanged)
    );
    if (changedGoals.length > 0) {
      this.goalService.updateGoals(changedGoals);
    }
    let kamGoals = await this.goalService.getGoals(
      this.state.selectedDate,
      UserRole.kam
    );
    let supGoals = await this.goalService.getGoals(
      this.state.selectedDate,
      UserRole.supervisor
    );

    this.setState({
      savingGoalsChanges: false,
      userGoals: supGoals,
      kamGoals: kamGoals,
    });
  };

  handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ mainTabindex: newValue, subTabindex: 0 });
  };
  handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ subTabindex: newValue });
  };

  handleSaveChanges = async (
    company: CompanyModel,
    expensesConfig: ExpensesConfigModel
  ) => {
    this.setState({ savingCompanyChanges: true });
    if (company.file) {
      let fileId = await this.fileService.uploadFile(company.file);
      company.logo = { _id: fileId, url: "" };
    }
    let newCompany = await this.companyService.updateCompany(company);
    let newExpensesConfig =
      await this.expensesConfigService.updateExpensesConfig(expensesConfig);
    this.setState({
      company: newCompany,
      expensesConfig: newExpensesConfig,
      savingCompanyChanges: false,
    });
  };
  handleSelectSpecialityType = async (type: SpecialityType) => {
    this.setState({
      loadingSpecialitiesData: true,
      selectedSpecialityType: type,
    });
    let specialities = await this.specialityService.getSpecialities(
      type,
      false
    );
    let draftedSpecialities = await this.specialityService.getSpecialities(
      type,
      true
    );
    this.setState({
      loadingSpecialitiesData: false,
      specialities: specialities,
      draftedSpecialities: draftedSpecialities,
    });
  };
  handleSelectProductType = async (type: ProductType) => {
    this.setState({ loadingProductsData: true, selectedProductType: type });
    let products = await this.productService.getProducts(type, false);
    let draftedProducts = await this.productService.getProducts(type, true);
    this.setState({
      loadingProductsData: false,
      products: products,
      draftedProducts: draftedProducts,
    });
  };

  handleCreateEstablishment = async (establishment: EstablishmentModel) => {
    this.setState({
      loadingEstablishmentsData: true,
      showEstablishmentDialog: false,
    });
    await this.establishmentService.createEstablishment(establishment);
    let establishments = await this.establishmentService.getEstablishments(
      false
    );
    let draftedEstablishments =
      await this.establishmentService.getEstablishments(true);
    this.setState({
      loadingEstablishmentsData: false,
      establishments: establishments,
      draftedEstablishments: draftedEstablishments,
    });
  };
  handleEditEstablishment = async (establishment: EstablishmentModel) => {
    this.setState({
      loadingEstablishmentsData: true,
      showEstablishmentDialog: false,
    });
    await this.establishmentService.updateEstablishment(establishment);
    let establishments = await this.establishmentService.getEstablishments(
      false
    );
    let draftedEstablishments =
      await this.establishmentService.getEstablishments(true);
    this.setState({
      loadingEstablishmentsData: false,
      establishments: establishments,
      draftedEstablishments: draftedEstablishments,
    });
  };

  handleRemoveEstablishment = async () => {
    this.setState({
      loadingEstablishmentsData: true,
      showDeleteEstablishmentDialog: false,
    });
    await this.establishmentService.draftEstablishment(
      this.state.selectedEstablishment!
    );
    let establishments = await this.establishmentService.getEstablishments(
      false
    );
    let draftedEstablishments =
      await this.establishmentService.getEstablishments(true);
    this.setState({
      selectedEstablishment: undefined,
      loadingEstablishmentsData: false,
      establishments: establishments,
      draftedEstablishments: draftedEstablishments,
    });
  };
  handleRestoreEstablishment = async () => {
    this.setState({
      loadingEstablishmentsData: true,
      showRestoreEstablishmentDialog: false,
    });
    await this.establishmentService.undraftEstablishment(
      this.state.selectedEstablishment!
    );
    let establishments = await this.establishmentService.getEstablishments(
      false
    );
    let draftedEstablishments =
      await this.establishmentService.getEstablishments(true);
    this.setState({
      selectedEstablishment: undefined,
      loadingEstablishmentsData: false,
      establishments: establishments,
      draftedEstablishments: draftedEstablishments,
    });
  };

  componentDidMount(): void {
    if (localStorage.getItem("isLogged") === "true") {
      this.loadConfigPageData();
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
            alignItems: "stretch",
            backgroundColor: "#eee",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={this.state.mainTabindex}
                onChange={this.handleMainTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Configuration" />
                <Tab label="Corbeille" />
              </Tabs>
            </Box>
            <CustomTabPanel
              style={{
                flex: "1 1 auto",
              }}
              value={this.state.mainTabindex}
              index={0}
            >
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={this.state.subTabindex}
                    onChange={this.handleSubTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Entreprise" />
                    <Tab label="Produits" />
                    <Tab label="Spécialités et établissements" />
                    <Tab label="Clients" />
                    <Tab label="Commentaires et Motivations" />
                    <Tab label="Objectifs d'équipe" />
                  </Tabs>
                </Box>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                    height: "calc(100% - 50px)",
                  }}
                  value={this.state.subTabindex}
                  index={0}
                >
                  {this.state.savingCompanyChanges ? (
                    <div
                      style={{
                        width: "100%",
                        height: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DotSpinner size={40} speed={0.9} color="black" />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        marginTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "50%",
                        }}
                      >
                        <CompanyPanel
                          company={this.state.company}
                          expensesConfig={this.state.expensesConfig}
                          saveChanges={this.handleSaveChanges}
                        ></CompanyPanel>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        component="div"
                        style={{ width: "0.5%" }}
                        sx={{ borderRight: "solid grey 1px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          width: "50%",
                        }}
                      >
                        <PdfPreview company={this.state.company}></PdfPreview>
                      </div>
                    </div>
                  )}
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={1}
                >
                  <div className="config-container">
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <ProductTypeDropdown
                          onSelect={this.handleSelectProductType}
                        ></ProductTypeDropdown>
                        <IconButton
                          onClick={() => {
                            this.setState({
                              showProductDialog: true,
                              selectedProduct: undefined,
                            });
                          }}
                          sx={{
                            marginLeft: "8px",
                            border: "solid grey 1px",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            height: "40px",
                            marginBottom: "8px",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <ProductTable
                        id="ProductTable"
                        data={this.state.products}
                        onRemove={(product) => {
                          this.setState({
                            showDeleteProductDialog: true,
                            selectedProduct: product,
                          });
                        }}
                        onEdit={(product) => {
                          this.setState({
                            showProductDialog: true,
                            selectedProduct: product,
                          });
                        }}
                        isLoading={this.state.loadingProductsData}
                      ></ProductTable>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                    height: "calc(100% - 50px)",
                  }}
                  value={this.state.subTabindex}
                  index={2}
                >
                  <div
                    style={{
                      flex: "1 1 auto",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ width: "30%", padding: "0px 8px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <SpecialityTypeDropdown
                            initType={this.state.selectedSpecialityType}
                            onSelect={this.handleSelectSpecialityType}
                          />
                          <IconButton
                            onClick={() => {
                              this.setState({
                                showSpecialityDialog: true,
                                selectedSpeciality: undefined,
                              });
                            }}
                            sx={{
                              marginLeft: "8px",
                              border: "solid grey 1px",
                              backgroundColor: "white",
                              borderRadius: "4px",
                              height: "40px",
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>

                        <SpecialityTable
                          isLoading={this.state.loadingSpecialitiesData}
                          data={this.state.specialities}
                          onRemove={(speciality) => {
                            this.setState({
                              showDeleteSpecialityDialog: true,
                              selectedSpeciality: speciality,
                            });
                          }}
                          onEdit={(speciality) => {
                            this.setState({
                              showSpecialityDialog: true,
                              selectedSpeciality: speciality,
                            });
                          }}
                        />
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        component="div"
                        style={{ width: "0.5%" }}
                        sx={{ borderRight: "solid grey 1px" }}
                      />
                      <div style={{ width: "70%", padding: "0px 8px" }}>
                        <IconButton
                          onClick={() => {
                            this.setState({
                              showEstablishmentDialog: true,
                              selectedEstablishment: undefined,
                            });
                          }}
                          sx={{
                            margin: "0px 0px 8px 8px",
                            border: "solid grey 1px",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            height: "40px",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                        <EstablishmentTable
                          isLoading={this.state.loadingEstablishmentsData}
                          data={this.state.establishments}
                          onRemove={(establishment) => {
                            this.setState({
                              showDeleteEstablishmentDialog: true,
                              selectedEstablishment: establishment,
                            });
                          }}
                          onEdit={(establishment) => {
                            this.setState({
                              showEstablishmentDialog: true,
                              selectedEstablishment: establishment,
                            });
                          }}
                        ></EstablishmentTable>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                    height: "calc(100% - 50px)",
                  }}
                  value={this.state.subTabindex}
                  index={3}
                >
                  <div
                    style={{
                      flex: "1 1 auto",
                    }}
                  >
                    <div style={{ width: "100%" }}>
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
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={4}
                >
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CommentPanel
                          disabled={this.state.comments.length === 5}
                          onAdd={this.handleCreateComment}
                        ></CommentPanel>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <CommentTable
                            isLoading={this.state.loadingCommentsData}
                            data={this.state.comments}
                            onEdit={(comment) => {
                              this.setState({
                                showCommentDialog: true,
                                selectedComment: comment,
                              });
                            }}
                            onRemove={(comment) => {
                              this.setState({
                                showDeleteCommentDialog: true,
                                selectedComment: comment,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        component="div"
                        style={{ width: "0.5%" }}
                        sx={{ borderRight: "solid grey 1px" }}
                      />
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <MotivationPanel
                          onAdd={this.handleCreateMotivation}
                        ></MotivationPanel>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <MotivationTable
                            isLoading={this.state.loadingMotivationsData}
                            data={this.state.motivations}
                            onEdit={(motivation) => {
                              this.setState({
                                showMotivationDialog: true,
                                selectedMotivation: motivation,
                              });
                            }}
                            onRemove={(motivation) => {
                              this.setState({
                                showDeleteMotivationDialog: true,
                                selectedMotivation: motivation,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={5}
                >
                  <div style={{}}>
                    <MonthYearPicker
                      initialDate={this.state.selectedDate}
                      onPick={this.handleOnPickDate}
                    ></MonthYearPicker>

                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: this.props.currentUser.role === UserRole.admin ? "50%" : "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <GoalTable
                            isLoading={this.state.savingGoalsChanges}
                            data={this.state.userGoals}
                          />
                        </div>
                      </div>
                      {this.props.currentUser.role === UserRole.admin ? (
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: "1",
                              alignItems: "stretch",
                              padding: "8px 8px 0px 8px",
                            }}
                          >
                            <GoalTable
                              isLoading={this.state.savingGoalsChanges}
                              data={this.state.kamGoals}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <IconButton
                      onClick={this.handleSaveGoalsChange}
                      sx={{
                        marginLeft: "8px",
                        marginTop: "16px",
                        border: "solid grey 1px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        height: "40px",
                        fontSize: "16px",
                        width: "245px",
                        color: "teal",
                      }}
                    >
                      <SaveIcon />
                      Enregistrer les modifications
                    </IconButton>
                  </div>
                </CustomTabPanel>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  onClose={this.handleCloseSanckbar}
                  open={this.state.showSnackbar}
                  autoHideDuration={3000}
                  message={this.state.snackbarMessage}
                />

                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteSpecialityDialog: false });
                  }}
                  onYes={() => this.handleRemoveSpeciality()}
                  isOpen={this.state.showDeleteSpecialityDialog}
                  onClose={() => {
                    this.setState({ showDeleteSpecialityDialog: false });
                  }}
                  message="Voulez-vous supprimer cette spécialité?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteEstablishmentDialog: false });
                  }}
                  onYes={() => this.handleRemoveEstablishment()}
                  isOpen={this.state.showDeleteEstablishmentDialog}
                  onClose={() => {
                    this.setState({ showDeleteEstablishmentDialog: false });
                  }}
                  message="Voulez-vous supprimer cet établissement?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteCommentDialog: false });
                  }}
                  onYes={() => this.handleRemoveComment()}
                  isOpen={this.state.showDeleteCommentDialog}
                  onClose={() => {
                    this.setState({ showDeleteCommentDialog: false });
                  }}
                  message="Voulez-vous supprimer ce commentaire?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteMotivationDialog: false });
                  }}
                  onYes={() => this.handleRemoveMotivation()}
                  isOpen={this.state.showDeleteMotivationDialog}
                  onClose={() => {
                    this.setState({ showDeleteMotivationDialog: false });
                  }}
                  message="Voulez-vous supprimer cette motivation?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteSupplierDialog: false });
                  }}
                  onYes={() => this.handleRemoveSupplier()}
                  isOpen={this.state.showDeleteSupplierDialog}
                  onClose={() => {
                    this.setState({ showDeleteSupplierDialog: false });
                  }}
                  message="Voulez-vous supprimer cette fournisseur?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showDeleteProductDialog: false });
                  }}
                  onYes={() => this.handleRemoveProduct()}
                  isOpen={this.state.showDeleteProductDialog}
                  onClose={() => {
                    this.setState({ showDeleteProductDialog: false });
                  }}
                  message="Voulez-vous supprimer ce produit?"
                ></YesNoDialog>
                <SpecialityDialog
                  isOpen={this.state.showSpecialityDialog}
                  initSpeciality={this.state.selectedSpeciality}
                  onClose={() => {
                    this.setState({
                      showSpecialityDialog: false,
                      selectedSpeciality: undefined,
                    });
                  }}
                  initType={this.state.selectedSpecialityType}
                  onAdd={this.handleCreateSpeciality}
                  onEdit={this.handleEditSpeciality}
                ></SpecialityDialog>
                <CommentDialog
                  isOpen={this.state.showCommentDialog}
                  initComment={this.state.selectedComment!}
                  onClose={() => {
                    this.setState({
                      showCommentDialog: false,
                      selectedComment: undefined,
                    });
                  }}
                  onEdit={this.handleEditComment}
                ></CommentDialog>
                <MotivationDialog
                  isOpen={this.state.showMotivationDialog}
                  initMotivation={this.state.selectedMotivation!}
                  onClose={() => {
                    this.setState({
                      showMotivationDialog: false,
                      selectedMotivation: undefined,
                    });
                  }}
                  onEdit={this.handleEditMotivation}
                ></MotivationDialog>
                <ProductDialog
                  isOpen={this.state.showProductDialog}
                  initProduct={this.state.selectedProduct!}
                  onClose={() => {
                    this.setState({
                      showProductDialog: false,
                      selectedProduct: undefined,
                    });
                  }}
                  onEdit={this.handleEditProduct}
                  onAdd={this.handleCreateProduct}
                ></ProductDialog>
                <EstablishmentDialog
                  isOpen={this.state.showEstablishmentDialog}
                  wilayas={this.state.wilayas}
                  initEstablishment={this.state.selectedEstablishment!}
                  onClose={() => {
                    this.setState({
                      showEstablishmentDialog: false,
                      selectedEstablishment: undefined,
                    });
                  }}
                  onEdit={this.handleEditEstablishment}
                  onAdd={this.handleCreateEstablishment}
                ></EstablishmentDialog>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel
              style={{
                flex: "1 1 auto",
              }}
              value={this.state.mainTabindex}
              index={1}
            >
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={this.state.subTabindex}
                    onChange={this.handleSubTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Produits" />
                    <Tab label="Spécialités et établissements" />
                    <Tab label="Clients" />
                    <Tab label="Commentaires et Motivations" />
                  </Tabs>
                </Box>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={0}
                >
                  <div className="config-container">
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <ProductTypeDropdown
                          onSelect={this.handleSelectProductType}
                        ></ProductTypeDropdown>
                        <IconButton
                          onClick={() => {
                            this.setState({
                              showProductDialog: true,
                              selectedProduct: undefined,
                            });
                          }}
                          sx={{
                            marginLeft: "8px",
                            border: "solid grey 1px",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            height: "40px",
                            marginBottom: "8px",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <DraftedProductTable
                        id="ProductTable"
                        data={this.state.draftedProducts}
                        onRestore={(product) => {
                          this.setState({
                            showRestoreProductDialog: true,
                            selectedProduct: product,
                          });
                        }}
                        isLoading={this.state.loadingProductsData}
                      ></DraftedProductTable>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                    height: "calc(100% - 50px)",
                  }}
                  value={this.state.subTabindex}
                  index={1}
                >
                  <div
                    style={{
                      flex: "1 1 auto",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ width: "30%", padding: "0px 8px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <SpecialityTypeDropdown
                            initType={this.state.selectedSpecialityType}
                            onSelect={this.handleSelectSpecialityType}
                          />
                          <IconButton
                            onClick={() => {
                              this.setState({
                                showSpecialityDialog: true,
                                selectedSpeciality: undefined,
                              });
                            }}
                            sx={{
                              marginLeft: "8px",
                              border: "solid grey 1px",
                              backgroundColor: "white",
                              borderRadius: "4px",
                              height: "40px",
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>

                        <DraftedSpecialityTable
                          isLoading={this.state.loadingSpecialitiesData}
                          data={this.state.draftedSpecialities}
                          onRestore={(speciality) => {
                            this.setState({
                              showRestoreSpecialityDialog: true,
                              selectedSpeciality: speciality,
                            });
                          }}
                        />
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        component="div"
                        style={{ width: "0.5%" }}
                        sx={{ borderRight: "solid grey 1px" }}
                      />
                      <div style={{ width: "70%", padding: "0px 8px" }}>
                        <DraftedEstablishmentTable
                          isLoading={this.state.loadingEstablishmentsData}
                          data={this.state.draftedEstablishments}
                          onRestore={(establishment) => {
                            this.setState({
                              showRestoreEstablishmentDialog: true,
                              selectedEstablishment: establishment,
                            });
                          }}
                        ></DraftedEstablishmentTable>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                    height: "calc(100% - 50px)",
                  }}
                  value={this.state.subTabindex}
                  index={2}
                >
                  <div
                    style={{
                      flex: "1 1 auto",
                    }}
                  >
                    <div style={{ width: "100%" }}>
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
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={3}
                >
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <DraftedCommentTable
                            isLoading={this.state.loadingCommentsData}
                            data={this.state.draftedComments}
                            onRestore={(comment) => {
                              this.setState({
                                showRestoreCommentDialog: true,
                                selectedComment: comment,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        component="div"
                        style={{ width: "0.5%" }}
                        sx={{ borderRight: "solid grey 1px" }}
                      />
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <DraftedMotivationTable
                            isLoading={this.state.loadingMotivationsData}
                            data={this.state.draftedMotivations}
                            onRestore={(motivation) => {
                              this.setState({
                                showRestoreMotivationDialog: true,
                                selectedMotivation: motivation,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  style={{
                    flex: "1 1 auto",
                  }}
                  value={this.state.subTabindex}
                  index={4}
                >
                  <div style={{}}>
                    <MonthYearPicker
                      initialDate={this.state.selectedDate}
                      onPick={this.handleOnPickDate}
                    ></MonthYearPicker>

                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
                          <GoalTable
                            isLoading={this.state.savingGoalsChanges}
                            data={this.state.userGoals}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            alignItems: "stretch",
                            padding: "8px 8px 0px 8px",
                          }}
                        >
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
                        marginLeft: "8px",
                        marginTop: "16px",
                        border: "solid grey 1px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        height: "40px",
                        fontSize: "16px",
                        width: "245px",
                        color: "teal",
                      }}
                    >
                      <SaveIcon />
                      Enregistrer les modifications
                    </IconButton>
                  </div>
                </CustomTabPanel>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  onClose={this.handleCloseSanckbar}
                  open={this.state.showSnackbar}
                  autoHideDuration={3000}
                  message={this.state.snackbarMessage}
                />

                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreSpecialityDialog: false });
                  }}
                  onYes={() => this.handleRestoreSpeciality()}
                  isOpen={this.state.showRestoreSpecialityDialog}
                  onClose={() => {
                    this.setState({ showRestoreSpecialityDialog: false });
                  }}
                  message="Voulez-vous restaurer cette spécialité?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreEstablishmentDialog: false });
                  }}
                  onYes={() => this.handleRestoreEstablishment()}
                  isOpen={this.state.showRestoreEstablishmentDialog}
                  onClose={() => {
                    this.setState({ showRestoreEstablishmentDialog: false });
                  }}
                  message="Voulez-vous restaurer cet établissement?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreCommentDialog: false });
                  }}
                  onYes={() => this.handleRestoreComment()}
                  isOpen={this.state.showRestoreCommentDialog}
                  onClose={() => {
                    this.setState({ showRestoreCommentDialog: false });
                  }}
                  message="Voulez-vous restaurer ce commentaire?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreMotivationDialog: false });
                  }}
                  onYes={() => this.handleRestoreMotivation()}
                  isOpen={this.state.showRestoreMotivationDialog}
                  onClose={() => {
                    this.setState({ showRestoreMotivationDialog: false });
                  }}
                  message="Voulez-vous restaurer cette motivation?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreSupplierDialog: false });
                  }}
                  onYes={() => this.handleRestoreSupplier()}
                  isOpen={this.state.showRestoreSupplierDialog}
                  onClose={() => {
                    this.setState({ showRestoreSupplierDialog: false });
                  }}
                  message="Voulez-vous restaurer cette fournisseur?"
                ></YesNoDialog>
                <YesNoDialog
                  onNo={() => {
                    this.setState({ showRestoreProductDialog: false });
                  }}
                  onYes={() => this.handleRestoreProduct()}
                  isOpen={this.state.showRestoreProductDialog}
                  onClose={() => {
                    this.setState({ showRestoreProductDialog: false });
                  }}
                  message="Voulez-vous restaurer ce produit?"
                ></YesNoDialog>
              </Box>
            </CustomTabPanel>
          </Box>
        </div>
      );
    }
  }
}

export default ConfigPage;
