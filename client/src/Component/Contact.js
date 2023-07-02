import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Contact() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {

        } else {
            navigate('/login')
        }
    });
    // props.showAlert("Welcome to contact page!", "success");
    return (
        <>

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115133.01016846212!2d85.07300244877165!3d25.60802076448389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d4f05%3A0x831a0e05f607b270!2sPatna%2C%20Bihar%2C%20India!5e0!3m2!1sen!2snl!4v1680371542364!5m2!1sen!2snl" width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
            <div className="container bg-light">
                <div className="container">
                    <h2 className="fw-bold mb-2 text-uppercase text-center">Contact Us</h2>


                    <div className="container">

                        <div className="row">
                            <div className="col border border-3 text-center rounded-pill">
                                <i className="fa-sharp fa-solid fa-envelope"></i>
                                <span className='ms-2'><b>Email:</b></span>
                                <span>contactustoravi@gmail.com</span>
                            </div>


                            <div className="col mx-2 border border-3 text-center rounded-pill">
                                <i className="fa-solid fa-person "></i>
                                <span className='ms-2'><b>Name:</b></span>
                                <span>iNotebook Empire</span>
                            </div>


                            <div className="col border border-3 text-center rounded-pill">
                                <i className="fa-solid fa-phone"></i>
                                <span className='ms-2'><b>Number:</b></span>
                                <span>6521215451</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5" style={{ width: "50%" }}>

                    <form action="https://formspree.io/f/mrgvyale" method="POST">
                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="Type Your Email address" aria-describedby="emailHelp" />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <input type="text" placeholder="Type Your Name" className="form-control" name="name" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <input type="text" placeholder="Type Your Number" className="form-control" name="number" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <textarea type="text" placeholder="Type Here" className="form-control" name="message" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact
