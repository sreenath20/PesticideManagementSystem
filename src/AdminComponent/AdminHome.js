import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AdminService from '../Services/AdminService';
import ConsultantRegister from './ConsultantRegister';
import ConsultantService from '../Services/ConsultantService';
import FarmerService from '../Services/FarmerService'
import ShipmentService from '../Services/ShipmentService'
import WarehouseOperatorRegister from './WarehouseOperatorRegister';
import AdminChangePassword from './AdminChangePassword';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import '../HomeComponent/Home.css'
import EditIcon from '@material-ui/icons/BorderColor';
import WarehouseOperatorService from '../Services/WarehouseOperatorService';
import DeliverPersonService from '../Services/DeliverPersonService';
import DeliverPersonRegister from './DeliverPersonRegister';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginService from '../Services/LoginService';
import { Backdrop, CircularProgress, Container } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './AdminHome.css'
import CountService from '../Services/CountService';
import { useCookies } from 'react-cookie';


function AdminHome() {
  const[cookie,setCookie,removeCookie] = useCookies()
  const location = useLocation();
  const [changeEffect, setChangeEffect] = useState(true)
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showO, setShowO] = useState(false);
  const [showF, setShowF] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [adminEmail, setAdminEmail] = useState()
  const [admin, setAdmin] = useState(null)
  const [farmers, setFarmers] = useState([])
  const [consultants, setAllconsultant] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [isProfile, setIsProfile] = useState(false)
  const [isAllConsultant, setIsAllConsultant] = useState(false)
  const [isAllFarmer, setIsAllFarmer] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [isShipmentUpdate, setIsShipmentUpdate] = useState(false)
  const [isConsultantRegister, setIsConsultantRegister] = useState(false)
  const [isOperatorRegister, setIsOperatorRegister] = useState(false)
  const [isAllOperator, setIsAllOperator] = useState(false)
  const [isDeliverPerson, setIsDeliverPerson] = useState(false)
  const [viewAllOperator, setViewAllOperator] = useState([])
  const [consultantEmail, setConsultantEmail] = useState("")
  const [operatorEmail, setOperatorEmail] = useState("")
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(true)
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (id) => {
    setShow(true);
  }
  const handleCloseO = () => {
    setShowO(false);
  }
  const handleShowO = () => {
    setShowO(true);
  }
  const handleCloseD = () => {
    setShowD(false);
  }
  const handleShowD = () => {
    setShowD(true);
  }
  const handleCloseF = () => {
    setShowF(false);
  }
  const handleShowF = () => {
    setShowF(true);
  }
  const [warehouseOperatorTemp, setWarehouseOperatorTemp] = useState(
    {
      "operatorEmail": "",
      "operatorName": "",
      "operatorPhoneNo": "",
      "operatorDoorNo": "",
      "operatorPlace": "",
      "operatorCity": "",
      "operatorState": "",
      "operatorPincode": ""
    });
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

  const [welcomeMsg, setWelcomeMsg] = useState("")
  const [deliverPerson, setDeliverPerson] = useState([])
  const [deliverPersonEmail, setDeliverPersonEmail] = useState("")
  const [isDeliverPersonView, setIsDeliverPersonView] = useState(false)
  const navigate = useNavigate()
  const [farmer, setFarmer] = useState([])
  const [farmerEmail, setFarmerEmail] = useState("")
  const [farmerTemp, setFarmerTemp] = useState(
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
  const [farmerCount, setFarmerCount] = useState()
  const [consultantCount, setConsultantCount] = useState()
  const [deliveryPersonCount, setDeliverPersonCount] = useState()
  const [operatorCount, setOperatorCount] = useState()

  useEffect(async () => {
  
    setLoading(true)
    const data = await LoginService.getAdmin()
      .then((response) => {
        setAdmin(response.data)
        setAdminEmail(location.state.email)
        setUpdateAdmin({
          name: response.data.name,
          email: adminEmail,
          password: response.data.password,
          phoneNo: response.data.phoneNo,
          doorNo: response.data.address.doorNo,
          place: response.data.address.place,
          city: response.data.address.city,
          state: response.data.address.state,
          pincode: response.data.address.pincode
        })
        setLastLogin(response.data.lastLogin)
        setWelcomeMsg(response.data['name'])
      })
      .catch((err)=>{
        setLoading(false)
        navigate('/login')
      })
    const data1 = await FarmerService.getAll()
      .then((response) => {
        setFarmers(response.data)
      })
      .catch((error) => {
        // alert(error.response.data)
      });

    const data7 = CountService.farmerCount()
      .then((response) => {
        setFarmerCount(response.data)
      })

    const data8 = CountService.consultantCount()
      .then((response) => {
        setConsultantCount(response.data)
      })

    const data9 = CountService.warehouseOperatorCount()
      .then((response) => {
        setOperatorCount(response.data)
      })

    const data10 = CountService.deliverPersonCount()
      .then((response) => {
        setDeliverPersonCount(response.data)
      })
      FarmerService.getAll()
      .then((response) => {
        setFarmer(response.data)
      })
      WarehouseOperatorService.getAll()
      .then((response) => {
        setViewAllOperator(response.data)
      })
      DeliverPersonService.getAll()
      .then((response) => {
        setDeliverPerson(response.data)
      })
      ConsultantService.getAll()
      .then((response) => {
        setAllconsultant(response.data)
      })
    setLoading(false)
  }, [changeEffect]);



  const logout = () => {
    const logoutDTO = {
      "email":adminEmail,
      "type": "Admin"
    }
    LoginService.logout(logoutDTO)
      .then((response) => {
        removeCookie(logoutDTO.type)
        localStorage.removeItem("token");
        navigate('/')
      })
      .catch((error) => {
        alert(error.response.data)
      })

  };
  const profile = () => {
    setIsProfile(true)
    setIsConsultantRegister(false)
    setIsOperatorRegister(false)
    setIsShipmentUpdate(false)
    setIsChangePassword(false)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(false)
    setIsDeliverPersonView(false)
    setIsAllFarmer(false)

  };
  const consultantRegister = () => {
    setIsProfile(false)
    setIsConsultantRegister(true)
    setIsOperatorRegister(false)
    setIsShipmentUpdate(false)
    setIsChangePassword(false)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(false)
    setIsDeliverPersonView(false)
    setIsAllFarmer(false)
  }
  const OperatorRegister = () => {
    setIsProfile(false)
    setIsConsultantRegister(false)
    setIsOperatorRegister(true)
    setIsShipmentUpdate(false)
    setIsChangePassword(false)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(false)
    setIsDeliverPersonView(false)
    setIsAllFarmer(false)
  }
  const DeliverPersonRegisterMenu = () => {
    setIsProfile(false)
    setIsConsultantRegister(false)
    setIsOperatorRegister(false)
    setIsShipmentUpdate(false)
    setIsChangePassword(false)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(true)
    setIsDeliverPersonView(false)
    setIsAllFarmer(false)
  }
  const ShipmentUpdate = () => {
    setIsProfile(false)
    setIsConsultantRegister(false)
    setIsOperatorRegister(false)
    setIsShipmentUpdate(true)
    setIsChangePassword(false)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(false)
  }
  const changePassword = () => {
    setIsProfile(false)
    setIsConsultantRegister(false)
    setIsOperatorRegister(false)
    setIsShipmentUpdate(false)
    setIsChangePassword(true)
    setIsAllConsultant(false)
    setStart(false)
    setIsAllOperator(false)
    setIsDeliverPerson(false)
    setIsAllFarmer(false)
  };

  const viewAllConsultant = async () => {
    setLoading(true)
    const data3 = await ConsultantService.getAll()
      .then((response) => {
        setAllconsultant(response.data)
        setIsProfile(false)
        setIsConsultantRegister(false)
        setIsOperatorRegister(false)
        setIsShipmentUpdate(false)
        setIsChangePassword(false)
        setIsAllConsultant(true)
        setStart(false)
        setIsAllOperator(false)
        setIsDeliverPerson(false)
        setIsDeliverPersonView(false)
        setIsAllFarmer(false)
      })
      .catch((error) => {
        //alert(error.response.data)
      })
    setLoading(false)
  };

  const viewAllDeliverPerson = async () => {
    setLoading(true)
    const data3 = await DeliverPersonService.getAll()
      .then((response) => {
        setDeliverPerson(response.data)
        setIsProfile(false)
        setIsConsultantRegister(false)
        setIsOperatorRegister(false)
        setIsShipmentUpdate(false)
        setIsChangePassword(false)
        setIsAllConsultant(false)
        setStart(false)
        setIsAllOperator(false)
        setIsDeliverPerson(false)
        setIsDeliverPersonView(true)
        setIsAllFarmer(false)
      })
      .catch((error) => {
        //alert(error.response.data)
      })
    setLoading(false)
  };

  const viewAllOperators = async () => {
    setLoading(true)
    const data4 = await WarehouseOperatorService.getAll()
      .then((response) => {
        setViewAllOperator(response.data)
        setIsProfile(false)
        setIsConsultantRegister(false)
        setIsOperatorRegister(false)
        setIsShipmentUpdate(false)
        setIsChangePassword(false)
        setIsAllConsultant(false)
        setStart(false)
        setIsAllOperator(true)
        setIsDeliverPerson(false)
        setIsDeliverPersonView(false)
        setIsAllFarmer(false)
      })
      .catch((error) => {
        //  alert(error.response.data)
      })
    setLoading(false)
  }

  const viewAllFarmer = async () => {
    setLoading(true)
    const data = await FarmerService.getAll()
      .then((response) => {
        setFarmer(response.data)
        setIsProfile(false)
        setIsConsultantRegister(false)
        setIsOperatorRegister(false)
        setIsShipmentUpdate(false)
        setIsChangePassword(false)
        setIsAllConsultant(false)
        setStart(false)
        setIsAllOperator(false)
        setIsDeliverPerson(false)
        setIsDeliverPersonView(false)
        setIsAllFarmer(true)
      })
      .catch((error) => {
        // alert(error.response.data)
      })
    setLoading(false)
  }


  const [consultant, setConsultant] = useState(
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
  const handleCloseC = () => {
    setShowC(false)

  };
  const handleShowC = () => setShowC(true);
  const changeHandle = e => {
    setConsultant((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };
  function updateConsultant(id) {
    setConsultant({
      "consultantEmail": consultants.find(it => it.consultantEmail == id).consultantEmail,
      "consultantName": consultants.find(it => it.consultantEmail == id).consultantName,
      "consultantPhoneNo": consultants.find(it => it.consultantEmail == id).consultantPhoneNo,
      "consultantDoorNo": consultants.find(it => it.consultantEmail == id).consultantAddress.consultantDoorNo,
      "consultantPlace": consultants.find(it => it.consultantEmail == id).consultantAddress.consultantPlace,
      "consultantCity": consultants.find(it => it.consultantEmail == id).consultantAddress.consultantCity,
      "consultantState": consultants.find(it => it.consultantEmail == id).consultantAddress.consultantState,
      "consultantPincode": consultants.find(it => it.consultantEmail == id).consultantAddress.consultantPincode
    })
    setConsultantEmail(consultants.find(it => it.consultantEmail == id).consultantEmail)
    setShowC(true);
  }
  const deleteConsultant = async (id) => {
    const data = await ConsultantService.delete(id)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setChangeEffect(true)
    setLoading(false)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await ConsultantService.update(consultantEmail, consultant)
      .then(response => {
        setChangeEffect(false)

      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setChangeEffect(true)
    setLoading(false)
  };
  function updateDeliverPerson(email) {

    setdeliverPersonTemp({
      "name": deliverPerson.find(it => it.email === email).name,
      "email": deliverPerson.find(it => it.email === email).email,
      "phoneNo": deliverPerson.find(it => it.email === email).phoneNo,
      "doorNo": deliverPerson.find(it => it.email === email).deliverAddress.doorNo,
      "place": deliverPerson.find(it => it.email === email).deliverAddress.place,
      "city": deliverPerson.find(it => it.email === email).deliverAddress.city,
      "state": deliverPerson.find(it => it.email === email).deliverAddress.state,
      "pincode": deliverPerson.find(it => it.email === email).deliverAddress.pincode
    })
    setDeliverPersonEmail(deliverPerson.find(it => it.email === email).email)
    setShowD(true);
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

  const deleteDeliverPerson = async (email) => {
    const data = await DeliverPersonService.delete(email)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setChangeEffect(true)
    setLoading(false)
  }
  const [showViewAdmin, setShowViewAdmin] = useState(false);
  const [updateAdmin, setUpdateAdmin] = useState(
    {
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      doorNo: "",
      place: "",
      city: "",
      state: "",
      pincode: ""
    });

  const changeHandleViewAdmin = e => {
    setUpdateAdmin((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmitViewAdmin = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await AdminService.update(adminEmail, updateAdmin)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChangeEffect(true)
  };
  const handleCloseViewAdmin = () => setShowViewAdmin(false);
  const handleShowViewAdmin = () => setShowViewAdmin(true);

  const changeHandleViewProfile = e => {
    setWarehouseOperatorTemp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmitViewProfile = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await WarehouseOperatorService.update(operatorEmail, warehouseOperatorTemp)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChangeEffect(true)
  };

  function updateOperator(id) {
    setWarehouseOperatorTemp({
      "operatorEmail": viewAllOperator.find(it => it.operatorEmail === id).operatorEmail,
      "operatorName": viewAllOperator.find(it => it.operatorEmail === id).operatorName,
      "operatorPhoneNo": viewAllOperator.find(it => it.operatorEmail === id).operatorPhoneNo,
      "operatorDoorNo": viewAllOperator.find(it => it.operatorEmail === id).operatorAddress.operatorDoorNo,
      "operatorPlace": viewAllOperator.find(it => it.operatorEmail === id).operatorAddress.operatorPlace,
      "operatorCity": viewAllOperator.find(it => it.operatorEmail === id).operatorAddress.operatorCity,
      "operatorState": viewAllOperator.find(it => it.operatorEmail === id).operatorAddress.operatorState,
      "operatorPincode": viewAllOperator.find(it => it.operatorEmail === id).operatorAddress.operatorPincode
    })
    setOperatorEmail(viewAllOperator.find(it => it.operatorEmail === id).operatorEmail)
    setShowO(true)
  }
  const deleteOperator = async (id) => {
    const data = await WarehouseOperatorService.delete(id)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setChangeEffect(true)
    setLoading(false)

  }

  function updateDelivery(id) {

    var ele = document.getElementById(id);
    var status = ele.options[ele.selectedIndex].text;


    if (status === "Delivered") {
      let paidStatus = "Paid"
      const shipmentTemp = { id, status, paidStatus }
      alert(JSON.stringify(shipmentTemp))
      const data = ShipmentService.updateShipment(shipmentTemp)
        .then((response) => {
          alert("Success")
          setChangeEffect(false)

        })
        .catch((error) => {
          alert(error.response.data)
        })
      setChangeEffect(true)
    }
    else {
      let paidStatus = "Not Paid"
      const shipmentTemp = { id, status, paidStatus }
      alert(JSON.stringify(shipmentTemp))
      const data = ShipmentService.updateShipment(shipmentTemp)
        .then((response) => {
          setChangeEffect(false)
        })
        .catch((error) => {
          alert(error.response.data)
        })
      setChangeEffect(true)
    }

  }
  const changeHandleFarmer = e => {
    setFarmerTemp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };
  const handleSubmitFarmer = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await FarmerService.update(farmerEmail, farmerTemp)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChangeEffect(true)
  };
  function updateFarmer(email) {

    setFarmerTemp({
      "name": farmer.find(it => it.email === email).name,
      "email": farmer.find(it => it.email === email).email,
      "phoneNo": farmer.find(it => it.email === email).phoneNo,
      "doorNo": farmer.find(it => it.email === email).address.doorNo,
      "place": farmer.find(it => it.email === email).address.place,
      "city": farmer.find(it => it.email === email).address.city,
      "state": farmer.find(it => it.email === email).address.state,
      "pincode": farmer.find(it => it.email === email).address.pincode
    })
    setFarmerEmail(farmer.find(it => it.email === email).email)
    setShowF(true);
  }

  const deleteFarmer = async (email) => {
    const data = await FarmerService.delete(email)
      .then(response => {
        setChangeEffect(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setChangeEffect(true)
    setLoading(false)
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
                  <div className="dropdown">
                    <button type="button" className=" buttonStyle dropdown-toggle" data-bs-toggle="dropdown" >Consultant</button>
                    <div className="dropdown-menu">
                      <button type="button" className="dropdown-item buttonStyle" onClick={consultantRegister} >Consultant Register</button>
                      <button type="button" className='dropdown-item buttonStyle' onClick={viewAllConsultant} >View Consultant</button>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <div className="dropdown">
                    <button type="button" className=" buttonStyle dropdown-toggle" data-bs-toggle="dropdown" >Warehouse Operator</button>
                    <div className="dropdown-menu">
                      <button type="button" className="dropdown-item buttonStyle" onClick={OperatorRegister} >Operator Register</button>
                      <button type="button" className='dropdown-item buttonStyle' onClick={viewAllOperators} >View Operator</button>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <div className="dropdown">
                    <button type="button" className=" buttonStyle dropdown-toggle" data-bs-toggle="dropdown" >Deliver Person</button>
                    <div className="dropdown-menu">
                      <button type="button" className="dropdown-item buttonStyle" onClick={DeliverPersonRegisterMenu} >Deliver Person Register</button>
                      <button type="button" className='dropdown-item buttonStyle' onClick={viewAllDeliverPerson} >Deliver Person View</button>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={viewAllFarmer} >View Farmers</button>
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
        <p className='welcome'> Welcome: <b>{welcomeMsg}</b></p>

        {isProfile &&
          <div>
            <Modal show={showViewAdmin} onHide={handleCloseViewAdmin}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitViewAdmin}>
                  <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="name" value={updateAdmin.name} onChange={changeHandleViewAdmin} />
                  </div>

                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={updateAdmin.email} onChange={changeHandleViewAdmin} readOnly />
                  </div>

                  <div className="form-group">
                    <label >Phone Number:</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" name="phoneNo" value={updateAdmin.phoneNo} onChange={changeHandleViewAdmin} />
                  </div>

                  <div className="form-group">
                    <label >Address:</label>
                    <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={updateAdmin.doorNo} onChange={changeHandleViewAdmin} />
                    <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={updateAdmin.place} onChange={changeHandleViewAdmin} />
                    <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={updateAdmin.city} onChange={changeHandleViewAdmin} />
                    <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={updateAdmin.state} onChange={changeHandleViewAdmin} />
                    <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="pincode" value={updateAdmin.pincode} onChange={changeHandleViewAdmin} />
                  </div>
                  <button type="submit" className="btn-light btn-change">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseViewAdmin}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <h5 className="text-uppercase text-center mb-4">View Profile</h5>
            <div className=" container" >
              <button className='btn btn-default' data-bs-toggle="tooltip" title="Edit details" onClick={handleShowViewAdmin}><EditIcon /></button>
              <div className="card mb-4 " >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{admin.name}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{admin.email}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone No</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{admin.phoneNo}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{admin.address.doorNo},
                        {admin.address.place},<br />
                        {admin.address.city},<br />
                        {admin.address.state},<br />
                        {admin.address.pincode}</b>
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
          </div>
        }

        {isConsultantRegister && <ConsultantRegister />}

        {isOperatorRegister && <WarehouseOperatorRegister />}

        {isChangePassword && <AdminChangePassword objects={admin} />}

        {((isAllConsultant) &&
          <>
            <Modal show={showC} onHide={handleCloseC}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="consultantName" value={consultant.consultantName} onChange={changeHandle} />
                  </div>

                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="consultantEmail" value={consultant.consultantEmail} onChange={changeHandle} readOnly />
                  </div>

                  <div className="form-group">
                    <label >Phone Number:</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" name="consultantPhoneNo" value={consultant.consultantPhoneNo} onChange={changeHandle} />
                  </div>

                  <div className="form-group">
                    <label >Address:</label>
                    <input type="number" className="form-control mb-2" placeholder="Enter door number" name="consultantDoorNo" value={consultant.consultantDoorNo} onChange={changeHandle} />
                    <input type="text" className="form-control mb-2" placeholder="Enter place" name="consultantPlace" value={consultant.consultantPlace} onChange={changeHandle} />
                    <input type="text" className="form-control mb-2" placeholder="Enter city" name="consultantCity" value={consultant.consultantCity} onChange={changeHandle} />
                    <input type="text" className="form-control mb-2" placeholder="Enter state" name="consultantState" value={consultant.consultantState} onChange={changeHandle} />
                    <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="consultantPincode" value={consultant.consultantPincode} onChange={changeHandle} />
                  </div>
                  <button type="submit" className="btn-light btn-change">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseC}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <h5 className="text-uppercase text-center mb-4">View Consultant</h5>
            <div className="table-responsive" id="no-more-tables">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Consultant Name</th>
                    <th>Consultant Email</th>
                    <th>Consultant Phone Number</th>
                    <th>Consultant Address</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {consultants.map((con, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="Name">{con.consultantName}</td>
                        <td data-title="Email">{con.consultantEmail}</td>
                        <td data-title="Phone Number">{con.consultantPhoneNo}</td>
                        <td data-title="Address">
                          {con.consultantAddress.consultantDoorNo},
                          {con.consultantAddress.consultantPlace},
                          {con.consultantAddress.consultantCity},
                          {con.consultantAddress.consultantState},
                          {con.consultantAddress.consultantPincode}

                        </td>
                        <td><button type="button" className="btn btn-success" onClick={() => {

                          updateConsultant(con.consultantEmail)
                        }}>Update</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => {

                          deleteConsultant(con.consultantEmail)
                        }}>Delete</button></td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {isAllOperator &&
          <>

            <Modal show={showO} onHide={handleCloseO}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitViewProfile}>
                  <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="operatorName" value={warehouseOperatorTemp.operatorName} onChange={changeHandleViewProfile} />
                  </div>

                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="operatorEmail" value={warehouseOperatorTemp.operatorEmail} onChange={changeHandleViewProfile} readOnly />
                  </div>

                  <div className="form-group">
                    <label >Phone Number:</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" name="operatorPhoneNo" value={warehouseOperatorTemp.operatorPhoneNo} onChange={changeHandleViewProfile} />
                  </div>

                  <div className="form-group">
                    <label >Address:</label>
                    <input type="number" className="form-control mb-2" placeholder="Enter door number" name="operatorDoorNo" value={warehouseOperatorTemp.operatorDoorNo} onChange={changeHandleViewProfile} />
                    <input type="text" className="form-control mb-2" placeholder="Enter place" name="operatorPlace" value={warehouseOperatorTemp.operatorPlace} onChange={changeHandleViewProfile} />
                    <input type="text" className="form-control mb-2" placeholder="Enter city" name="operatorCity" value={warehouseOperatorTemp.operatorCity} onChange={changeHandleViewProfile} />
                    <input type="text" className="form-control mb-2" placeholder="Enter state" name="operatorState" value={warehouseOperatorTemp.operatorState} onChange={changeHandleViewProfile} />
                    <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="operatorPincode" value={warehouseOperatorTemp.operatorPincode} onChange={changeHandleViewProfile} />
                  </div>
                  <button type="submit" className="btn-light btn-change">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseO}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <h5 className="text-uppercase text-center mb-4">View Operators</h5>
            <div className="table-responsive" id="no-more-tables">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Operator Name</th>
                    <th>Operator Email</th>
                    <th>Operator Phone Number</th>
                    <th>Operator Address</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {viewAllOperator.map((operator, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="Name">{operator.operatorName}</td>
                        <td data-title="Email">{operator.operatorEmail}</td>
                        <td data-title="Phone number">{operator.operatorPhoneNo}</td>
                        <td data-title="Address">
                          {operator.operatorAddress.operatorDoorNo},
                          {operator.operatorAddress.operatorPlace},
                          {operator.operatorAddress.operatorCity},
                          {operator.operatorAddress.operatorState},
                          {operator.operatorAddress.operatorPincode}

                        </td>
                        <td><button type="button" className="btn btn-success" onClick={() => {

                          updateOperator(operator.operatorEmail)
                        }}>Update</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => {

                          deleteOperator(operator.operatorEmail)
                        }}>Delete</button></td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>

          </>}

        {start &&
          <>

            <h5 className="start">Pesticide Management System <br />Administrator</h5>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                  <div className="card shadow border">
                    <div className="card-body d-flex flex-column align-items-center">
                      <table class="table  table-condensed table-hover table-bordered table-striped">
                        <tbody>
                          <tr>
                            <td>Total Farmers</td>
                            <td>:</td>
                            <td><b>{farmerCount}</b></td>
                          </tr>
                          <tr>
                            <td>Total Consultant</td>
                            <td>:</td>
                            <td><b>{consultantCount}</b></td>
                          </tr>
                          <tr>
                            <td>Total Warehouse Operators</td>
                            <td>:</td>
                            <td><b>{operatorCount}</b></td>
                          </tr>
                          <tr>
                            <td>Total Deliver Person</td>
                            <td>:</td>
                            <td><b>{deliveryPersonCount}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </>}

        {isDeliverPerson && <DeliverPersonRegister />}

        {isDeliverPersonView &&
          <>
            <Modal show={showD} onHide={handleCloseD}>
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
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={deliverPersonTemp.email} onChange={changeHandleDeliverPersonView} readOnly />
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
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseD}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <h5 className="text-uppercase text-center mb-4">View Deliver Person</h5>
            <div className="table-responsive" id="no-more-tables">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {deliverPerson.map((del, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="Name">{del.name}</td>
                        <td data-title="Email">{del.email}</td>
                        <td data-title="Phone number">{del.phoneNo}</td>
                        <td data-title="Address">
                          {del.deliverAddress.doorNo},
                          {del.deliverAddress.place},
                          {del.deliverAddress.city},
                          {del.deliverAddress.state},
                          {del.deliverAddress.pincode}

                        </td>
                        <td><button type="button" className="btn btn-success" onClick={() => {

                          updateDeliverPerson(del.email)
                        }}>Update</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => {

                          deleteDeliverPerson(del.email)
                        }}>Delete</button></td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </>
        }
        {isAllFarmer &&
          <>
            <Modal show={showF} onHide={handleCloseF}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitFarmer}>
                  <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="name" value={farmerTemp.name} onChange={changeHandleFarmer} />
                  </div>

                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={farmerTemp.email} onChange={changeHandleFarmer} readOnly />
                  </div>

                  <div className="form-group">
                    <label >Phone Number:</label>
                    <input type="number" className="form-control" placeholder="Enter phone number" name="phoneNo" value={farmerTemp.phoneNo} onChange={changeHandleFarmer} />
                  </div>

                  <div className="form-group">
                    <label >Address:</label>
                    <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={farmerTemp.doorNo} onChange={changeHandleFarmer} />
                    <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={farmerTemp.place} onChange={changeHandleFarmer} />
                    <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={farmerTemp.city} onChange={changeHandleFarmer} />
                    <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={farmerTemp.state} onChange={changeHandleFarmer} />
                    <input type="number" className="form-control mb-2" placeholder="Enter pincode" name="pincode" value={farmerTemp.pincode} onChange={changeHandleFarmer} />
                  </div>
                  <button type="submit" className="btn-light btn-change">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>
                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseF}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <h5 className="text-uppercase text-center mb-4">View Farmers</h5>
            <div className="table-responsive" id="no-more-tables" >
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Farmer Name</th>
                    <th>Farmer Email</th>
                    <th>Farmer Phone Number</th>
                    <th>Farmer Address</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {farmer.map((farm, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="Name">{farm.name}</td>
                        <td data-title="Email">{farm.email}</td>
                        <td data-title="Phone number">{farm.phoneNo}</td>
                        <td data-title="Address">
                          {farm.address.doorNo},
                          {farm.address.place},
                          {farm.address.city},
                          {farm.address.state},
                          {farm.address.pincode}

                        </td>
                        <td><button type="button" className="btn btn-success" onClick={() => {

                          updateFarmer(farm.email)
                        }}>Update</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => {

                          deleteFarmer(farm.email)
                        }}>Delete</button></td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>

          </>}
      </>}
    </>

  )
}

export default AdminHome