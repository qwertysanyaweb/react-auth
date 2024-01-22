import {useSelector} from "react-redux";
import {IRootState, useAppDispatch} from "../store";
import React from "react";
import {logoutSuccess} from "../store/auth/authReducer";
import constants from "../api/constants";
import {Navigate} from "react-router-dom";

const Header = () => {
    const dispatch = useAppDispatch();

    const user = useSelector(
        (state: IRootState) => state.auth.profileData
    )

    const logout = () => {
        localStorage.removeItem(constants.AUTH.REFRESH_TOKEN)
        dispatch(logoutSuccess())
        return <Navigate to={'/'}/>
    }

    return (
        <header>
            {user.profile && user.profile.display_name}
            <button onClick={() => logout()}>Выход</button>
        </header>
    )
}

export default Header