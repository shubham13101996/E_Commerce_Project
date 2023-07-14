import React from "react";
import Layouts from "../components/Layout/Layouts";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layouts title={"Go back - Page Not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading"> Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layouts>
  );
};

export default PageNotFound;
