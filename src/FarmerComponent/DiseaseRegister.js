import React, { useState } from 'react'
import axios from "axios";
import { Backdrop, CircularProgress } from '@material-ui/core';

function DiseaseRegister(props) {
    const [femail, setFarmerEmail] = useState(props.farmersEmail)
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [fileName, setFileName] = useState(null);
    const [acre, setAcre] = useState()
    const [diseaseDescription, setDiseaseDescription] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    
    const formData = new FormData();
    formData.append("email", femail)
    formData.append("diseaseDescription", diseaseDescription)
    formData.append("acre", acre)
    formData.append("diseaseImage", fileName)

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        var image = document.getElementById("imag");
        var size = parseFloat(image.files[0].size / (1024 * 1024)).toFixed(2); 

        if(size > 1) {

            document.getElementById("imageSize").innerHTML = "Please select image size less than 1 MB"

        }else{

            setLoading(true)
            await axios({
                method: 'post',
                url: 'http://localhost:8091/disease/add',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                SetSuccess(true)
                SetFailure(false)
            })
                .catch((e) => {
                    SetSuccess(true)
                    SetFailure(false)
                })
                setLoading(false)

        }
      
    }
    return (
        <>
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <div className="row d-flex justify-content-center  align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7  col-xl-6">
                        <div className="card " >
                            <div className="card-body p-5">
                                {success && <p className='text-center fw-bold fs-6 text-success'>Successfully Added.</p>}
                                {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to register. <b>{failureMessage}</b></p>}
                                <p id="imageSize" className='text-center fw-bold fs-6 text-danger'></p>
                                <h4 className="text-uppercase text-center mb-4">Add CROP Disease</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Disease Description:</label>
                                        <textarea className="form-control" rows = "3" placeholder = "Enter description" name="diseaseDescription" value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} required/>
                                        {/* <input type="textArea" className="form-control" placeholder="Enter description" name="diseaseDescription" value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} required/> */}
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Total Acres Affected:</label>
                                        <input type="number" className="form-control" placeholder="Enter acre" value={acre} name="acre" onChange={(e) => setAcre(e.target.value)} required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Upload image:</label>
                                        <input type="file" id="imag" className="form-control" onChange={(e) => setFileName(e.target.files[0])} required/>
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

export default DiseaseRegister