import React from "react";
import {Outlet} from "react-router";
import Header from "./Header";

const Content = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Content