import {useState} from "react";
import '../styles/login-form.css';

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [registeredData, setRegisteredData] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(true);
    const {username, password} = loginData;

    const changeHandler = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();

        fetch('/api/admin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        }).then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setRegisteredData(data.res)
                    setLoginData({
                        username: '',
                        password: ''
                    })
                    setShowForm(false)
                    setError('');
                }
            }).catch(error => console.log('error caught', error))
    }

    return (
        <div>
            {showForm && <form onSubmit={submitHandler}>
                <input className="login-input-fields" type="text" name="username" placeholder="username"
                       value={username} onChange={changeHandler}/>
                <input className="login-input-fields" type="password" name="password" value={password}
                       placeholder="password" onChange={changeHandler}/>
                <button className="submit-login-btn" type="submit" name="submit">Log In</button>
            </form>}
            <ol>
                {registeredData.map((data, index) => (
                    <li key={index} className="registered-form-data">
                        <p>Full Name: {data.firstName} {data.lastName}</p>
                        <p>Phone Number: {data.number}</p>
                        <p>Email: {data.email}</p>
                    </li>
                ))}
            </ol>
            {error && <div className="error-message">Invalid credentials</div>}
        </div>
    )
}

export default LoginForm;