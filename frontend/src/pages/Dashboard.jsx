import React from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";

const Dashboard =() =>{
    return(
        <>
          <section class="main-content-outer h-100">
            <div class="container-fluid h-100">
              <div class="form-row h-100">
                <Sidebar/>
                <UserList/>
              </div>
              </div>
            </section>

        </>
    )
}
export default Dashboard;