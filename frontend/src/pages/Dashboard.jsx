import React from "react";
import Sidebar from "../components/Sidebar";


const Dashboard =() =>{
    return(
        <>
          <section class="main-content-outer h-100">
            <div class="container-fluid h-100">
              <div class="form-row h-100">
                <Sidebar/>
              </div>
              </div>
            </section>

        </>
    )
}
export default Dashboard;