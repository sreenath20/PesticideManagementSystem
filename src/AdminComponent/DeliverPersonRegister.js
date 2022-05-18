import React, { useState } from 'react';
import '../LoginComponent/Login.css';
import DeliverPersonService from '../Services/DeliverPersonService';
import { Backdrop, CircularProgress } from '@material-ui/core';


function DeliverPersonRegister() {
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [delivery, setDelivery] = useState(
        {
            name: "",
            email: "",
           phoneNo: 0,
        });
    const [deliverAddress, setDeliverAddress] = useState(
        {
            doorNo: 0,
            place: "",
            city: "",
            state: "",
            pincode: 0
        });

    const changeHandle = e => {
        setDelivery((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };
    const changeHandleAddress = e => {
        setDeliverAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }))
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const deliverPersonTemp = { ...delivery, deliverAddress };
        const data = await DeliverPersonService.create(deliverPersonTemp)
            .then(response => {
                SetSuccess(true);
                SetFailure(false)
            })
            .catch(error => {
                SetFailureMessage(error.response.data)
                SetSuccess(false);
                SetFailure(true)
            })
        setLoading(false)
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
                                <h2 className="text-uppercase text-center mb-5">Deliver Person Registration</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Name:</label>
                                        <input type="text" className="form-control" placeholder="Enter name" name="name" value={delivery.name} onChange={changeHandle} required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Email:</label>
                                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={delivery.email} onChange={changeHandle} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Phone Number:</label>
                                        <input type="number" className="form-control" placeholder="Enter phone number" name="phoneNo" value={delivery.phoneNo} onChange={changeHandle} pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets" required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Address:</label>
                                        <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={deliverAddress.doorNo} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={deliverAddress.place} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={deliverAddress.city} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={deliverAddress.state} onChange={changeHandleAddress} required/>
                                        <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="pincode" value={deliverAddress.pincode} onChange={changeHandleAddress} pattern="^\d{6}$" title="Pincode should be in 6 digits without any spaces or alphabets" required/>
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

export default DeliverPersonRegister
