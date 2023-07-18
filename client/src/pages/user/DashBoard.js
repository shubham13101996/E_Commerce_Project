import React from "react";
import Layouts from "../../components/Layout/Layouts";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layouts title={"Dashboard - Ecommerce App"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default DashBoard;
