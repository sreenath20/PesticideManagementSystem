import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import DeliverPersonService from '../Services/DeliverPersonService'
import ShipmentService from '../Services/ShipmentService';
import DeliverPersonChangePassword from './DeliverPersonChangePassword';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { Backdrop, CircularProgress } from '@material-ui/core';
import '../HomeComponent/Home.css'
import EditIcon from '@material-ui/icons/BorderColor';
import FarmerService from '../Services/FarmerService'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import '../HomeComponent/Home.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginService from '../Services/LoginService';
import HomeIcon from '@material-ui/icons/Home';
import CountService from '../Services/CountService';
import { useCookies } from 'react-cookie';

function DeliverPersonHome() {
  const[cookie,setCookie,removeCookie] = useCookies()
  const location = useLocation();
  const [start, setStart] = useState(true);
  const [show, setShow] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [showDeliverPersonView, setShowDeliverPersonView] = useState(false);
  const [deliverPersonEmail, setDeliverPersonEmail] = useState()
  const [isProfile, setIsProfile] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [deliverPerson, setDeliverPerson] = useState([])
  const [welcomeMsg, setWelcomeMsg] = useState("")
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [changeEffect, setChangeEffect] = useState(true)
  const [deliverPersonTemp, setdeliverPersonTemp] = useState(
    {
      "name": "",
      "email": "",
      "phoneNo": "",
      "doorNo": "",
      "place": "",
      "city": "",
      "state": "",
      "pincode": ""
    });
  const [isShipmentUpdate, setIsShipmentUpdate] = useState(false)
  const [orderHistory, setOrderHistory] = useState([])
  const [farmers, setFarmers] = useState([])

  const [deliveredCount, setDeliveredCount] = useState()
  const [intimationCount, setIntimationCount] = useState()
  const [refusedCount, setRefusedCount] = useState()
  const [waitingCount, setWaitingCount] = useState()

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }
  const useStyles = makeStyles({
    summary: {
      backgroundColor: '#ccffcc',
    }
  });

  const classes = useStyles();

  useEffect(async () => {
  
    setLoading(true)
    const data = await LoginService.getDeliveryPerson()
      .then((response) => {
        setDeliverPerson(response.data)
        setDeliverPersonEmail(location.state.email)
        setLastLogin(response.data.lastLogin)
        setdeliverPersonTemp({
          "name": response.data['name'],
          "email": response.data['email'],
          "phoneNo": response.data['phoneNo'],
          "doorNo": response.data['deliverAddress'].doorNo,
          "place": response.data['deliverAddress'].place,
          "city": response.data['deliverAddress'].city,
          "state": response.data['deliverAddress'].state,
          "pincode": response.data['deliverAddress'].pincode
        })
        setWelcomeMsg(response.data['name'])
      })
       .catch((err)=>{
        setLoading(false)
        navigate('/login')
      })

    const data2 = ShipmentService.getAll()
      .then((response) => {
        setOrderHistory(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      })
    const data1 = await FarmerService.getAll()
      .then((response) => {
        setFarmers(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      });


      const data7 = await CountService.countByDeliverPerson(location.state.email)
      .then((response) => {
        setDeliveredCount(response.data)
      })


    const data4 = await CountService.countByDeliverPersonAndShipmentStatus(location.state.email,"Intimation")
      .then((response) => {
        setIntimationCount(response.data)
      })

    const data5 = await CountService.countByDeliverPersonAndShipmentStatus(location.state.email,"Refused")
      .then((response) => {
        setRefusedCount(response.data)
      })

    const data6 = await CountService.countByDeliverPersonAndShipmentStatus(location.state.email,"Your order has been placed successfully and will be delivered shortly.")
      .then((response) => {
        setWaitingCount(response.data)
      })
    setLoading(false)
  }, [changeEffect])

  const logout = () => {
    const logoutDTO = {
      "email":deliverPersonEmail,
      "type": "DeliverPerson"
    }
    LoginService.logout(logoutDTO)
      .then((response) => {
        removeCookie(logoutDTO.type)
        navigate('/')
        localStorage.removeItem("token");
      })
  };
  const profile = () => {
    setIsProfile(true)
    setIsChangePassword(false)
    setIsShipmentUpdate(false)
    setStart(false)

  };
  const changePassword = () => {
    setIsProfile(false)
    setIsChangePassword(true)
    setIsShipmentUpdate(false)
    setStart(false)
  };
  const updateShipment = () => {
    setIsProfile(false)
    setIsShipmentUpdate(true)
    setIsChangePassword(false)
    setStart(false)
  }
  const changeHandleDeliverPersonView = e => {
    setdeliverPersonTemp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };
  const handleSubmitDeliverPersonView = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await DeliverPersonService.update(deliverPersonEmail, deliverPersonTemp)
      .then(response => {
        setChangeEffect(false)
        setSuccess(true);
        setFailure(false)

      })
      .catch(error => {
        //setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChangeEffect(true)
  };
  const handleCloseDeliverPersonView = () => setShowDeliverPersonView(false);
  const handleShowDeliverPersonView = () => setShowDeliverPersonView(true);
  const updateDelivery = async (id) => {

    var ele = document.getElementById(id);
    var status = ele.options[ele.selectedIndex].text;


    if (status === "Delivered") {
      setLoading(true)
      let paidStatus = "Paid"
      const shipmentTemp = { id, status, paidStatus }
      // alert(JSON.stringify(shipmentTemp))
      const data = await ShipmentService.updateShipment(shipmentTemp)
        .then((response) => {
          alert("Success")
          setChangeEffect(false)

        })
        .catch((error) => {
          alert(error.response.data)
        })
      setLoading(false)
      setChangeEffect(true)
    }
    else {
      setLoading(true)
      let paidStatus = "Not Paid"
      const shipmentTemp = { id, status, paidStatus }
      //  alert(JSON.stringify(shipmentTemp))
      const data = await ShipmentService.updateShipment(shipmentTemp)
        .then((response) => {
          setChangeEffect(false)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      setLoading(false)
      setChangeEffect(true)
    }

  }

  return (
    <>
      {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {!loading &&
        <>
          <nav className="navbar navbar-expand-sm navbar-dark Menu">
            <div className="container-fluid">
              <div className='navbar-header'>
                <p className='welcome w2 start_Msg'> <HomeIcon fontSize="large" onClick={() => window.location.reload(false)} /></p>

              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button className='buttonStyle' data-bs-toggle="tooltip" title="Profile" onClick={profile} ><AccountCircleIcon fontSize="large" /></button>
                  </li>
                  <li className="nav-item">
                    <button className='buttonStyle' onClick={updateShipment} >Update Shipment</button>
                  </li>
                  <li className="nav-item">
                    <button className='buttonStyle' onClick={changePassword} >Change Password</button>
                  </li>
                  {/* <button className='btn btn-default' data-bs-toggle="tooltip" title="Logout" onClick={logout}><PowerSettingsNewIcon /></button> */}
                  <li className="nav-item">
                    <button className='buttonStyle' onClick={logout} >Logout</button>
                  </li>
                </ul>
              </div>
            </div>
            <HomeIcon fontSize='large' className='last_Login w1 homeButton' onClick={() => window.location.reload(false)} />

          </nav>
          <p className='welcome'>Welcome: <b>{welcomeMsg}</b></p>
          {isProfile && <>
            <Modal show={showDeliverPersonView} onHide={handleCloseDeliverPersonView}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitDeliverPersonView}>
                  <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="name" value={deliverPersonTemp.name} onChange={changeHandleDeliverPersonView} />
                  </div>

                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" readOnly value={deliverPersonTemp.email} onChange={changeHandleDeliverPersonView} />
                  </div>

                  <div className="form-group">
                    <label >Phone Number:</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" name="phoneNo" value={deliverPersonTemp.phoneNo} onChange={changeHandleDeliverPersonView} />
                  </div>

                  <div className="form-group">
                    <label >Address:</label>
                    <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={deliverPersonTemp.doorNo} onChange={changeHandleDeliverPersonView} />
                    <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={deliverPersonTemp.place} onChange={changeHandleDeliverPersonView} />
                    <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={deliverPersonTemp.city} onChange={changeHandleDeliverPersonView} />
                    <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={deliverPersonTemp.state} onChange={changeHandleDeliverPersonView} />
                    <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="pincode" value={deliverPersonTemp.pincode} onChange={changeHandleDeliverPersonView} />
                  </div>
                  <button type="submit" className="btn-light btn-change">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>
                {success && <p className='text-center text-success'>Successfully updated</p>}
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeliverPersonView}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className=" container">
              <h5 className="text-uppercase text-center mb-4">View Profile</h5>
              <button className='btn btn-default' data-bs-toggle="tooltip" title="Edit details" onClick={handleShowDeliverPersonView}> <EditIcon /></button>
              <div className="card mb-4   ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{deliverPerson.name}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{deliverPerson.email}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone No</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{deliverPerson.phoneNo}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{deliverPerson.deliverAddress.doorNo},
                        {deliverPerson.deliverAddress.place},<br />
                        {deliverPerson.deliverAddress.city},<br />
                        {deliverPerson.deliverAddress.state},<br />
                        {deliverPerson.deliverAddress.pincode}</b>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Login</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{lastLogin}</b></p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </>}
          {isChangePassword && <DeliverPersonChangePassword objects={deliverPerson} />}

          {isShipmentUpdate && <>
            {orderHistory.map((f, index) => {
              return ((f.agree === "Approved" && f.shipmentStatus !== "Refused" && f.shipmentStatus !== "Delivered" && f.deliverPersonEmail === deliverPersonEmail) && <>

                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.summary}
                  >
                    <Typography>Farmer Name: <b>{farmers.find(it => it.email == f.farmerEmail).name}</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails >
                    <Typography>
                      <div className="container-fluid">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Farmer Email</td>
                              <td>:</td>
                              <td><b>{farmers.find(it => it.email == f.farmerEmail).email}</b></td>
                            </tr>
                            <tr>
                              <td>Farmer Phone Number</td>
                              <td>:</td>
                              <td><b>{farmers.find(it => it.email == f.farmerEmail).phoneNo}</b></td>
                            </tr>
                            <tr>
                              <td>Farmer Address</td>
                              <td>:</td>
                              <td><b>{farmers.find(it => it.email == f.farmerEmail).address.doorNo},
                                {farmers.find(it => it.email == f.farmerEmail).address.place},
                                {farmers.find(it => it.email == f.farmerEmail).address.city},
                                {farmers.find(it => it.email == f.farmerEmail).address.state},
                                {farmers.find(it => it.email == f.farmerEmail).address.pincode}</b></td>
                            </tr>
                            <tr>
                              <td>Disease Description</td>
                              <td>:</td>
                              <td><b>{f.disease.diseaseDescription}</b></td>
                            </tr>
                            <tr>
                              <td>Pesticides count</td>
                              <td>:</td>
                              <td><b>{f.count}</b></td>
                            </tr>
                            <tr>
                              <td>Total Amount</td>
                              <td>:</td>
                              <td><b>{f.totalPay + f.consultationFee}</b></td>
                            </tr>
                            <tr>
                              <td>Payment Status</td>
                              <td>:</td>
                              <td><b>{f.paid}</b></td>
                            </tr>
                            <tr>
                              <td>Payment Through</td>
                              <td>:</td>
                              <td> {f.paid === "Paid" ?
                                <b>{f.payThrough}</b>
                                :
                                <b>Waiting for Payment</b>
                              }</td>
                            </tr>
                            <tr>
                              <td>Delivery Status</td>
                              <td>:</td>
                              <td><b>{f.deliveryStatus}</b></td>
                            </tr>
                            <tr>
                              <td>Select Delivery Report</td>
                              <td>:</td>
                              <td>
                                <select id={f.id} name="status">
                                  <option value="Delivered">Delivered</option>
                                  <option value="Intimation">Intimation</option>
                                  <option value="Refused">Refused</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>Action</td>
                              <td>:</td>
                              <td> <button type="button" className="btn btn-success" onClick={() => {
                                updateDelivery(f.id)
                              }}>Update delivery</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>




              </>)
            }
            )
            }
          </>
          }
          {start &&
            <>
              <h5 className="start otherFarmer">Welcome to Pesticide Management System <br /> Deliver Person</h5>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                    <div className="card shadow border">
                      <div className="card-body d-flex flex-column align-items-center">
                        <table class="table  table-condensed table-hover table-bordered table-striped">
                          <tbody>
                            <tr>
                              <td>Total order waiting for delivery</td>
                              <td>:</td>
                              <td><b>{waitingCount}</b></td>
                            </tr>
                            <tr>
                              <td>Total order still in intimation</td>
                              <td>:</td>
                              <td><b>{intimationCount}</b></td>
                            </tr>
                            <tr>
                              <td>Total order refused</td>
                              <td>:</td>
                              <td><b>{refusedCount}</b></td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>}
        </>}
    </>

  )
}

export default DeliverPersonHome