import {Dispatch} from "@reduxjs/toolkit"
import api from "../../api"
import {ILoginRequest, RefreshTokenResponse} from "../../api/auth/types"
import {
    changeToken,
    loadProfileFailure,
    loadProfileStart,
    loadProfileSuccess,
    loginFailure,
    loginStart,
    loginSuccess
} from "./authReducer"
import {AxiosPromise} from "axios";
import {store} from "../index";
import {isTokenExpired} from "../../utils/jwt";
import constants from "../../api/constants";

export const loginUser =
    (data: ILoginRequest) =>
        async (dispatch: Dispatch<any>): Promise<void> => {
            try {
                dispatch(loginStart())
                dispatch(loadProfileStart())

                const res = await api.auth.Login(data)

                localStorage.setItem(constants.AUTH.REFRESH_TOKEN, res.data.refresh_token);

                dispatch(loginSuccess(res.data))
                dispatch(loadProfileSuccess(res.data.wp_user.data))

            } catch (error: any) {
                console.error(error)

                dispatch(loginFailure(error.message))
            }
        }

export const getProfile =
    () =>
        async (dispatch: Dispatch<any>): Promise<void> => {
            try {
                dispatch(loginStart())
                dispatch(loadProfileStart())

                const res = await api.auth.getProfile()

                dispatch(loadProfileSuccess(res.data))

            } catch (error: any) {
                console.error(error)

                dispatch(loadProfileFailure(error.message))
            }
        }

let refreshTokenRequest: AxiosPromise<RefreshTokenResponse> | null = null;

export const getAccessToken = () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {

        const refreshToken = localStorage.getItem(constants.AUTH.REFRESH_TOKEN);
        const accessToken = store.getState().auth.authData.accessToken;

        try {

            if(refreshToken){
                if (!accessToken || isTokenExpired(accessToken)) {
                    if (refreshTokenRequest === null) {
                        refreshTokenRequest = api.auth.refreshToken({token: refreshToken ? refreshToken : ''})
                    }

                    const res = await refreshTokenRequest
                    refreshTokenRequest = null


                    dispatch(changeToken(res.data.access_token))


                    return res.data.access_token
                }

                return accessToken
            }

            return null
        } catch (error: any) {
            localStorage.removeItem(constants.AUTH.REFRESH_TOKEN)
            return null
        }
    }