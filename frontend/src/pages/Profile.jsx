import React from "react";
import Sidebar from "../components/Sidebar";
import EditProfile from "../components/EditProfile";
const Profile = () => {
    return(
        <>
        <section class="main-content-outer h-100">
          <div class="container-fluid h-100">
            <div class="form-row h-100">
              <Sidebar/>
              <EditProfile/>
            </div>
            </div>
          </section>

      </>
    )
}
export default Profile;
