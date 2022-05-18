import React, { useState } from 'react';
import '../LoginComponent/Login.css';
import ConsultantService from '../Services/ConsultantService';
import { Backdrop, CircularProgress } from '@material-ui/core';

var changeRegister =false
function ConsultantRegister() {
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [consultant, setConsultant] = useState(
        {
            consultantName: "",
            consultantEmail: "",
           // consultantPassword:"",
            consultantPhoneNo: 0,
        });
    const [consultantAddress, setConsultantAddress] = useState(
        {
            consultantDoorNo: 0,
            consultantPlace: "",
            consultantCity: "",
            consultantState: "",
            consultantPincode: 0
        });

    const changeHandle = e => {
        setConsultant((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };
    const changeHandleAddress = e => {
        setConsultantAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }))
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const ConsultantTemp = { ...consultant, consultantAddress };
        const data = await ConsultantService.create(ConsultantTemp)
            .then(response => {
                console.log(response.data)
                SetSuccess(true);
                SetFailure(false)
                changeRegister =true
            })
            .catch(error => {
                SetFailureMessage(error.response.data)
                SetSuccess(false);
                SetFailure(true)
            })
        setLoading(false)
        changeRegister =false
    };

    return (
        <>
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <div className="row d-flex justify-content-center  align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7  col-xl-6">
                        <div className="card " >
                            <div className="card-body p-5">
                                {success && <p className='text-center fw-bold fs-6 text-success'>Successfully registered. check your mail.</p>}
                                {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to register. <b>{failureMessage}</b></p>}
                                <h2 className="text-uppercase text-center mb-5">Consultant Registration</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Name:</label>
                                        <input type="text" className="form-control" placeholder="Enter name" name="consultantName" value={consultant.consultantName} onChange={changeHandle} required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Email:</label>
                                        <input type="email" className="form-control" placeholder="Enter email" name="consultantEmail" value={consultant.consultantEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" onChange={changeHandle} required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Phone Number:</label>
                                        <input type="number" className="form-control" placeholder="Enter phone number" name="consultantPhoneNo" value={consultant.consultantPhoneNo} onChange={changeHandle} pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets" required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Address:</label>
                                        <input type="number" className="form-control mb-2" placeholder="Enter door number" name="consultantDoorNo" value={consultantAddress.consultantDoorNo} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter place" name="consultantPlace" value={consultantAddress.consultantPlace} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter city" name="consultantCity" value={consultantAddress.consultantCity} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter state" name="consultantState" value={consultantAddress.consultantState} onChange={changeHandleAddress} required/>
                                        <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="consultantPincode" value={consultantAddress.consultantPincode} onChange={changeHandleAddress} pattern="^\d{6}$" title="Pincode should be in 6 digits without any spaces or alphabets" required/>
                                    </div>

                                    <button type="submit" className="btn-light btn-change">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ConsultantRegister
export {changeRegister}