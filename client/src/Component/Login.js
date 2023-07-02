import '../App.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();
    // const host = "http://localhost:5000";
    const host = "https://inotebookbackend-9on4.onrender.com"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Loggedin successfully!", "success");
            history("/");


        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            {/* <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label> */}
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control form-control-lg" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            {/* <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label> */}
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control form-control-lg" autoComplete="off" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                                        </div>



                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    </form>

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login