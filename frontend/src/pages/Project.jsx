import React from "react";
import ProjectManagement from "../components/ProjectManagement";
import Sidebar from "../components/Sidebar";

const Project = () => {
    return(
        <>
            <section class="main-content-outer h-100">
            <div class="container-fluid h-100">
              <div class="form-row h-100">
                <Sidebar/>
                <ProjectManagement/>
              
              </div>
              </div>
            </section>                  
      </>
    )
}  
export default Project;