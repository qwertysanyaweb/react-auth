import axios, {AxiosError} from 'axios'
import {store} from '../store'
import {getAccessToken} from '../store/auth/actionCreators'

import Endpoints from './endpoints'
import {logoutSuccess} from "../store/auth/authReducer";
import constants from "./constants";


export const axiosInstance = axios.create({})

const urlsSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REFRESH]

axiosInstance.interceptors.request.use(async (config) => {

    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {
        const authorization = `Bearer ${accessToken}`

        // @ts-ignore
        config.headers = {
            ...config.headers,
            Authorization: authorization
        }
    }

    return config
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const isLoggedIn = !!store.getState().auth.authData.accessToken
        console.log('error', isLoggedIn);

        if ((error.response?.status === 401)) {
            localStorage.removeItem(constants.AUTH.REFRESH_TOKEN)
            store.dispatch(logoutSuccess())
        }
    }
)