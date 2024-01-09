import {useState} from "react";
import '../styles/login-form.css';
import Form from "@/components/Form";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const LoginForm = () => {
  //  const loginUserName = process.env.FORM_LOGIN_USERNAME;
   // const loginPassword = process.env.FORM_LOGIN_PASSWORD;
//const loginUserName = process.env.NEXT_PUBLIC_USERNAME;
//const loginPassword = process.env.NEXT_PUBLIC_PASSWORD;

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('')

    const {username, password} = loginData;

    const changeHandler = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredPassword = loginData.password;
        const enteredUserName = loginData.username;

        if (!enteredPassword || !enteredUserName) {
            setError('Your login credentials are incorrect. Please try again.');
        } else {
            console.log('This is correct');
        }


           fetch('/api/admin', {
               method: 'POST',
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   username: enteredUserName,
                   password: enteredPassword,
               }),
           }).then((res) => res.json())
               .then((data) => {
                   if (data.error) {
                       setError(data.error)
                   } else {
                       setLoginData({
                           username: '',
                           password: ''
                       })
                   }
               }).catch(error => console.log('error caught', error))

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input className="login-input-fields" type="text" name="username" placeholder="username"
                       value={username} onChange={changeHandler}/>
                <input className="login-input-fields" type="password" name="password" value={password}
                       placeholder="password" onChange={changeHandler}/>
                <button className="submit-login-btn" type="submit" name="submit">Log In</button>
            </form>
            {error}
        </div>
    )
}

export default LoginForm;