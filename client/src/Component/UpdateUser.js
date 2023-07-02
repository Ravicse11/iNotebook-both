
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateUser=(props) =>{
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", phone_no: "", dob: "",gender:""})
    let history = useNavigate();
    const { name, email, password, phone_no, dob,gender } = credentials;
    // const host="http://localhost:5000";
    const host = "https://inotebookbackend-9on4.onrender.com";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/updateuser`, {
            method: 'PUT',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone_no,dob,gender })
        });
        const json = await response.json();
        // console.log(json);
            history("/about");
            props.showAlert("Account updated successfully!", "success");

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div>
      
      <section className="vh-100 gradient-custom" >
            <div className="container py-3 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Update Details</h3>
                                <form onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md mb-3">

                                            <div className="form-outline">
                                                {/* <input type="text" id="firstName" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="firstName">First Name</label> */}
                                                <label htmlFor="name" className="form-label">Name </label>
                                                <input type="text" className="form-control form-control-lg" id="name" name="name" aria-describedby="emailHelp" value={name} onChange={onChange} />


                                            </div>

                                        </div>

                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md mb-3">

                                            <div className="form-outline">

                                                <label htmlFor="email" className="form-label">Email address</label>
                                                <input type="email" className="form-control form-control-lg" id="email" name="email" aria-describedby="emailHelp" value={email} onChange={onChange} />

                                            </div>

                                        </div> */}

                                    </div>
                                    <div className="row">

                                        <div className="col-md-6 mb-3 pb-2">

                                            <div className="form-outline">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control form-control-lg" autoComplete="off" id="password" name="password" aria-describedby="emailHelp" value={password} minLength={5} onChange={onChange} required />
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">

                                            <div className="form-outline">
                                                <label htmlFor="phone_no" className="form-label">Mobile Number</label>
                                                <input type="text" className="form-control form-control-lg" id="phone_no" name="phone_no" aria-describedby="emailHelp" value={phone_no} minLength={10} onChange={onChange}  />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3 d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <label htmlFor="dob" className="form-label">Birthday</label>
                                                <input type="text" className="form-control form-control-lg" id="dob" name="dob" value={dob} onChange={onChange} />

                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-3">

                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <input type="text" className="form-control form-control-lg" id="gender" name="gender" value={gender} onChange={onChange} />


                                            

                                         

                                        </div> 
                                    </div>


                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default UpdateUser



