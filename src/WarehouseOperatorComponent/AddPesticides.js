import React, { useState } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import PesticideService from '../Services/PesticideService';

function AddPesticides() {
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [pesticides, setPesticides] = useState(
        {
            pestName: "",
            avlQtyInGm: 0,
            pricePerGm: 0.0,
        });

    const changeHandle = e => {
        setPesticides((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = await PesticideService.create(pesticides)
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
                                {success && <p className='text-center fw-bold fs-6 text-success'>Successfully added.</p>}
                                {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to add.<b>{failureMessage}</b></p>}
                                <h2 className="text-uppercase text-center mb-5">Add Pesticides</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Pesticide Name:</label>
                                        <input type="text" className="form-control" placeholder="Enter name" name="pestName" value={pesticides.pestName} onChange={changeHandle} />
                                    </div>

                                    <div className="form-group">
                                        <label >Available Quantity:</label>
                                        <input type="number" className="form-control" placeholder="Enter Available quantity" name="avlQtyInGm" value={pesticides.avlQtyInGm} onChange={changeHandle} />
                                    </div>

                                    <div className="form-group">
                                        <label >Price per Quantity:</label>
                                        <input type="number" step="0.01" className="form-control" placeholder="Enter price per quantity" name="pricePerGm" value={pesticides.pricePerGm} onChange={changeHandle} />
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

export default AddPesticides