import React, { useState } from 'react'
import { IconButton, InputLabel, InputAdornment, Input } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { Backdrop, CircularProgress } from '@material-ui/core';
import FarmerService from '../Services/FarmerService'
import '../HomeComponent/Home.css'

function FarmerChangePassword(props) {
    const [type, setType] = useState(props.types)
    const [objects, setObjects] = useState(props.objects)
    const [showPassword, setShowPassword] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [failureMsg, setFailureMsg] = useState(null)
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(true)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword(false)
    };
    const handleClickShowOldPassword = () => {
        setShowOldPassword(true)
    };

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
        setShowOldPassword(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (newPassword === confirmPassword) {
            if (oldPassword === confirmPassword) {
                alert("Please enter different password.")
            } else {
                setLoading(true)
               const d= await FarmerService.changePassword(objects.email, oldPassword, confirmPassword)
                    .then((response) => {
                        setSuccess(true);
                        setFailure(false)
                    }).catch((error) => {
                        setFailureMsg(error.response.data)
                        setSuccess(false);
                        setFailure(true)
                    })
                    setLoading(false)
            }
        }
        else {
            alert("New password must match with confirm password")
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
                                {success && <p className='text-center fw-bold fs-6 text-success'>Successfully changed.</p>}
                                {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to update. <b>{failureMsg}</b></p>}
                                <h4 className="text-uppercase text-center mb-4">Change Password</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-2">
                                        <label >Old Password:</label>
                                        <Input
                                            type={showOldPassword ? "text" : "password"}
                                            className="form-control"
                                            name="oldPassword"
                                            value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowOldPassword}
                                                        onMouseDown={handleMouseDownOldPassword}
                                                    >
                                                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >New Password:</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Confirm New Password Password:</label>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmPassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            required
                                        />
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

export default FarmerChangePassword