// import { isJSONResponse } from './misc';
// import { isNotEmpty } from './string';

// type HeaderType = Record<string, string>;
// const TOKEN_KEY = process.env.TOKEN_KEY || '';
// const API_URL = process.env.API_URL || '';
// class Api {
//   async invokeApi<ResponseType, BodyType>({
//     path,
//     method,
//     body,
//     headers = {},
//     contentType,
//     cache = 'default'
//   }: {
//     path: string;
//     method: string;
//     body?: BodyType;
//     headers?: HeaderType;
//     contentType?: string;
//     cache?: RequestCache;
//   }): Promise<ResponseType> {
//     const requestHeaders = new Headers();

//     if (body !== undefined || contentType !== undefined) {
//       requestHeaders.set('Content-Type', contentType || 'application/json');
//     }

//     for (const headerKey of Object.keys(headers)) {
//       requestHeaders.set(headerKey, headers[headerKey]);
//     }

//     // Detect the url from the outside of the app
//     // There are something we should not do with OutsidePath
//     // Such as adding the token header and the ${API_URL}
//     const isOutsidePath =
//       path.startsWith('http://') || path.startsWith('https://');

//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token && !isOutsidePath) {
//       requestHeaders.set('Authorization', `Bearer ${token}`);
//     }

//     try {
//       const url = isOutsidePath ? path : `${API_URL}/${path}`;
//       const res = await fetch(url, {
//         method: method.toUpperCase(),
//         body: body ? JSON.stringify(body) : undefined,
//         headers: requestHeaders,
//         cache
//       });

//       const text = await res.text();
//       const responseData =
//         isNotEmpty(text) && isJSONResponse(res) ? JSON.parse(text) : text;

//       return res.ok ? responseData : Promise.reject(responseData);
//     } catch (err) {
//       throw new Error(err);
//     }
//   }

//   async get<ResponseType>({
//     path,
//     headers,
//     cache
//   }: {
//     path: string;
//     headers?: HeaderType;
//     cache?: RequestCache;
//   }): Promise<ResponseType> {
//     return this.invokeApi<ResponseType, undefined>({
//       method: 'get',
//       path,
//       headers,
//       cache
//     });
//   }

//   async post<ResponseType, BodyType = void>({
//     path,
//     body,
//     headers,
//     contentType,
//     cache
//   }: {
//     path: string;
//     body?: BodyType;
//     headers?: HeaderType;
//     contentType?: string;
//     cache?: RequestCache;
//   }): Promise<ResponseType> {
//     return this.invokeApi<ResponseType, BodyType>({
//       method: 'post',
//       path,
//       body,
//       headers,
//       contentType,
//       cache
//     });
//   }

//   async put<ResponseType, BodyType = void>({
//     path,
//     body,
//     headers,
//     contentType,
//     cache
//   }: {
//     path: string;
//     body?: BodyType;
//     headers?: HeaderType;
//     contentType?: string;
//     cache?: RequestCache;
//   }): Promise<ResponseType> {
//     return this.invokeApi<ResponseType, BodyType>({
//       method: 'put',
//       path,
//       body,
//       headers,
//       contentType,
//       cache
//     });
//   }

//   async delete<ResponseType, BodyType = void>({
//     path,
//     body,
//     headers,
//     contentType,
//     cache
//   }: {
//     path: string;
//     body?: BodyType;
//     headers?: HeaderType;
//     contentType?: string;
//     cache?: RequestCache;
//   }): Promise<ResponseType> {
//     return this.invokeApi<ResponseType, BodyType>({
//       method: 'delete',
//       path,
//       body,
//       headers,
//       contentType,
//       cache
//     });
//   }
// }

// export default new Api();

import axios from 'axios';
import { isServer } from './misc';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 300000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const saveToken = (a: string, r: string) => {
  localStorage.setItem(process.env.TOKEN_KEY || 'access_token', a);
  localStorage.setItem(process.env.REFRESH_KEY || 'refresh_token', r);
};
axiosClient.interceptors.request.use(function (config) {
  if (isServer()) return config;
  const token = localStorage.getItem(process.env.TOKEN_KEY || 'access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    const status = error.response.status;
    const message = error.response.data.error.message;
    if (status === 401 && message === 'jwt expired' && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { accessToken, refreshToken }: any = await axiosClient.post<any>(
          'auth/refreshToken',
          {
            refreshToken: localStorage.getItem(
              process.env.REFRESH_KEY || 'refresh_token'
            )
          }
        );
        saveToken(accessToken, refreshToken);
        return axiosClient(error.response.config);
      } catch (err) {
        return Promise.reject(error);
      }
    }
  }
);

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     let res = error.response;
//     if (res.status == 401) {
//       window.location.href = “https://example.com/login”;
//     }
//     console.error(“Looks like there was a problem. Status Code: “ + res.status);
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
