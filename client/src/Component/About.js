import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const About = (props) => {
    const [userData, setUserData] = useState({email: "", name: "", dob: "" ,phone_no:"",gender:""})
    let Navigate = useNavigate();
    // const host = "http://localhost:5000"
    const host = "https://inotebookbackend-9on4.onrender.com"

    const getUserDeatils = async (e) => {
        
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },

            });
            const json = await response.json()
            setUserData(json.user);
            
            
            props.showAlert("This is your details!", "success");
        } catch (err) {
          
            props.showAlert("Sorry details not found!", "success");
            Navigate("/login")
        }

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserDeatils();
        }
        else {
            Navigate("/login");
        }

        // eslint-disable-next-line
    }, []);
    const onClick = () => {
        Navigate("/updateuser");
        
    }



    return (
        <>
            <div className="container emp-profile bg-light mt-4" style={{ width: "50%" }}>
                <form method="GET">
                    <div className="row align-item-center" >
                        <div className="col">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlTnnxeGDWRtjW1rzNwCMEdOYO12j80AZ2g&usqp=CAU" alt="PIC" />
                        </div>

                        <div className="col-6 text-center">

                            <h3 >Web Developer</h3>
                            <h5 >The iNotebook</h5>
                            <div className="row">
                                <div className="col-6">
                                   
                                    <div className="col-6 my-2">
                                        <label><b>Name:</b></label>
                                    </div>
                                    <div className="col-6 my-2">
                                        <label><b>Email:</b></label>
                                    </div>
                                    <div className="col-6 my-2">
                                        <label><b>DOB:</b></label>
                                    </div>
                                    <div className="col-6 my-2">
                                        <label><b>Mobile Number:</b></label>
                                    </div>
                                    <div className="col-6 my-2">
                                        <label><b>Gender:</b></label>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div>
                                       
                                        <div className="col my-2">
                                            <label>{userData.name}</label>
                                        </div>
                                        <div className="col-6 my-2">
                                            <label>{userData.email}</label>
                                        </div>
                                        <div className="col-6 my-2">
                                            <label>{userData.dob}</label>
                                        </div>
                                        <div className="col-6 my-3">
                                            <label>{userData.phone_no}</label>
                                        </div>
                                        <div className="col-6 my-4">
                                            <label>{userData.gender}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col mt-2">
                            <button type="button" className="btn btn-primary" onClick={onClick}>Edit Profile</button>
                        </div>






                    </div>

                </form >
            </div >

        </>
    )
}

export default About
