import React from "react";
import Layouts from "../components/Layout/Layouts";
import AdminMenu from "../components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layouts title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />{" "}
          </div>
          <div className="col-md-9">Create Category</div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateCategory;
