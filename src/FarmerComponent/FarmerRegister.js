import React, { useState, useEffect } from 'react';
import '../LoginComponent/Login.css';
import FarmerService from '../Services/FarmerService'
import { Backdrop, CircularProgress, jssPreset } from '@material-ui/core';
import MenuBar from '../components/navigations/MenuBar';
import Footer from '../components/navigations/Footer'
import SaveIcon from '@material-ui/icons/Save';
import { Country, State, City } from 'country-state-city';


function FarmerRegister() {

    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const handleClose = () => setShow(false);

    const [country, setCountry] = useState(Country.getAllCountries());
    const [countryid, setCountryid] = useState('');
    const [st, setSt] = useState([]);
    const [stateid, setStateid] = useState('');
    const [city, setCity] = useState([]);


    const [farmers, setFarmers] = useState(
        {
            name: "",
            email: "",
            phoneNo: ""
        });
    const [address, setFarmersAddress] = useState(
        {
            doorNo: "",
            place: "",
            city: "",
            state: "",
            pincode: ""
        });
    const [formEror, setFormError] = useState({})

    const changeHandle = e => {
        setFarmers((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };
    const changeHandleAddress = e => {
        setFarmersAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }))
    };


    const handlecountry = async (event) => {
        
        const getcountryid = event.target.value;
        setCountryid(getcountryid);
       setSt(State.getStatesOfCountry(getcountryid))
       
    }
    const handlestate = (event) => {
        const getstateid = event.target.value;
        setStateid(getstateid);
        setFarmersAddress({...address,
            state: State.getStateByCodeAndCountry(getstateid, countryid).name
        })
        setCity(City.getCitiesOfState(countryid, getstateid))
        console.log(JSON.stringify(City.getCitiesOfState(countryid, getstateid)))
    }
    
    const handlecity = (event) => {
        setFarmersAddress({...address,
            "city":event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newfarmers = { ...farmers, address };

        setLoading(true)
        const data = await FarmerService.create(newfarmers)
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
        setIsSubmit(false)
        setLoading(false)

    };
    const validate = (values) => {
        const errors = {}
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneFormat = /^\d{10}$/
        const pincodeFormat = /^\d{6}$/
        if (!values.email) {
            errors.email = "Email is required"
        }
        else if (!emailFormat.test(farmers.email)) {
            errors.email = "Should enter valid email"
        }
        if (!values.phoneNo) {
            errors.phoneNo = "Phone number is required"
        } else if (!phoneFormat.test(farmers.phoneNo)) {
            errors.phoneNo = "Phone number should be ten digit"
        }

        if (!values.address.pincode) {
            errors.pincode = "Pincode is required"
        } else if (!pincodeFormat.test(address.pincode)) {
            errors.pincode = "Pincode should be in six digit"
        }
        return errors
    }
    return (
        <>
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <MenuBar />
                <>
                    <div className="container pt-5">
                        <div className="row d-flex justify-content-center  align-items-center h-100 pt-5">
                            <div className="col-12 col-md-9 col-lg-7  col-xl-6">
                                <div className="card " >
                                    <div className="card-body p-5">
                                        {success && <p className='text-center fw-bold fs-6 text-success'>Successfully registered. check your mail.</p>}
                                        {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to register.{failureMessage}</p>}
                                        <h2 className="text-uppercase text-center mb-5">Farmer Registration</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label >Name:</label>
                                                <input type="text" className="form-control" placeholder="Enter name" name="name" value={farmers.name} onChange={changeHandle} required />
                                            </div>
                                            <p className='text-danger'>{formEror.name}</p>

                                            <div className="form-group">
                                                <label >Email:</label>
                                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={farmers.email} onChange={changeHandle} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" required />
                                            </div>
                                            <p className='text-danger'>{formEror.email}</p>
                                            <div className="form-group">
                                                <label >Phone Number:</label>
                                                <input type="text" className="form-control" placeholder="Enter phone number" name="phoneNo" pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets" value={farmers.phoneNo} onChange={changeHandle} required />
                                            </div>
                                            <p className='text-danger'>{formEror.phoneNo}</p>
                                            <div className="form-group">
                                                <label >Door Number:</label>
                                                <input type="number" className="form-control mb-2" placeholder="Enter door number" name="doorNo" value={address.doorNo} onChange={changeHandleAddress} required />
                                                
                                                <label >Place:</label>
                                                <input type="text" className="form-control mb-2" placeholder="Enter place" name="place" value={address.place} onChange={changeHandleAddress} required />
                                                
                                                <label >Country:</label>
                                                <select name="country" className="form-select mb-2" onChange={(e) => handlecountry(e)} required>
                                                    <option value="">--Select Country--</option>
                                                    <option value="IN">India</option>
                                                    {
                                                        country.map((getcon, index) => {
                                                            return (
                                                                <option key={index} value={getcon.isoCode}>{getcon.name} </option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                                <label >State:</label>
                                                <select className="form-select mb-2" name="state" onChange={(e) => handlestate(e)} required>
                                                    <option value="">--Select State--</option>
                                                    {
                                                        st.map((getst, index) => (
                                                            <option key={index} value={getst.isoCode}>{getst.name} </option>
                                                        ))
                                                    }
                                                </select>

                                                <label >City:</label>
                                                <select className="form-select mb-2" name="city" onChange={(e) => handlecity(e)} required>
                                                    <option value="">--Select City--</option>
                                                    {
                                                        city.map((gcity, index) => (
                                                            <option key={index} value={gcity.name}> {gcity.name} </option>
                                                        ))
                                                    }
                                                </select>

                                                {/* <input type="text" className="form-control mb-2" placeholder="Enter city" name="city" value={address.city} onChange={changeHandleAddress} required /> */}
                                                {/* <input type="text" className="form-control mb-2" placeholder="Enter state" name="state" value={address.state} onChange={} required /> */}
                                                
                                                <label >Pincode:</label>
                                                <input type="text" className="form-control mb-2" placeholder="Enter pincode" name="pincode" pattern="^\d{6}$" title="Pincode should be in 6 digits without any spaces or alphabets" value={address.pincode} onChange={changeHandleAddress} required/>
                                               
                                              
                                            </div>
                                            <p className='text-danger'>{formEror.pincode}</p>
                                            <button type="submit" className="btn-light btn-change"><SaveIcon />Submit</button>

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

export default FarmerRegister