import React, { useState } from "react";
import Layouts from "../../components/Layout/Layouts";
import "../../styles/Register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        // console.log(res.data.message);
        toast.success(res.data && res.data.message);
        // toast.success("res.data.message");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
    }
    // console.log(name, email, password, phone, address);
    // toast.success("Registered Successfully");
  };

  return (
    <Layouts title={"Register - Ecommerce App"}>
      <div className="form-container">
        {/* <h1>Register Page</h1> */}
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Password.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="form-control"
              value={phone}
              id="exampleInputEmail1"
              placeholder="Enter Your Phone.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              value={answer}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your favourite sports"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layouts>
  );
};

export default Register;
