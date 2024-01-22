import {axiosInstance} from "../instance";
import {ILoginRequest, ILoginResponse, Profile, RefreshTokenRequest, RefreshTokenResponse} from "./types";
import endpoints from "../endpoints";
import {AxiosPromise} from "axios";

export const Login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => axiosInstance.post(endpoints.AUTH.LOGIN, params)

export const refreshToken = (params: RefreshTokenRequest): AxiosPromise<RefreshTokenResponse> => axiosInstance.post(endpoints.AUTH.REFRESH, params)

export const getProfile = (): AxiosPromise<Profile> => axiosInstance.post(endpoints.AUTH.PROFILE)