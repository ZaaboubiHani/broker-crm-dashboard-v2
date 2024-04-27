import { ProductType } from "../../../../core/entities/product.entity";
import ProductModel from "../../domain/models/product.model";
import ProductRepository from "../../domain/repositories/product.repository";
import ProductRemote from "../remotes/product.remote";
export default class ProductService extends ProductRepository {
    private static _instance: ProductService | null = null;
    private _productRemote?: ProductRemote = new ProductRemote();
    private constructor() {
        super();
    }
    static getInstance(): ProductService {
        ProductService._instance = new ProductService();
        return ProductService._instance;
    }

    async getProducts(type: ProductType, isDrafted: boolean): Promise<ProductModel[]> {
        let response = await this._productRemote!.getProducts(type, isDrafted);
        return response.data;
    }

    async createProduct(product: ProductModel): Promise<boolean> {
        let response = await this._productRemote!.createProduct(product);
        return response.data;
    }
    async updateProduct(product: ProductModel): Promise<boolean> {
        let response = await this._productRemote!.updateProduct(product);
        return response.data;
    }

}