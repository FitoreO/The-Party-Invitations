import {useState} from "react";
import '../styles/login-form.css';
const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username:'',
        password:''
    })

    const {username,password} = loginData;

    const changeHandler = (e) => {
        setLoginData({...loginData, [e.target.name]:[e.target.value]})
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input className="login-input-fields" type="text" name="username" placeholder="username" value={username} onChange={changeHandler}/>
                <input className="login-input-fields" type="password" name="password" value={password} placeholder="password" onChange={changeHandler}/>
                <button className="submit-login-btn" type="submit" name="submit">Log In</button>
            </form>
        </div>
    )
}

export default LoginForm;