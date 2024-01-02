import {useState} from "react";

const Form = () => {

    const [counter, setCounter] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        password: '',
        participation: ""
    });
    const [savedFormData, setSavedFormData] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleRadioChange = (event) => {
        const {value} = event.target;
        setFormData((prevFormData) => {
            return {...prevFormData, participation: value};
        });
    };

    const handleSubmit = (e) => {

        if (!formData.firstName || !formData.lastName || !formData.number || !formData.email || !formData.password || !formData.participation) {
            alert("Please fill in all required fields");
            return;
        }

        e.preventDefault();
        setCounter(counter + 1);
        setSavedFormData((prevList) => [...prevList, formData]);
        setFormData({
            firstName: "",
            lastName: "",
            number: "",
            email: "",
            password: "",
            participation: "",
        })
    }

    return (
        <div className="main-container">
            <p className="party-title">Welcome to the party of a lifetime</p>
            <form onSubmit={handleSubmit}>
                <div className="participation-wrapper">
                    Will you be joining us?
                    <div className="participation">
                        <label>
                            <input type="radio" name="participate" value="Yes"
                                   checked={formData.participation === "Yes"}

                                   onChange={handleRadioChange}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="participation">
                        <label>
                            <input type="radio" name="participate" value="No" checked={formData.participation === "No"}

                                   onChange={handleRadioChange}/>
                            No
                        </label>
                    </div>
                </div>
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
                        <input className="input-fields" type="password" placeholder="password" name="password" value={formData.password}
                               onChange={handleChange}/>
                        <label className="input-labels">
                            Password
                        </label>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button type="submit" className="submit-btn" disabled={!formData.firstName || !formData.lastName ||!formData.participation || !formData.number || !formData.email || !formData.password}>Submit
                    </button>
                </div>
            </form>
            <p>Number of People that have signed up already:{counter}</p>
            {savedFormData.map((formData, index) => (
                <div key={index}>
                    <p>Full Name: {formData.firstName} {formData.lastName}</p>
                    <p>Will you participate: {formData.participation}</p>
                    <p>Phone Number: {formData.number}</p>
                    <p>Email: {formData.email}</p>
                </div>))}

        </div>
    )
}

export default Form;