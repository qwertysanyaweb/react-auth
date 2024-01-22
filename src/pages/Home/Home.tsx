import React from "react";
import {Link} from "react-router-dom";

function Home() {

    return <>
        Главная страница
        <ul>
            <li>
                <Link to="/test">Тест</Link>
            </li>
            <li>
                <Link to="/dashboard">dashboard</Link>
            </li>
        </ul>

    </>
}

export default Home