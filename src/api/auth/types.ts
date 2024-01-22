export interface ILoginRequest {
    username: string,
    password: string
}

export interface ILoginResponse {
    "wp_user": {
        data: Profile
    },
    "access_token": string,
    "refresh_token": string
}

export interface RefreshTokenRequest {
    token: string,
}

export interface RefreshTokenResponse {
    access_token: string,
}

export interface Profile {
    "ID": string,
    "display_name": string
    "user_email": string,
    "user_login": string,
}
