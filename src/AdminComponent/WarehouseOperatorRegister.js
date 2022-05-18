import React, { useState } from 'react';
import '../LoginComponent/Login.css';
import WarehouseOperatorService from '../Services/WarehouseOperatorService';
import { Backdrop, CircularProgress } from '@material-ui/core';

function WarehouseOperatorRegister() {
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [operator, setOperator] = useState(
        {
            operatorName: "",
            operatorEmail: "",
            operatorPhoneNo: 0,
        });
    const [operatorAddress, setOperatorAddress] = useState(
        {
            operatorDoorNo: 0,
            operatorPlace: "",
            operatorCity: "",
            operatorState: "",
            operatorPincode: 0
        });

    const changeHandle = e => {
        setOperator((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };
    const changeHandleAddress = e => {
        setOperatorAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }))
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const WarehouseOperatorTemp = { ...operator, operatorAddress };
        const data = await WarehouseOperatorService.create(WarehouseOperatorTemp)
            .then(response => {
                console.log(response.data)
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
                                <h2 className="text-uppercase text-center mb-5">operator Registration</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Name:</label>
                                        <input type="text" className="form-control" placeholder="Enter name" name="operatorName" value={operator.operatorName} onChange={changeHandle} required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Email:</label>
                                        <input type="email" className="form-control" placeholder="Enter email" name="operatorEmail" value={operator.operatorEmail} onChange={changeHandle} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" required/>
                                    </div>

                                    {/* <div className="form-group">
                                        <label >Password:</label>
                                        <input type="text" className="form-control" placeholder="Enter password" name="operatorPassword" value={operator.operatorPassword} onChange={changeHandle} required/>
                                    </div> */}

                                    <div className="form-group">
                                        <label >Phone Number:</label>
                                        <input type="number" className="form-control" placeholder="Enter phone number" name="operatorPhoneNo" value={operator.operatorPhoneNo} onChange={changeHandle} pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets" required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Address:</label>
                                        <input type="number" className="form-control mb-2" placeholder="Enter door number" name="operatorDoorNo" value={operatorAddress.operatorDoorNo} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter place" name="operatorPlace" value={operatorAddress.operatorPlace} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter city" name="operatorCity" value={operatorAddress.operatorCity} onChange={changeHandleAddress} required/>
                                        <input type="text" className="form-control mb-2" placeholder="Enter state" name="operatorState" value={operatorAddress.operatorState} onChange={changeHandleAddress} required/>
                                        <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="operatorPincode" value={operatorAddress.operatorPincode} onChange={changeHandleAddress} pattern="^\d{6}$" title="Pincode should be in 6 digits without any spaces or alphabets" required/>
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

export default WarehouseOperatorRegister