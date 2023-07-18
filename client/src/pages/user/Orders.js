import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layouts from "../../components/Layout/Layouts";

const Orders = () => {
  return (
    <Layouts title={"Your Order"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Orders;
