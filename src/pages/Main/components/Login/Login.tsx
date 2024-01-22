import {FormEvent, useState} from "react";
import {loginUser} from "../../../../store/auth/actionCreators";
import {useAppDispatch} from "../../../../store";

const Login = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(loginUser({username, password}))
    }

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Login</span>
                <input type="text" value={username} name="login" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="submit">Авторизация</button>
        </form>
    </>
}

export default Login