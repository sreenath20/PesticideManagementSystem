import React from 'react'
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import './Pricing.css'

const Home = () => {
    return (
        <React.Fragment>
            <section className="flex">
            <div className="textArea"> 
                    <h2>What's in this system</h2>
                </div>
            <div className="columns">
                <ul className="price">
                    <li className="col-header" style={{backgroundColor:'#B83215'}}>Farmers</li>
                    <li className="grey">Registration<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Upload affect crop details<br/><ArrowDownwardRoundedIcon/></li>
                    <li>View solution with right pesticides<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Pay and get pesticides</li>
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                    <li className="col-header" style={{backgroundColor:'#FE7613'}}>Consultants</li>
                    <li className="grey">View infected crops<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Providing suggestions (If any)<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Finding solutions and Adding right pesticides to farmer cart<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Giving usage manual</li>
                </ul>
                </div>

                <div className="columns">
                <ul className="price">
                <li className="col-header" style={{backgroundColor:'#B83215'}}>Administrators & Warehouse Operators</li>
                    <li className="grey">Manage all records<br/><ArrowDownwardRoundedIcon/></li>
                    <li>View ordered pesticides<br/><ArrowDownwardRoundedIcon/></li>
                    <li>Update delivery status<br/><ArrowDownwardRoundedIcon/></li>                    
                    <li>Adding and Updating pesticides</li>
                </ul>
                </div>

              
            </section>
        </React.Fragment>
    )
}

export default Home;