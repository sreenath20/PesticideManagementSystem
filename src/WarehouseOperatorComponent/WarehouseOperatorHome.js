import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import WarehouseOperatorService from '../Services/WarehouseOperatorService'
import { useNavigate } from 'react-router-dom';
import AddPesticides from './AddPesticides';
import PesticideService from '../Services/PesticideService';
import WarehouseOperatorChangePassword from './WarehouseOperatorChangePassword';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Backdrop, CircularProgress } from '@material-ui/core';
import '../HomeComponent/Home.css'
import EditIcon from '@material-ui/icons/BorderColor';
import '../HomeComponent/Home.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginService from '../Services/LoginService';
import HomeIcon from '@material-ui/icons/Home';
import './WarehouseOperatorHome.css';
import CountService from '../Services/CountService';
import { useCookies } from 'react-cookie';

function WarehouseOperatorHome() {
  const[cookie,setCookie,removeCookie] = useCookies()
  const location = useLocation();
  const [start, setStart] = useState(true)
  const [changeEffect, setChangeEffect] = useState(true)
  const [pesticides, setPesticides] = useState([])
  const [lastLogin, setLastLogin] = useState("");
  const [show, setShow] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [warehouseOperatorEmail, setWarehouseOperatorEmail] = useState()
  const [isProfile, setIsProfile] = useState(false)
  const [isAddPesticides, setIsAddPesticides] = useState(false)
  const [isViewPesticides, setIsViewPesticides] = useState(false)
  const [wareHouseOperator, setWareHouseOperator] = useState(null)
  const [warehouseOperators, setWarehouseOperators] = useState(null)
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPest, setShowPest] = useState(false);
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
  const [avlQtyInGm, setAvlQtyInGm] = useState(0);
  const [pricePerGm, setPricePerGm] = useState(0.0)
  const [pestName, setPestName] = useState("")
  const [pestId, setPestId] = useState("")
    const [pesticidesCount, setPesticidesCount] = useState()
    const [pesticideOutOfStockCount,setPesticideOutOfStockCount] = useState()
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (id) => {
    setShow(true);
  }

  const [welcomeMsg, setWelcomeMsg] = useState("")
  const navigate = useNavigate()

  useEffect(async () => {
    setLoading(true)
   
    const data = await LoginService.getOperator()
      .then((response) => {
        setWareHouseOperator(response.data)
        setWarehouseOperatorEmail(location.state.email)
        setWarehouseOperators(response.data)
        setLastLogin(response.data.lastLogin)
        setWarehouseOperatorTemp(
          {

            "operatorEmail": response.data.operatorEmail,
            "operatorName": response.data.operatorName,
            "operatorPhoneNo": response.data.operatorPhoneNo,
            "operatorDoorNo": response.data.operatorAddress.operatorDoorNo,
            "operatorPlace": response.data.operatorAddress.operatorPlace,
            "operatorCity": response.data.operatorAddress.operatorCity,
            "operatorState": response.data.operatorAddress.operatorState,
            "operatorPincode": response.data.operatorAddress.operatorPincode
          }
        )
        setWelcomeMsg(response.data['operatorName'])
      })
      .catch((err)=>{
        setLoading(false)
        navigate('/login')
      })
    const data3 = await PesticideService.getAll()
      .then((response) => {
        setPesticides(response.data)
      }).catch((error) => {
        alert(error.response.data)
      })
      const data4 = await CountService.pesticideCount()
      .then((response)=>{
        setPesticidesCount(response.data)
      })
      const data5 = await CountService.pesticideCountByAvailableQty()
      .then((response)=>{
        setPesticideOutOfStockCount(response.data)
      })
    setLoading(false)
  }, [changeEffect])

  const logout = () => {
    const logoutDTO = {
      "email":warehouseOperatorEmail,
      "type": "WarehouseOperator"
    }
    LoginService.logout(logoutDTO)
    .then((response)=>{
      removeCookie(logoutDTO.type)
      localStorage.removeItem("token");
      navigate('/')
    })
  };
  const profile = () => {
    setIsProfile(true)
    setIsAddPesticides(false)
    setIsViewPesticides(false)
    setIsChangePassword(false)
    setStart(false)
  };
  const addPesticides = () => {
    setIsProfile(false)
    setIsAddPesticides(true)
    setIsViewPesticides(false)
    setIsChangePassword(false)
    setStart(false)
  }
  const viewPesticides = async () => {
    setLoading(true)
    const data3 = await PesticideService.getAll()
      .then((response) => {
        setPesticides(response.data)
        setIsProfile(false)
        setIsAddPesticides(false)
        setIsViewPesticides(true)
        setIsChangePassword(false)
        setStart(false)
      }).catch((error) => {
        alert(error.response.data)
      })
    setLoading(false)

  };
  const changePassword = () => {
    setIsProfile(false)
    setIsAddPesticides(false)
    setIsViewPesticides(false)
    setIsChangePassword(true)
  };

  const changeHandleViewProfile = e => {
    setWarehouseOperatorTemp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmitViewProfile = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = await WarehouseOperatorService.update(warehouseOperatorEmail, warehouseOperatorTemp)
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
  const handleCloseViewProfile = () => setShowViewProfile(false);
  const handleShowViewProfile = () => setShowViewProfile(true);
 const handleClosePest = () => setShowPest(false);
  const handleShowPest = () => setShowPest(true);
  function updatePest(pestId) {
    const data1 = PesticideService.get(pestId)
      .then((response) => {
        setPestName(response.data['pestName'])
        setAvlQtyInGm(response.data['avlQtyInGm'])
        setPricePerGm(response.data['pricePerGm'])
        setPestId(response.data['pestId'])
      })
    setShowPest(true)

  }
  function deletePest(pestId) {

    const data1 = PesticideService.delete(pestId)
      .then((response) => {
        setChangeEffect(false)
      })
      .catch((error) => {
        alert(error.response.data)
      })
    setChangeEffect(true)
  }
  const handleSubmitPest = async (event) => {
    event.preventDefault();
    setLoading(true)
    const pesticidesUpdateTemp = { pestName, avlQtyInGm, pricePerGm }
    const data = await PesticideService.update(pestId, pesticidesUpdateTemp)
      .then(response => {
        setChangeEffect(false)
        setSuccess(true);
        setFailure(false)
      })
      .catch(error => {
        setFailureMsg(error.response.data)
        setSuccess(false);
        setFailure(true)
      })
    setLoading(false)
    setChangeEffect(true)
  };

  return (
    <>
      {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {!loading && <>
        <nav className="navbar navbar-expand-sm navbar-dark Menu">
        <div className="container-fluid">
          <div className='navbar-header'>
          <p className='welcome w2 start_Msg'> <HomeIcon fontSize="large" onClick={()=>window.location.reload(false)}/></p>
            
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
                  <button type="button" className='buttonStyle' onClick={addPesticides} >Add Pesticides</button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={viewPesticides} >View Pesticides</button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={changePassword} >Change Password</button>
                </li>
                <li className="nav-item">
                  <button type="button" className='buttonStyle' onClick={logout} >Logout</button>
                </li>
              </ul>
            </div>
          </div>
          <HomeIcon fontSize='large' className='last_Login w1 homeButton' onClick={()=>window.location.reload(false)}/>
      
        </nav>
        <p className="welcome">Welcome: <b>{welcomeMsg}</b></p>
        {isProfile &&
          <>
            <Modal show={showViewProfile} onHide={handleCloseViewProfile}>
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
                <Button variant="secondary" onClick={handleCloseViewProfile}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className=" container">
              <h4 className="text-uppercase text-center mb-2">View Profile</h4>
              <button className='btn btn-default' data-bs-toggle="tooltip" title="Edit details" onClick={handleShowViewProfile}><EditIcon /></button>
             
                  {/* <button type="button" className='btn btn-default' data-bs-toggle="tooltip" title="Logout" onClick={logout}><PowerSettingsNewIcon/></button> */}
             
              <div className="card mb-4   ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{wareHouseOperator.operatorName}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{wareHouseOperator.operatorEmail}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone No</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{wareHouseOperator.operatorPhoneNo}</b></p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"><b>{wareHouseOperator.operatorAddress.operatorDoorNo},
                        {wareHouseOperator.operatorAddress.operatorPlace},<br />
                        {wareHouseOperator.operatorAddress.operatorCity},<br />
                        {wareHouseOperator.operatorAddress.operatorState},<br />
                        {wareHouseOperator.operatorAddress.operatorPincode}</b>
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
        {isAddPesticides && <AddPesticides />}
        {isViewPesticides &&
          <>
            <Modal show={showPest} onHide={handleClosePest}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Pesticides</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitPest}>
                  <div className="form-group">
                    <label >Pesticide Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="pestName" value={pestName} onChange={(e) => { setPestName(e.target.value) }} />
                  </div>

                  <div className="form-group">
                    <label >Available Quantity:</label>
                    <input type="number" className="form-control" placeholder="Enter avlQtyInGm" name="avlQtyInGm" value={avlQtyInGm} onChange={(e) => { setAvlQtyInGm(e.target.value) }} />
                  </div>

                  <div className="form-group">
                    <label >Price per Quantity:</label>
                    <input type="number" className="form-control" placeholder="Enter pricePerGm" name="pricePerGm" value={pricePerGm} onChange={(e) => { setPricePerGm(e.target.value) }} />
                  </div>

                  <button type="submit" className="btn btn-success btn-block btn-md gradient-custom-4 text-body">Submit</button>
                </form>
              </Modal.Body>
              <div className='text-center'>

                {failure && <p className='text-center text-danger'>{failureMsg}</p>}
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePest}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


            <div className="container">
            <div className="table-responsive" id="no-more-tables">
              <table className="table table-bordered table-hover">

                <thead>
                  <tr>
                    <th>Pesticide Name</th>
                    <th>Available Quantity</th>
                    <th>Price/Qty</th>
                    <th>Update Action</th>
                    <th>Delete Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pesticides.map((pesticide, index) =>
                    <tr key={index}>
                      <td data-title="Name">{pesticide.pestName}</td>
                      {pesticide.avlQtyInGm === 0 ?  <td  data-title="Available Quantity"><b>Out of Stock</b></td>
                      :
                      <td data-title="Available Quantity">{pesticide.avlQtyInGm}</td>}
                     
                      <td data-title="Price/Qty">{pesticide.pricePerGm}</td>
                      <td>
                        <button type="button" className="btn btn-success" onClick={() => {
                          updatePest(pesticide.pestId)
                        }}>Update</button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger" onClick={() => {
                          deletePest(pesticide.pestId)
                        }}>Delete</button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
              </div>
            </div>
          </>}
      </>
      }
      {isChangePassword && <WarehouseOperatorChangePassword objects={wareHouseOperator} />}
      {start && 
      <>
        <h5 className="start otherFarmer">Welcome to Pesticide Management System <br/> Operator</h5>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
              <div className="card shadow border">
                <div className="card-body d-flex flex-column align-items-center">
                  <table class="table  table-condensed table-hover table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Total Pesticides Added:</td>
                        <td>:</td>
                        <td><b>{pesticidesCount}</b></td>
                      </tr>
                      <tr>
                        <td>Total Out Of Stock Quantity</td>
                        <td>:</td>
                        <td><b>{pesticideOutOfStockCount}</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </>
      }
    </>

  )
}

export default WarehouseOperatorHome