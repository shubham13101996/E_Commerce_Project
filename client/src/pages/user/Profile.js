import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layouts from "../../components/Layout/Layouts";

const Profile = () => {
  return (
    <Layouts title={"Your profile"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Profile;
