import React from "react";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";

const Priority = () => {
    return(
        <>
            <section class="main-content-outer h-100">
            <div class="container-fluid h-100">
              <div class="form-row h-100">
                <Sidebar/>
                <Status/>
              </div>
              </div>
            </section>
      </>
    )
}
export default Priority ; 