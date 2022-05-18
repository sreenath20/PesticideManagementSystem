import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FarmerService from '../Services/FarmerService';
import { useNavigate } from 'react-router-dom';
import DiseaseRegister from './DiseaseRegister';
import { Modal } from 'react-bootstrap'
import './FarmerCss.css'
import ShipmentService from '../Services/ShipmentService';
import FarmerChangePassword from './FarmerChangePassword';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Button } from 'react-bootstrap'
import { Backdrop, CircularProgress } from '@material-ui/core';
import '../HomeComponent/Home.css'
import EditIcon from '@material-ui/icons/BorderColor';
import LoginService from '../Services/LoginService';
import HomeIcon from '@material-ui/icons/Home';
import CountService from '../Services/CountService';
import { useCookies } from 'react-cookie';

function FarmerHome() {
  const [cookie, setCookie, removeCookie] = useCookies()
  const location = useLocation();
  const [start, setStart] = useState(true);
  const [show, setShow] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [farmerEmail, setFarmerEmail] = useState()
  const [isProfile, setIsProfile] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [isDisease, setIsDisease] = useState(false)
  const [isViewDisease, setIsViewDisease] = useState(false)
  const [cart, setCart] = useState(null)
  const [pay, setPay] = useState(true)
  const [farmer, setFarmer] = useState([null])
  const [farmers, setFarmers] = useState([null])
  const [orderHistory, setOrderHistory] = useState([null])
  const [showPest, setShowPest] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState("")
  const [image, setImage] = useState("")
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [showFarmerView, setShowFarmerView] = useState(false);
  const [farmerView, setFarmerView] = useState(
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
  const [pesticides, setPesticides] = useState([{
    pesticideName: "",
    pesticideQtyReq: 0,
    pesticidePricePerUnit: 0.0
  }])
  const [diseaseCountByFarmerCount, setDiseaseCountByFarmerCount] = useState()
  const [diseasePendingCount, setDiseasePendingCount] = useState()
  const [diseaseInProgressCount, setDiseaseInProgressCount] = useState()
  const [diseaseCompletedCount, setDiseaseCompletedCount] = useState()
  const [farmerAgree, setFarmerAgree] = useState({})
  
  const useStyles = makeStyles({
    summary: {
      backgroundColor: '#ccffcc',
    }
  });
  const useStylesNotComplete = makeStyles({
    summary: {
      backgroundColor: '#ffd6cc',
    }
  });
  const classes = useStyles();
  const classesNotComplete = useStylesNotComplete();
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (id) => {
    setImage(id)
    setShow(true);
  }
  const [disease, setDisease] = useState([{
    "diseaseDescription": "",
    "acre": 0,
    "addedDate": Date,
    "image": "",
  }])


  useEffect(async () => {
    setLoading(true)
    const data = await LoginService.getFarmer()
      .then((response) => {
        setFarmer(response.data)
        setFarmers(response.data)
        setFarmerEmail(location.state.email)
        setLastLogin(response.data.lastLogin)
        setFarmerView({
          "name": response.data['name'],
          "email": response.data['email'],
          "phoneNo": response.data['phoneNo'],
          "doorNo": response.data['address'].doorNo,
          "place": response.data['address'].place,
          "city": response.data['address'].city,
          "state": response.data['address'].state,
          "pincode": response.data['address'].pincode
        })
        setCart(response.data['cart'])
        setWelcomeMsg(response.data['name'])

      })
      .catch((err) => {
        setLoading(false)
        navigate('/login')
      })
    const data3 = await ShipmentService.getAll()
      .then((response) => {
        setOrderHistory(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      })


    const data4 = await CountService.diseaseCountByFarmer(location.state.email)
      .then((response) => {
        setDiseaseCountByFarmerCount(response.data)
      })
    const data5 = await CountService.countByFarmerAndReviewStatus(location.state.email, "Pending")
      .then((response) => {
        setDiseasePendingCount(response.data)
      })
    const data6 = await CountService.countByFarmerAndReviewStatus(location.state.email, "InProgress")
      .then((response) => {
        setDiseaseInProgressCount(response.data)
      })
    const data7 = await CountService.countByFarmerAndReviewStatus(location.state.email, "Completed")
      .then((response) => {
        setDiseaseCompletedCount(response.data)
      })

    setLoading(false)
  }, [pay])

  const logout = () => {
    const logoutDTO = {
      "email": farmerEmail,
      "type": "Farmer"
    }
    LoginService.logout(logoutDTO)
      .then((response) => {
        removeCookie(logoutDTO.type)
        localStorage.removeItem("token");
        navigate('/')
      })
  };
  const profile = () => {

    setIsProfile(true)
    setIsDisease(false)
    setIsViewDisease(false)
    setIsChangePassword(false)
    setStart(false)

  };
  const diseaseRegister = () => {
    setIsProfile(false)
    setIsDisease(true)
    setIsViewDisease(false)
    setIsChangePassword(false)
    setStart(false)

  };
  const changePassword = () => {
    setIsProfile(false)
    setIsDisease(false)
    setIsViewDisease(false)
    setIsChangePassword(true)
    setStart(false)

  };
  const viewDisease = async (event) => {
    // event.preventDefault()
    setLoading(true)
    const data3 = await ShipmentService.getAll()
      .then((response) => {
        setOrderHistory(response.data)
        setIsProfile(false)
        setIsDisease(false)
        setIsViewDisease(true)
        setIsChangePassword(false)
        setStart(false)
      })
      .catch((error) => {
        alert(error.response.data)
      })
    setLoading(false)
  };
  const handleClosePest = () => {
    setShowPest(false);
  }
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })

  }
  const handleSubmitPaymentConsultantFee = async (id, st, tot_pay) => {
    //  alert(st)
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert("Please be in online")
      return
    }
    const options = {
      key: "rzp_test_KnfJLkeqBwokud",
      currency: "INR",
      amount: tot_pay * 100,
      name: "Pesticide Management Service",
      description: "Thank you",

      handler: function (response) {
        if (response.razorpay_payment_id !== null) {
          setLoading(true)
          const data = ShipmentService.agree(id, st, response.razorpay_payment_id)
            .then(response => {
              setPay(false)
            })
            .catch(error => {
              alert(error.response.data)
            })
          setPay(true)
          setLoading(false)
        }
        else {
          alert("Payment failed")
        }

      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

  }



  const handleSubmitPayment = async (id, st, tot_pay) => {

    let status = "Online Payment"
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert("Please be in online")
      return
    }
    const options = {
      key: "rzp_test_KnfJLkeqBwokud",
      currency: "INR",
      amount: tot_pay * 100,
      name: "Pesticide Management Service",
      description: "Thank you for purchasing pesticides",

      handler: function (response) {
        if (response.razorpay_payment_id !== null) {
          setLoading(true)
          const data = ShipmentService.agree(id, status, response.razorpay_payment_id)
            .then(response => {
              setPay(false)
            })
            .catch(error => {
              alert(error.response.data)
            })
          setPay(true)
          setLoading(false)
        }
        else {
          alert("Payment failed")
        }

      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

  }
  const changeHandleFarmerView = e => {
    setFarmerView((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmitFarmerView = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await FarmerService.update(farmers.email, farmerView)
      .then(response => {
        setSuccess(true);
        setFailure(false)
        setPay(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setPay(true)
    setLoading(false)
  };
  const handleCloseFarmerView = () => setShowFarmerView(false);
  const handleShowFarmerView = () => setShowFarmerView(true);


  return (
    <>
      {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {!loading && <>
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
                  <button className='buttonStyle' onClick={diseaseRegister} >Crop Disease Entry</button>
                </li>
                <li className="nav-item">
                  <button className='buttonStyle' onClick={viewDisease} >View Crop Disease</button>
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
          <Modal show={showFarmerView} onHide={handleCloseFarmerView}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitFarmerView}>
                <div className="form-group">
                  <label >Name:</label>
                  <input type="text" className="form-control" placeholder="Enter name" name="name" value={farmerView.name} onChange={changeHandleFarmerView} required />
                </div>

                <div className="form-group">
                  <label >Email:</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="email" readOnly value={farmerView.email} onChange={changeHandleFarmerView} required />
                </div>

                <div className="form-group">
                  <label >Phone Number:</label>
                  <input type="number" className="form-control" placeholder="Enter phone number" name="phoneNo" value={farmerView.phoneNo} onChange={changeHandleFarmerView} required />
                </div>

                <div className="form-group">
                  <label >Address:</label>
                  <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={farmerView.doorNo} onChange={changeHandleFarmerView} required />
                  <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={farmerView.place} onChange={changeHandleFarmerView} required />
                  <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={farmerView.city} onChange={changeHandleFarmerView} required />
                  <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={farmerView.state} onChange={changeHandleFarmerView} required />
                  <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="pincode" value={farmerView.pincode} onChange={changeHandleFarmerView} required />
                </div>
                <button type="submit" className="btn-light btn-change">Submit</button>
              </form>
            </Modal.Body>
            <div className='text-center'>
              {success && <p className='text-center text-success'>Successfully updated</p>}
              {failure && <p className='text-center text-danger'>{failureMsg}</p>}
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseFarmerView}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className=" container">
            <h5 className="text-uppercase text-center mb-4">View Profile</h5>
            <button className='btn btn-default' data-bs-toggle="tooltip" title="Edit details" onClick={handleShowFarmerView}> <EditIcon /></button>
            <div className="card mb-4 ">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{farmers.name}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{farmers.email}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone No</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{farmers.phoneNo}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{farmers.address.doorNo},
                      {farmers.address.place},<br />
                      {farmers.address.city},<br />
                      {farmers.address.state},<br />
                      {farmers.address.pincode}</b>
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
        {isDisease && <DiseaseRegister farmersEmail={farmerEmail} />}
        {isViewDisease &&
          <>
            <h5 className="text-uppercase text-center mb-4">View Disease Entry</h5>
            {
              <>

                {orderHistory.filter(it => it.farmerEmail === farmerEmail).map((order, index) => {
                  return (
                    order.disease.reviewStatus === "Completed" && order.agree !== "Pending" ?

                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={classes.summary}
                        >
                          <Typography>Review Status: <b>{order.disease.reviewStatus}</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                          <Typography>
                            <div className="container-fluid">
                              <table class="table table-borderless">
                                <tbody>

                                  <tr>
                                    <td>Disease Description</td>
                                    <td>:</td>
                                    <td><b>{order.disease.diseaseDescription}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Acres</td>
                                    <td>:</td>
                                    <td><b>{order.disease.acre}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Added Date</td>
                                    <td>:</td>
                                    <td><b>{order.disease.addedDate}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Name</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantName}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Contact No</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantPhoneNo}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Email Addess</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantEmail}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Suggestions(If Any)</td>
                                    <td>:</td>
                                    <td><b>{order.suggestion}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Required Pesticides added</td>
                                    <td>:</td>
                                    <td>
                                      <table className="table table-condensed w-auto table-bordered table-hover">
                                        <thead>
                                          <tr>
                                            <th>Pesticide Name</th>
                                            <th>Required Quantity</th>
                                            <th>Price</th>
                                          </tr>
                                        </thead>
                                        {order.pesticides.map((p, index1) => {
                                          return (

                                            <tbody key={index1}>
                                              <td>{p.pesticideName}</td>
                                              <td>{p.pesticideQtyReq}</td>
                                              <td>{p.pesticidePricePerUnit}</td>
                                            </tbody>
                                          )
                                        }
                                        )
                                        }
                                      </table>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Prescription to use these pesticides</td>
                                    <td>:</td>
                                    <td><b>{order.prescription}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Total number of pesticides added</td>
                                    <td>:</td>
                                    <td><b>{order.count}</b></td>
                                  </tr>

                                  <tr>
                                    <td>Amount for pesticides</td>
                                    <td>:</td>
                                    <td><b>Rs.{order.totalPay}/-</b></td>
                                  </tr>
                                  <tr>
                                    <td>Consultation Fees</td>
                                    <td>:</td>
                                    <td><b>Rs.{order.consultationFee}/-</b></td>
                                  </tr>
                                  {order.consultFeePaid === "Paid" && order.paid === "Paid" &&
                                    <tr>
                                      <td>Total Amount</td>
                                      <td>:</td>
                                      <td><b>Rs.{order.consultationFee + order.totalPay}/-</b></td>
                                    </tr>
                                  }
                                  <tr>
                                    <td>Affected Image</td>
                                    <td>:</td>
                                    <td>
                                      <button type="button" className="btn imageButton" onClick={() => { handleShow(order.disease.image) }}>
                                        <img src={`data:image/jpg;base64,${order.disease.image}`} className="img-thumbnail imageButton" alt="Responsive image" />
                                      </button>
                                      <Modal show={show} onHide={handleClose} >
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <img src={`data:image/jpg;base64,${image}`} className="img-thumbnail" />
                                        </Modal.Body>
                                      </Modal>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Shipment Status</td>
                                    <td>:</td>
                                    <td> <b>{order.shipmentStatus}</b></td>
                                  </tr>
                                  {order.consultFeePaid === "Paid" && order.paid === "Not Paid" &&
                                    <tr>
                                      <td>Consultation Fee Payment Status and Payment Id</td>
                                      <td>:</td>
                                      <td> <b>Consultation fee received and {order.consultantFeePaidPaymentId}</b></td>
                                    </tr>
                                  }
                                  {order.consultFeePaid === "Paid" && order.paid === "Paid" &&
                                    <tr>
                                      <td>Payment Status and Payment Id</td>
                                      <td>:</td>
                                      <td> <b>Paid successfully and {order.paymentID}</b></td>
                                    </tr>
                                  }
                                </tbody>
                              </table>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      :
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={classesNotComplete.summary}
                        >
                          <Typography>Review Status: <b>{order.disease.reviewStatus}</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                          <Typography>
                            <div className="container-fluid">
                              <table class="table table-borderless">
                                <tbody>

                                  <tr>
                                    <td>Disease Description</td>
                                    <td>:</td>
                                    <td><b>{order.disease.diseaseDescription}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Acres</td>
                                    <td>:</td>
                                    <td><b>{order.disease.acre}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Added Date</td>
                                    <td>:</td>
                                    <td><b>{order.disease.addedDate}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Name</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantName}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Contact No</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantPhoneNo}</b></td>
                                  </tr>
                                  <tr>
                                    <td>Reviewer Email Addess</td>
                                    <td>:</td>
                                    <td><b>{order.disease.consultantEmail}</b></td>
                                  </tr>
                                  {order.consultFeePaid === "Paid" && <>
                                    <tr>
                                      <td>Reviewer Suggestions(If Any)</td>
                                      <td>:</td>
                                      <td> {order.consultFeePaid === "Paid" && <b>{order.suggestion}</b>}</td>
                                    </tr>
                                    <tr>
                                      <td>Required Pesticides added</td>
                                      <td>:</td>
                                      <td>
                                        {order.consultFeePaid === "Paid" &&
                                          <table className="table table-condensed w-auto table-bordered table-hover">
                                            <thead>
                                              <tr>
                                                <th>Pesticide Name</th>
                                                <th>Required Quantity</th>
                                                <th>Price in INR</th>
                                              </tr>
                                            </thead>
                                            {order.pesticides.map((p, index1) => {
                                              return (

                                                <tbody key={index1}>
                                                  <td>{p.pesticideName}</td>
                                                  <td>{p.pesticideQtyReq}</td>
                                                  <td>{p.pesticidePricePerUnit}</td>
                                                </tbody>
                                              )
                                            }
                                            )
                                            }
                                          </table>
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Prescription to use these pesticides</td>
                                      <td>:</td>
                                      <td> {order.consultFeePaid === "Paid" && <b>{order.prescription}</b>}</td>
                                    </tr>

                                    <tr>
                                      <td>Total number of pesticides added</td>
                                      <td>:</td>
                                      <td><b>{order.count}</b></td>
                                    </tr>

                                  </>}
                                  {(order.shipmentStatus === "Solution added") &&
                                    <>
                                      {farmerAgree[order.id] === "Yes" &&
                                        <tr>
                                          <td>Amount for pesticides</td>
                                          <td>:</td>
                                          <td><b>Rs.{order.totalPay}/-</b></td>
                                        </tr>
                                      }
                                      <tr>
                                        <td>Consultation Fees</td>
                                        <td>:</td>
                                        <td><b>Rs.{order.consultationFee}/-</b></td>
                                      </tr>
                                    </>}
                                  {farmerAgree[order.id] === "Yes" &&
                                    <tr>
                                      <td>Total Amount have to pay</td>
                                      <td>:</td>
                                      <td><b>Rs.{order.totalPay + order.consultationFee}/-</b></td>
                                    </tr>
                                  }
                                  <tr>
                                    <td>Affected Image</td>
                                    <td>:</td>
                                    <td>
                                      <button type="button" className="btn imageButton" onClick={() => { handleShow(order.disease.image) }}>
                                        <img src={`data:image/jpg;base64,${order.disease.image}`} className="img-thumbnail imageButton" alt="Responsive image" />
                                      </button>
                                      <Modal show={show} onHide={handleClose} >
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <img src={`data:image/jpg;base64,${image}`} className="img-thumbnail" />
                                        </Modal.Body>
                                      </Modal>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Status</td>
                                    <td>:</td>
                                    <td> <b>{order.shipmentStatus}</b></td>
                                  </tr>
                                  {(order.agree === "Pending" && order.shipmentStatus === "Solution added") &&
                                    <>

                                      <tr>
                                        <td>Are you agree to buy pesticides</td>
                                        <td>:</td>
                                        <td>

                                          <select value={farmerAgree[order.id]} onChange={(e) =>setFarmerAgree({[order.id] : e.target.value})} name="farmerAgree">
                                            <option value="">--Select--</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                          </select>
                                        </td>
                                      </tr>
                                     
                                      {farmerAgree[order.id] === "Yes" ? <>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td>Please pay pesticide amount with consultation fee to view solution for your diseased crop.</td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td>
                                            <button type="button" className="btn btn-success" onClick={() =>
                                              handleSubmitPayment(order.id, "Online Payment", (order.totalPay + order.consultationFee))
                                            }>Buy Pesticides</button>
                                          </td>
                                        </tr>
                                      </>
                                        :
                                        farmerAgree[order.id] === "No" &&
                                        <>
                                          <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Please pay consultation fee to view solution for your diseased crop.</td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td></td>
                                            <td>
                                              <button type="button" className="btn btn-success" onClick={() => {
                                                let st = "Consultation Fee"
                                                handleSubmitPaymentConsultantFee(order.id, st, (order.consultationFee))
                                              }

                                              }>Consultation fee</button>
                                            </td>
                                          </tr>
                                        </>

                                      }
                                    </>
                                  }
                                  {/* {(order.consultFeePaid === "Not Paid" && order.agree === "Pending") &&
                                    <>

                                    </>
                                  } */}
                                </tbody>
                              </table>
                            </div>


                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                  )
                })}
              </>}
          </>
        }
        {isChangePassword && <FarmerChangePassword objects={farmer} />}
        {start && <>
          <h5 className="start">Welcome to Pesticide Management System</h5>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                <div className="card shadow border">
                  <div className="card-body d-flex flex-column align-items-center">
                    <table class="table  table-condensed table-hover table-bordered table-striped">
                      <tbody>
                        <tr>
                          <td>Total diseases registered by you:</td>
                          <td>:</td>
                          <td><b>{diseaseCountByFarmerCount}</b></td>
                        </tr>
                        <tr>
                          <td>Total diseases review pending</td>
                          <td>:</td>
                          <td><b>{diseasePendingCount}</b></td>
                        </tr>
                        <tr>
                          <td>Total diseases review inprogress</td>
                          <td>:</td>
                          <td><b>{diseaseInProgressCount}</b></td>
                        </tr>
                        <tr>
                          <td>Total diseases review completed</td>
                          <td>:</td>
                          <td><b>{diseaseCompletedCount}</b></td>
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

export default FarmerHome