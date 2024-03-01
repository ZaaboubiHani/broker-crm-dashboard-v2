import axios, { AxiosInstance,} from 'axios';
import Globals from './globals';


export class Api {
  private static _instance: Api;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  public static get instance(): Api {
    if (!this._instance) {
      this._instance = new Api();
    }
    return this._instance;
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: Globals.apiUrl,
      timeout: 50000,
    });
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
}

