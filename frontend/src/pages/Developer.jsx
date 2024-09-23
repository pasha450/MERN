import React from "react";
import Sidebar from "../components/Sidebar";
import Development from "../components/Development";


const Developer = () => {
    return(
        <>
            <section class="main-content-outer h-100">
            <div class="container-fluid h-100">
              <div class="form-row h-100">
                <Sidebar/>
                <Development/>
              </div>
              </div>
            </section>
      </>
    )
}
export default Developer;