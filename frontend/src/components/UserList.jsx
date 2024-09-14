import { Link } from "react-router-dom";


function UserList (){
   
    return(
       <> 
        <div className="main-content-section">
              <div className="right-panel">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="title-bg title2 d-flex align-items-center justify-content-between">
                      <img src="/assests/images/client.svg" alt="icon"/>
                      <h1>Clients</h1>
                      <Link className="right-btn position-static" to =""><i className="fa fa-plus"></i> Add
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
                                  <Link to =""><i className="fa fa-envelope"></i></Link>
                                  <Link to =""><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-edit"></i></Link>
                                  <Link to =""><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-envelope"></i></Link>
                                  <Link to =""><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-edit"></i></Link>
                                  <Link to =""><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-envelope"></i></Link>
                                  <Link to =""><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-edit"></i></Link>
                                  <Link to =""><i className="fa fa-trash"></i></Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>John Smith</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-envelope"></i></Link>
                                  <Link to =""><i className="fa fa-phone"></i></Link>
                                </div>
                              </td>
                        
                              <td>6th February 2023</td>
                              <td>20th March 2023</td>
                              <td>3rd February 2023</td>
                              <td>
                                <div className="td-icons">
                                  <Link to =""><i className="fa fa-edit"></i></Link>
                                  <Link to =""><i className="fa fa-trash"></i></Link>
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
       </>
    )
}
export default UserList;