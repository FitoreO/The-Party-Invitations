import {useEffect, useState} from "react";

const Form = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        password: '',
    });
    const [savedFormData, setSavedFormData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch('/api', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setSavedFormData(data.res)
            })
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }).then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrorMessage(data.error)
                } else if (data.newUser) {
                    setSavedFormData((prevList) => [...prevList, formData]);
                    setErrorMessage('');
                    setFormData({
                        firstName: "",
                        lastName: "",
                        number: "",
                        email: "",
                        password: "",
                    })
                }
            }).catch(error => console.log('error caught', error))
    }

    return (
        <div className="main-container">
            <p className="party-title">Welcome to the party of a lifetime</p>
            <form onSubmit={handleSubmit}>
                <div className="fields-container">
                    <div className="fields-wrapper">
                        <input className="input-fields" name="firstName" placeholder="First Name"
                               onChange={handleChange}
                               value={formData.firstName}/>
                        <label className="input-labels">
                            First Name
                        </label>
                    </div>
                    <div className="fields-wrapper">
                        <input className="input-fields" name="lastName" placeholder="Last Name"
                               onChange={handleChange}
                               value={formData.lastName}/>
                        <label className="input-labels">
                            Last Name
                        </label>
                    </div>
                    <div className="info-wrapper">
                        <div className="fields-wrapper">
                            <input className="input-fields" placeholder="Phone Number"
                                   onChange={handleChange} value={formData.number} name="number"/>
                            <label className="input-labels">
                                Phone Number
                            </label>
                        </div>
                        <div className="fields-wrapper">
                            <input className="input-fields" type="email" placeholder="Email" name="email"
                                   onChange={handleChange} value={formData.email}/>
                            <label className="input-labels">
                                Email
                            </label>
                        </div>
                    </div>
                    <div className="password-wrapper">
                        <input className="input-fields" type="password" id="passwordInput" placeholder="password"
                               name="password" value={formData.password}
                               onChange={handleChange}/>
                        <label className="input-labels">
                            Password
                        </label>
                    </div>
                </div>
                <p className="error-message">{errorMessage}</p>

                <div className="button-wrapper">
                    <button type="submit" className="submit-btn"
                            disabled={!formData.firstName || !formData.lastName || !formData.number || !formData.email || !formData.password}>Submit
                    </button>
                </div>
            </form>
            <p>Number of People that have signed up already:{savedFormData.length}</p>
            {savedFormData.map((formData, index) => (
                <div key={index}>
                    <p>Full Name: {formData.firstName} {formData.lastName}</p>
                    <p>Phone Number: {formData.number}</p>
                    <p>Email: {formData.email}</p>
                </div>))}

        </div>
    )
}

export default Form;