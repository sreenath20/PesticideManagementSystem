import React from 'react'
import './Testimonials.css'


const Home = () => {
    return (
        <React.Fragment>
            <section className="content-container pt-5">
                <div className="textArea"> 
                    <h2></h2>
                    <h4>About Us</h4>
                </div>
                <div className="cust-container " >
                    <p>The aim of this system is to provide solution for farmers those who are all want right pesticide at right time for their crops. This system is to capture crop disease which was entered by the farmers and then consultant take a review on the disease with image. Then the consultant take decision that he will provide right pesticides or give suggestios to farmer to bring samples for laboratory tests.</p>
                    <div className="d-flex justify-content-center">
                    <div className="card text-center ">
                   
                            <div id="details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="fa fa-map-marker fa- " ></i></td>
                                            <td>Gowtham Shanmugam,<br />
                                               Namakkal,<br />
                                                Tamilnadu,<br />
                                                637 210.
                                                <p></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-phone fa- " ></i></td>
                                            <td>Phone No : 8778132161</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-envelope fa- " ></i></td>
                                            <td>Email : gowthamshanmugam99@gmail.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                </div>
               
            </section>
        </React.Fragment>
    )
}

export default Home;