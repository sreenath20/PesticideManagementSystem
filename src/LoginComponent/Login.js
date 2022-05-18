import React, { useState } from 'react';
import './Login.css';
import LoginService from '../Services/LoginService';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Backdrop, CircularProgress } from '@material-ui/core';
import MenuBar from '../components/navigations/MenuBar';
import Footer from '../components/navigations/Footer'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ls from 'localstorage-slim';
import { useCookies } from 'react-cookie';
ls.config.encrypt = true


function Login() {
    const [cookie, setCookie]= useCookies()
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [loginFailureMsg, setLoginFailureMsg] = useState("");
    const [loginFailure, setLoginFailure] = useState(false);
    const [forgetEmail, setForgetEmail] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        });
    const changeHandle = e => {
        setLogin((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        var data = await LoginService.login(login)
            .then(response => {
                setLoginFailure(false)
            //     ls.set('token', JSON.stringify(response.data), { encrypt: true})
            //    const log =JSON.parse(ls.get('token'), { decrypt: true})
                if (response.data[0] === "Farmer" && response.data[1] === true) {
                    setCookie(response.data[0], response.data[2])
                    history('/farmer', { state: { email: login.email } })
                    
                }
                else if (response.data[0] === "Consultant" && response.data[1] === true) {
                    setCookie(response.data[0], response.data[2])
                    history('/consultant', { state: { email: login.email } })
                }
                else if (response.data[0] === "WarehouseOperator" && response.data[1] === true) {
                    setCookie("WarehouseOperator", response.data[2])
                    history('/warehouseoperator', { state: { email: login.email } })
                }
                else if (response.data[0] === "Admin" && response.data[1] === true) {
                    setCookie(response.data[0], response.data[2])
                    history('/admin', { state: { email: login.email } })
                }
                else if (response.data[0] === "DeliverPerson" && response.data[1] === true) {
                    setCookie("DeliverPerson", response.data[2])
                    history('/deliverperson', { state: { email: login.email } })
                }

            })
            .catch((error) => {
                setLoginFailure(true)
                setLoginFailureMsg(error.response.data)
            })
        setLoading(false)
    };
    const getpassword = async (e) => {
        e.preventDefault()

        setLoading(true)
        const data = await LoginService.forgetpassword(forgetEmail)
            .then((response) => {
              //  alert("Loading....")
                setFailure(false)
                setSuccess(true)
                setSuccessMsg(response.data)
                setFailureMsg("")
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setFailure(true)
                setSuccess(false)
                setSuccessMsg("")
                setFailureMsg(error.response.data)
            });
            setLoading(false)
    };
    return (
        <>
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <MenuBar />
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>

                            <Modal.Title><LockIcon/>Forget Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={getpassword}>
                                <div className="form-group mb-2">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter email" name="forgetemail" value={forgetEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" onChange={(e) => setForgetEmail(e.target.value)} required/>
                                </div>
                                <button type="submit" className="btn-light btn-change">submit</button>
                            </form>
                        </Modal.Body>
                        <div className='text-center'>
                            {success && <p className='text-center text-success'>{successMsg}</p>}
                            {failure && <p className='text-center text-danger'>{failureMsg}</p>}
                        </div>)
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="container container1">
                        <div className="row align-items-center">
                            <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                                <div className="card shadow border">
                                    <div className="card-body d-flex flex-column align-items-center">
                                        {loginFailure && <p className='text-center text-danger'>{loginFailureMsg}</p>}
                                        <h2 className="text-uppercase text-center mb-2"><LockOpenIcon/>Login</h2>
                                        <form onSubmit={handleSubmit}>

                                            <div className="form-group">
                                                <label >Email:</label>
                                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={login.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" onChange={changeHandle} required/>
                                            </div>

                                            <div className="form-group">
                                                <label >Password:</label>
                                                <input type="password" className="form-control mb-2" placeholder="Enter password" name="password" value={login.password} onChange={changeHandle} required />
                                            </div>

                                            <button type="submit" className="btn-light btn-change">Login</button>
                                            <button type="button" className="btn btn-link" onClick={handleShow}>forget Password?</button>
                                            <a href="/register">Farmer Register</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            </>}
        </>
    )
}

export default Login