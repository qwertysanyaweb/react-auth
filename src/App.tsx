import React, {useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {IRootState, useAppDispatch} from "./store";
import Content from "./components/Content";
import Main from "./pages/Main";
import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import {getProfile} from "./store/auth/actionCreators";
import {useSelector} from "react-redux";
import constants from "./api/constants";


function App() {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const refreshToken = localStorage.getItem(constants.AUTH.REFRESH_TOKEN);

    useEffect(() => {
        if(refreshToken){
            dispatch(getProfile())
        }
    }, [dispatch])

    return <Router>
        <Routes>
            <Route path="/login" element={!isLoggedIn ? <Main/> : <Navigate to={'/'}/>}/>
            <Route path="/" element={isLoggedIn ? <Content/> : <Navigate to={'/login'}/>}>
                <Route index element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/test" element={<Test/>}/>
            </Route>
            <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
    </Router>
}

export default App;
