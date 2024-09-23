import axios, { AxiosInstance, AxiosResponse,  } from 'axios';
import Globals from './globals';

export class Api {
  private static _instance: Api;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = this.createAxiosInstance();
    this.setupInterceptors();
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

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.error('Request interceptor error', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      this.handleSuccess.bind(this),
      this.handleError.bind(this),
    );
  }

  private handleSuccess(response: AxiosResponse) {
    return response;
  }
  private async handleError(error: any) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as already tried

      try {
        const refreshToken = localStorage.getItem('refreshToken'); // Assuming refresh token is stored in local storage
        const response = await axios.post(Globals.apiUrl + '/users/token', { refreshToken: refreshToken });

        // Store new tokens
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.newRefreshToken);

        // Update authorization header
        this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' +  response.data.data.accessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' +  response.data.data.accessToken;

        // Retry the original request with new token
        return this.axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is also expired or any error during refreshing
        console.error('Failed to refresh token', refreshError);
        // Handle further like redirecting to login page or logging out user
      }
    }

    // If error is not due to 401 Unauthorized, just reject the promise
    return Promise.reject(error);
  };

  public getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
}

