import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConsultantService from '../Services/ConsultantService'
import { useNavigate } from 'react-router-dom';
import DiseaseService from '../Services/DiseaseService';
import PesticideService from '../Services/PesticideService';
import ConsultantChangePassword from './ConsultantChangePassword';
import ShipmentService from '../Services/ShipmentService'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Backdrop, CircularProgress } from '@material-ui/core';
import '../HomeComponent/Home.css'
import EditIcon from '@material-ui/icons/BorderColor';
import '../HomeComponent/Home.css'
import './consultantHome.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginService from '../Services/LoginService';
import HomeIcon from '@material-ui/icons/Home';
import CountService from '../Services/CountService';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import encrypt from 'localstorage-slim';
import {Cookies, useCookies } from 'react-cookie';

function ConsultantHome() {
  const[cookie,setCookie,removeCookie] = useCookies()
  const location = useLocation();
  const [expand, setExpand] = useState(true)
  const [chnageEffect, setChnageEffect] = useState(true)
  const [start, setStatrt] = useState(true)
  const [show, setShow] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [consultantEmail, setConsultantEmail] = useState()
  const [isProfile, setIsProfile] = useState(false)
  const [isConsultantCart, setIsConsultantCart] = useState(false)
  const [isViewDisease, setIsViewDisease] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [viewAllDisease, setViewAllDisease] = useState([null])
  const [viewConsultantDisease, setViewConsultantDisease] = useState([null])
  const [consultant, setConsultant] = useState([null])
  const [loading, setLoading] = useState(false);
  const [pesticide, setPesticide] = useState([{
    "pestId": "",
    "pestName": "",
    "avlQtyInGm": 0,
    "pricePerGm": 0.0
  }])
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [showViewConsultant, setShowViewConsultant] = useState(false);
  const [consultants, setConsultants] = useState(
    {
      "consultantEmail": "",
      "consultantName": "",
      "consultantPhoneNo": "",
      "consultantDoorNo": "",
      "consultantPlace": "",
      "consultantCity": "",
      "consultantState": "",
      "consultantPincode": ""
    });
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (id) => {
    setImage(id)
    setShow(true);
  }
  const [welcomeMsg, setWelcomeMsg] = useState("")
  const navigate = useNavigate()
  const handleCloseViewConsultant = () => setShowViewConsultant(false);
  const handleShowViewConsultant = () => setShowViewConsultant(true);
  const [image, setImage] = useState("")
  const [showViewDisease, setShowViewDisease] = useState(false);
  const [imageAddCart, setImageAddCart] = useState("")
  const [showAddCart, setShowAddCart] = useState(false);
  const [showPest, setShowPestAddCart] = useState(false);
  const [suggestion, setSuggestion] = useState("")
  const [prescription, setPrescription] = useState("")
  const [tempPest, setTempPest] = useState([])
  const [tempPestLocal, setTempPestLocal] = useState([])
  const [checkReview, setCheckReview] = useState("")
  const [diseaseCountByConsultant, setDiseaseCountByConsultant] = useState()
  const [diseaseCount, setDiseaseCount] = useState()
  const [diseaseCountByPending, setDiseaseCountByPending] = useState()
  const [diseaseCountByInProgress, setDiseaseCountByInProgress] = useState()
  const [diseaseCountByCompleted, setDiseaseCountByCompleted] = useState()

  const [req, setReq] = useState(0)
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

  const handleCloseAddCart = () => {
    setShowAddCart(false);
  }
  const handleShowAddCart = (img) => {
    setImageAddCart(img)
    setShowAddCart(true);
  }
  const handleClosePest = () => {
    setShowPestAddCart(false);
  }
  useEffect(async () => {
    
    setLoading(true)
    const data = await LoginService.getConsultant()
      .then((response) => {
        setConsultant(response.data)
        setConsultantEmail(location.state.email)
        setLastLogin(response.data.lastLogin)
        setConsultants(
          {
            "consultantEmail": response.data.consultantEmail,
            "consultantName": response.data.consultantName,
            "consultantPhoneNo": response.data.consultantPhoneNo,
            "consultantDoorNo": response.data.consultantAddress.consultantDoorNo,
            "consultantPlace": response.data.consultantAddress.consultantPlace,
            "consultantCity": response.data.consultantAddress.consultantCity,
            "consultantState": response.data.consultantAddress.consultantState,
            "consultantPincode": response.data.consultantAddress.consultantPincode
          }
        )
        setWelcomeMsg(response.data['consultantName'])
      })
      .catch((err)=>{
        setLoading(false)
        navigate('/login')
      })
    const data2 = PesticideService.getAll()
      .then((response) => {
        setPesticide(response.data)

      })
      .catch((error) => {
        console.log(error.response.data)
      })
    const data3 = await DiseaseService.getAll()
      .then((response) => {
        setViewAllDisease(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      });
    const data4 = await DiseaseService.getByConsultantReviewStatus(location.state.email)
      .then((response) => {
        setCheckReview(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      });

    const data5 = await CountService.diseaseCountByConsultant(location.state.email)
      .then((response) => {
        setDiseaseCountByConsultant(response.data)
      })

    const data6 = await CountService.countByReviewStatus("Pending")
      .then((response) => {
        setDiseaseCountByPending(response.data)
      })

    const data7 = await CountService.diseaseCountByConsultantAndReviewStatus(location.state.email, "InProgress")
      .then((response) => {
        setDiseaseCountByInProgress(response.data)
      })
    const data8 = await CountService.diseaseCountByConsultantAndReviewStatus(location.state.email, "Completed")
      .then((response) => {
        setDiseaseCountByCompleted(response.data)
      })
    const data9 = await CountService.diseaseCount()
      .then((response) => {
        setDiseaseCount(response.data)
      })

    setLoading(false)
  }, [chnageEffect])


  const logout = () => {
    const logoutDTO = {
      "email":consultantEmail,
      "type":"Consultant"
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
    setIsViewDisease(false)
    setIsConsultantCart(false)
    setIsChangePassword(false)
    setStatrt(false)
  };
  const changePassword = () => {
    setIsProfile(false)
    setIsViewDisease(false)
    setIsConsultantCart(false)
    setIsChangePassword(true)
    setStatrt(false)
  };

  const viewDisease = () => {
    setIsProfile(false)
    setIsViewDisease(true)
    setIsConsultantCart(false)
    setIsChangePassword(false)
    setStatrt(false)
  };

  const consultantCart = () => {
    const data1 = DiseaseService.getByConsultant(consultantEmail)
      .then((response) => {
        setViewConsultantDisease(response.data)
        setIsProfile(false)
        setIsViewDisease(false)
        setIsConsultantCart(true)
        setIsChangePassword(false)
        setStatrt(false)
      })
      .catch((error) => {
        alert(error.response.data)
      })
  };

  const changeHandleViewConsultant = e => {
    setConsultants((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmitViewConsultant = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await ConsultantService.update(consultant.consultantEmail, consultants)
      .then(response => {
        setChnageEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChnageEffect(true)
  };
  const handleCloseViewDisease = () => {
    setShowViewDisease(false);
  }
  const handleShowViewDisease = (img) => {
    setImage(img)
    setShowViewDisease(true);
  }
  const reviewAction = async (diseaseId) => {
    if (checkReview === "Exists") {
      alert("Please complete previous review.")
    } else {
      setLoading(true)
      const data = await ShipmentService.changeReview(consultantEmail, diseaseId)
        .then((response) => {
          setChnageEffect(false)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      setLoading(false)
      setChnageEffect(true)
    }

  }

  const pestArray = (objectId, req, index, pestNmae) => {
    if (document.getElementById(index).innerHTML == "+") {
      tempPest.push({
        "objectid": objectId,
        "reqQty": req
      })
      document.getElementById(index).innerHTML = "-"
    }
    else if (document.getElementById(index).innerHTML == "-") {
      setTempPest(tempPest.filter(item => item.objectid !== objectId))
      document.getElementById(pestNmae).value = 0
      document.getElementById(index).innerHTML = "+"
    }

  }
  const submitHandleForCart = async (e,diseaseId) => {
    e.preventDefault()
    if (tempPest.length) {
      const tempPestCart = { consultantEmail, diseaseId, suggestion, prescription, tempPest }
      setLoading(true)
      const d = await ShipmentService.addCart(tempPestCart)
        .then((response) => {
          setChnageEffect(false)
          setSuggestion("")
          setPrescription("")
          tempPest.splice(0,tempPest.length)
          tempPestLocal.splice(0,tempPestLocal.length)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      setLoading(false)
      setChnageEffect(true)
    }
    else {
      alert("Please add pesticide")
    }
  }
  const [dropdown_Pest, setDropdown_Pest] = useState({
    "pestId": "",
    "pestName": "",
    "avlQtyInGm": "",
    "pricePerGm": ""
  })
  const [addPest_error, setAddPest_error] = useState(false)
  const [addPest_errorMsg, setAddPest_errorMsg] = useState("")
  const handleSelect = (e) => {
    //event.preventDefault()
    //console.log(JSON.stringify(e));
    console.log(pesticide.find(it => it.pestId === e).pestName);
    setDropdown_Pest({
      "pestId": e,
      "pestName": pesticide.find(it => it.pestId === e).pestName,
      "avlQtyInGm": pesticide.find(it => it.pestId === e).avlQtyInGm,
      "pricePerGm": pesticide.find(it => it.pestId === e).pricePerGm

    })
    setChnageEffect(true)
  }
  const addPest = (id, req) => {
    // e.preventDefault()
    if (dropdown_Pest.avlQtyInGm === 0 || (req > 0 && req > dropdown_Pest.avlQtyInGm)) {
      setAddPest_errorMsg("Please enter valid quantity. Avaliale Quantity:" + dropdown_Pest.avlQtyInGm)
      setAddPest_error(true)
    }
    else {

      if (tempPest.filter(it => it.objectid === id).length > 0) {
        setAddPest_errorMsg("Pesticide already added. Please remove to add again")
        setAddPest_error(true)
      }
      else {

        tempPest.push({
          "objectid": id,
          "reqQty": req
        })

        tempPestLocal.push({
          "objectid": id,
          "pestName": dropdown_Pest.pestName,
          "avlQtyInGm": dropdown_Pest.avlQtyInGm,
          "pricePerGm": dropdown_Pest.pricePerGm,
          "reqQty": req
        })
        if (chnageEffect === true) {
          setChnageEffect(false)
        }
        else {
          setChnageEffect(true)
        }
      }

    }


  }
  const deleteTempPest = (id) => {
    tempPest.splice(tempPest.indexOf(id), 1)
    tempPestLocal.splice(tempPestLocal.indexOf(id), 1)
    if (chnageEffect === true) {
      setChnageEffect(false)
    }
    else {
      setChnageEffect(true)
    }
  }

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
                  <button type="button" className='buttonStyle' data-bs-toggle="tooltip" title="Profile" onClick={profile} ><AccountCircleIcon fontSize="large" /></button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={viewDisease} >View Disease</button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={consultantCart} >Add Solution</button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={changePassword} >Change Password</button>
                </li>
                {/* <button type="button" className='btn btn-default' data-bs-toggle="tooltip" title="Logout" onClick={logout}><PowerSettingsNewIcon /></button> */}
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={logout} >Logout</button>
                </li>

              </ul>
            </div>
          </div>
          <HomeIcon fontSize='large' className='last_Login w1 homeButton' onClick={() => window.location.reload(false)} />

        </nav>
        <p className="welcome">Welcome: <b>{welcomeMsg}</b></p>
        {isProfile && <>

          <Modal show={showViewConsultant} onHide={handleCloseViewConsultant}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitViewConsultant}>
                <div className="form-group">
                  <label >Name:</label>
                  <input type="text" className="form-control" placeholder="Enter name" name="consultantName" value={consultants.consultantName} onChange={changeHandleViewConsultant} />
                </div>

                <div className="form-group">
                  <label >Email:</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="consultantEmail" value={consultants.consultantEmail} onChange={changeHandleViewConsultant} readOnly />
                </div>

                <div className="form-group">
                  <label >Phone Number:</label>
                  <input type="number" className="form-control" placeholder="Enter phone number" name="consultantPhoneNo" value={consultants.consultantPhoneNo} onChange={changeHandleViewConsultant} />
                </div>

                <div className="form-group">
                  <label >Address:</label>
                  <input type="number" className="form-control mb-2" placeholder="Enter door number" name="consultantDoorNo" value={consultants.consultantDoorNo} onChange={changeHandleViewConsultant} />
                  <input type="text" className="form-control mb-2" placeholder="Enter place" name="consultantPlace" value={consultants.consultantPlace} onChange={changeHandleViewConsultant} />
                  <input type="text" className="form-control mb-2" placeholder="Enter city" name="consultantCity" value={consultants.consultantCity} onChange={changeHandleViewConsultant} />
                  <input type="text" className="form-control mb-2" placeholder="Enter state" name="consultantState" value={consultants.consultantState} onChange={changeHandleViewConsultant} />
                  <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="consultantPincode" value={consultants.consultantPincode} onChange={changeHandleViewConsultant} />
                </div>
                <button type="submit" className="btn-light btn-change">Submit</button>
              </form>
            </Modal.Body>
            <div className='text-center'>
              {failure && <p className='text-center text-danger'>{failureMsg}</p>}
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseViewConsultant}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className=" container">
            <button className='btn btn-default' data-bs-toggle="tooltip" title="Edit details" onClick={handleShowViewConsultant}><EditIcon /></button>
            <div className="card mb-4   ">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{consultant.consultantName}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{consultant.consultantEmail}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone No</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{consultant.consultantPhoneNo}</b></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0"><b>{consultant.consultantAddress.consultantDoorNo},
                      {consultant.consultantAddress.consultantPlace},<br />
                      {consultant.consultantAddress.consultantCity},<br />
                      {consultant.consultantAddress.consultantState},<br />
                      {consultant.consultantAddress.consultantPincode}</b>
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
        </>
        }
        {isViewDisease && <>
          <div className='table-responsive' id="no-more-tables1">
            <table className="table table-bordered table-hover">
              <thead className='text-center'>
                <tr>
                  <th>Action</th>
                  <th>Disease Description</th>
                  <th>Total Acre Affected</th>
                  <th>Added Date</th>
                  <th>Review Status</th>
                  <th>Disease Image</th>
                </tr>
              </thead>
              {viewAllDisease.map((diseases, index) => {
                return (
                  <tbody key={index}>
                    <tr >
                      {diseases.reviewStatus === "Pending" ? <td data-title="Action">
                        <button type="button" className="btn btn-success" onClick={() => {
                          if (diseases.consultantEmail === consultantEmail && checkReview === "Exists") {
                            alert("Please complete previous review.")
                          } else {
                            reviewAction(diseases.dieaseId)
                          }

                        }}>Take Review</button>
                      </td>
                        : <td></td>}
                      <td data-title="Disease Description">{diseases.diseaseDescription}</td>
                      <td data-title="Total Acre Affected">{diseases.acre}</td>
                      <td data-title="Added Date">{diseases.addedDate}</td>
                      <td data-title="Review Status">{diseases.reviewStatus}</td>
                      <td data-title="Disease Image">
                        <div className="col-sm-6 col-md-4 col-lg-2 col-xl-4">
                          <button type="button" onClick={() => { handleShowViewDisease(diseases.image) }}>
                            <img src={`data:image/jpg;base64,${diseases.image}`} className="img-thumbnail" alt="Responsive" />
                          </button>
                          <Modal show={showViewDisease} onHide={handleCloseViewDisease} >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={`data:image/jpg;base64,${image}`} className="img-thumbnail" />
                            </Modal.Body>
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </>}
        {isConsultantCart && <>

          {viewAllDisease.map((diseases, index1) => {
            return (
              <>
                {(diseases.reviewStatus == "Completed" && diseases.reviewStatus !== "Pending") ?
                  <Accordion key={index1}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <Typography>Disease Description:<b>{diseases.diseaseDescription}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                      <Typography>
                        <p>Total Number of acres affected: <b>{diseases.acre}</b></p>
                        <p>Review Status:  <b>{diseases.reviewStatus}</b></p>
                        <p>Suggestions (If any sent):  <b>{diseases.suggestion}</b></p>
                        <p>Reviewer Name:  <b>{diseases.consultantName}</b></p>
                        <p>Reviewer Phone number:  <b>{diseases.consultantPhoneNo}</b></p>
                        <p>Reviewer Emaiol:  <b>{diseases.consultantEmail}</b></p>
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <button type="button" className="w-50" onClick={() => { handleShow(diseases.image) }}>
                            <img src={`data:image/jpg;base64,${diseases.image}`} className="img-thumbnail" />
                          </button>
                          <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={`data:image/jpg;base64,${image}`} className="img-thumbnail" />
                            </Modal.Body>
                          </Modal>
                        </div>

                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  :
                  (diseases.reviewStatus !== "Pending" && diseases.consultantEmail === consultantEmail) &&
                  <Accordion expanded={expand} >
                    <AccordionSummary
                      onClick={() => {
                        if (expand) {
                          setExpand(false)
                        } else {
                          setExpand(true)
                        }
                      }}
                      expandIcon={<ExpandMoreIcon />}

                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classesNotComplete.summary}
                    >
                      <Typography>Disease Description:<b>{diseases.diseaseDescription}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p>Total Number of acres affected: {diseases.acre}</p>
                        <p>Review Status: {diseases.reviewStatus}</p>
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <button type="button" className="w-50" onClick={() => { handleShow(diseases.image) }}>
                            <img src={`data:image/jpg;base64,${diseases.image}`} className="img-thumbnail" />
                          </button>
                          <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                              <img src={`data:image/jpg;base64,${image}`} className="img-thumbnail" />
                            </Modal.Body>
                          </Modal>
                        </div>
                        <form onSubmit={(e) => {
                           if(Object.keys(tempPestLocal).length > 0){
                            submitHandleForCart(e,diseases.dieaseId)
                           }else{
                             e.preventDefault()
                            setAddPest_error(true)
                            setAddPest_errorMsg("Please add pesticide")
                           }
                           
                         }}>
                          <div className="form-group">
                            <label >Suggestion:</label>
                            <input type="text" className="form-control mb-3" placeholder="Enter suggestions" name="suggestion" value={suggestion} onChange={(e) => setSuggestion(e.target.value)} required />
                          </div>
                          <div className="form-group">
                            {/* <label >Add Pesticides:</label> */}
                          </div>
                          <label >Add Pesticides:</label>
                          <div id="no-more-tables">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Select Pesticide</th>

                                  {/* <th>Pesticide Name</th> */}
                                  <th>Available Quantity</th>
                                  <th>PricePer Quantity</th>
                                  <th>Required Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td data-title="Select">
                                    <DropdownButton
                                      alignRight
                                      title={Object.keys(dropdown_Pest.pestName).length === 0 ? "Select Pesticide":dropdown_Pest.pestName}
                                      id="dropdown-menu-align-right"
                                      onSelect={handleSelect}
                                    >
                                      {pesticide.map((pest, index) => {
                                        return (
                                          <Dropdown.Item title={pest.pestName} eventKey={pest.pestId}>{pest.pestName}</Dropdown.Item>
                                        )
                                      })}
                                    </DropdownButton>
                                  </td>

                                  {/* <td data-title="Pest Name">{dropdown_Pest.pestName}</td> */}
                                  {dropdown_Pest.avlQtyInGm === 0 ? <td data-title="Available Qty">Out of Stock</td> : <td data-title="Available Qty">{dropdown_Pest.avlQtyInGm}</td>}
                                  <td data-title="Price/qty">{dropdown_Pest.pricePerGm}</td>
                                  {Object.keys(dropdown_Pest.pestName).length === 0 ? <></> : <>
                                    <td data-title="Required Qty">
                                      <input type="number" placeholder="Req Qty" name="req" id="reqQty" style={{ width: "100px" }} />

                                    </td>
                                    <td>
                                      <button type="button" className="btn btn-primary" onClick={
                                        () => {
                                          if (Object.is(document.getElementById("reqQty").value, "0") || document.getElementById("reqQty").value === "") {
                                            setAddPest_error(true)
                                            setAddPest_errorMsg("Pesticide required quantity is mandatory")
                                          }
                                          else {
                                            setAddPest_error(false)
                                            addPest(dropdown_Pest.pestId, document.getElementById("reqQty").value)
                                          }

                                        }
                                      }>+</button>

                                    </td>
                                    <td>
                                      {addPest_error && <p className='text-danger'>{addPest_errorMsg}</p>}
                                    </td>
                                  </>
                                  }
                                </tr>

                              </tbody>
                            </table>

                          </div>
                          <div >
                            {Object.keys(tempPestLocal).length > 0 &&

                              <table className="table table-hover">

                                <thead>
                                  <tr>

                                    <th>Pesticide Name</th>
                                    <th>Available Quantity</th>
                                    <th>PricePer Quantity</th>
                                    <th>Required Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tempPestLocal.map((tp) => {
                                    return (
                                      <tr onChange={
                                        tp.objectid}>

                                        <td>{tp.pestName}</td>
                                        <td>{tp.avlQtyInGm - tp.reqQty}</td>
                                        <td>{tp.pricePerGm}</td>
                                        <td>{tp.reqQty}
                                        </td>
                                        <td>
                                          <button className='btn btn-sm btn-danger' onClick={() => { deleteTempPest(tp.objectid) }}>X</button>

                                        </td>

                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            }
                          </div>
                          <div className="form-group">
                            <label >Pescription:</label>
                            <input type="text" className="form-control" placeholder="Enter prescription" name="prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} required />
                          </div>
                          <button type="submit" className="btn btn-success">Add Solution</button>
                        </form>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                }
              </>
            )
          })}
        </>
        }
        {isChangePassword && <ConsultantChangePassword objects={consultant} />}
        {start &&
          <>

            <h5 className="start">Welcome to Pesticide Management System <br /> Consultant</h5>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                  <div className="card shadow border">
                    <div className="card-body d-flex flex-column align-items-center">
                      <table class="table  table-condensed table-hover table-bordered table-striped">
                        <tbody>
                          <tr>
                            <td>Total diseases registered</td>
                            <td>:</td>
                            <td><b>{diseaseCount}</b></td>
                          </tr>
                          <tr>
                            <td>Total diseases Consulted by you</td>
                            <td>:</td>
                            <td><b>{diseaseCountByCompleted}</b></td>
                          </tr>
                          <tr>
                            <td>Total diseases review inprogress by you</td>
                            <td>:</td>
                            <td><b>{diseaseCountByInProgress}</b></td>
                          </tr>
                          <tr>
                            <td>Total diseases review Pending</td>
                            <td>:</td>
                            <td><b>{diseaseCountByPending}</b></td>
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

export default ConsultantHome