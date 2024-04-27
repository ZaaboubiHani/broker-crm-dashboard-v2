import { Api } from "../../../../core/api/api.source";
import ProductEntity, { ProductType } from "../../../../core/entities/product.entity";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class ProductRemote {
    async getProducts(type: ProductType, isDrafted: boolean): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().get(`/dashboard/${type === ProductType.regular ? 'products' : 'coproducts'}`,
                {
                    params: {
                        isDrafted: isDrafted,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {
                let products = response.data.docs.map((json: any) => ProductEntity.fromJson(json).copyWith({ type: type }))
                return new ResponseEntity({ code: response.status, data: products });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }

    async createProduct(product: ProductEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().post(`/dashboard/${product.type === ProductType.regular ? 'products' : 'coproducts'}`,
                product
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: false });
        }
    }
    async updateProduct(product: ProductEntity): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            var response = await Api.instance.getAxios().put(`/dashboard/${product.type === ProductType.regular ? 'products' : 'coproducts'}/${product._id}`,
                product
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: true });
            }
            return new ResponseEntity({ code: response.status, data: false });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: false });
        }
    }
}

