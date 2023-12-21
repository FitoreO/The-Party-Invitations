import {useState} from "react";

const Form = () => {

    const [counter, setCounter] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        setCounter(counter + 1);
    }

    return (
        <div className="main-container">
            <p className="party-title">Welcome to the party of a lifetime</p>
            <form onSubmit={handleSubmit}>
                <div className="participation-wrapper">
                    Will you be joining us?
                    <div className="participation">
                        <label>
                            <input type="radio" value="Yes" name="participate"/>
                            Yes
                        </label>
                    </div>
                    <div className="participation">
                        <label>
                            <input type="radio" value="No" name="participate"/>
                            No
                        </label>
                    </div>
                </div>
                <div className="fields-container">
                    <div className="fields-wrapper">
                        <input className="input-fields" placeholder="First Name"/>
                        <label className="input-labels">
                            First Name
                        </label>
                    </div>
                    <div className="fields-wrapper">
                        <input className="input-fields" placeholder="Last Name"/>
                        <label className="input-labels">
                            Last Name
                        </label>
                    </div>
                    <div className="info-wrapper">
                        <div className="fields-wrapper">
                            <input className="input-fields" placeholder="Phone Number"/>
                            <label className="input-labels">
                                Phone Number
                            </label>
                        </div>
                        <div className="fields-wrapper">
                            <input className="input-fields" placeholder="Email"/>
                            <label className="input-labels">
                                Email
                            </label>
                        </div>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
            <p>Number of People that have signed up already:{counter}</p>
        </div>
    )
}

export default Form;