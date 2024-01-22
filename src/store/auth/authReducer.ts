import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILoginResponse, Profile} from "../../api/auth/types";

export interface AuthState {
    authData: {
        accessToken: string | null
        refreshToken: string | null
        profile: Profile | null,
        isLoading: boolean
        error: string | null,
    }
    profileData: {
        profile: Profile | null,
        isLoading: boolean
        error: string | null,
    }
}

const initialState: AuthState = {
    authData: {
        profile: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        error: null,
    },
    profileData: {
        profile: null,
        isLoading: false,
        error: null,
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSuccess: (state, action: PayloadAction<ILoginResponse>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                profile: action.payload.wp_user.data,
                isLoading: false,
                error: null,
            }
        }),
        changeToken: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload,
            }
        }),
        loginFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadProfileStart: (state): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: true,
            }
        }),
        loadProfileSuccess: (state, action: PayloadAction<Profile>): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
                error: action.payload,
            }
        }),
        logoutSuccess: (): AuthState => initialState,
    },
})

export const {
    loadProfileStart,
    loadProfileSuccess,
    loadProfileFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    changeToken
} = authReducer.actions

export default authReducer.reducer