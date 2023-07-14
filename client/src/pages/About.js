import React from "react";
import Layouts from "../components/Layout/Layouts";

const About = () => {
  return (
    <Layouts title={"About us - Ecommer app"}>
      <div className="row display ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="about_us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layouts>
  );
};

export default About;
