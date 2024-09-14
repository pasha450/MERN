import React from "react";
import { Link } from "react-router-dom";

function Dashboard(){
    return(
        <section className="main-content-outer h-100">
        <div className="container-fluid h-100">
          <div className="form-row h-100">
            <div className="side-nav">
              <div className="left-panel h-100">
                <Link className="logo-top mb-3" to ="coach-login.html">
                  <img src="/assests/images/brand-logo-icon.png" alt="logo"/>
                  <span className="brand-logo-text"><img src="/assests/images/brand-logo-text.png" alt="logo"/></span>
                </Link>
                <ul className="nav navbar-nav nav-pills mb-3">
                  <li className="nav-item" title="Client">
                    <Link className="nav-link icon-top active" id="pills-home-tab" to=""><img src="/assests/images/client.svg" alt="icon"/>Client</Link>
                  </li>
                  <li className="nav-item" title="Session Planner">
                    <Link  className="nav-link icon-top" id="pills-profile-tab" to="coach-session-planner.html"><img src="/assests/images/calendar.svg" alt="icon"/>Session Planner</Link>
                  </li>
    
                  <li className="nav-item" title="Exercise Library">
                    <Link className="nav-link icon-top" id="pills-contact-tab" href="coach-exercise-library.html"><img src="/assests/images/exercise-library.svg"
                        alt="icon"/>Exercise
                      Library</Link>
                  </li>
                  <li className="nav-item" title="Custom Presets">
                    <Link className="nav-link icon-top" id="pills-custom-tab" href="coach-custom-presets.html"><img src="/assests/images/custom.svg" alt="icon"/>Custom
                      Presets</Link>
                  </li>
                  <li className="nav-item" title="Logout">
                    <Link className="nav-link icon-top" href="coach-login.html"><img src="/assests/images/logout.svg" alt="icon"/>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-content-section">
              <div className="right-panel">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="title-bg title2 d-flex align-items-center justify-content-between">
                      <img src="/assests/images/client.svg" alt="icon"/>
                      <h1>Clients</h1>
                      <Link className="right-btn position-static" href="javascript:void(0);"><i className="fa fa-plus"></i> Add
                        Clients</Link>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-block">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Contact</th>
                              <th>Program Started</th>
                              <th>Program Ends</th>
                              <th>Last Check-In</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-envelope"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-edit"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-envelope"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-edit"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-envelope"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-edit"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-envelope"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link href="javascript:void(0);"><i className="fa fa-edit"></i></Link>
                                  <Link href="javascript:void(0);"><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
export default Dashboard; 