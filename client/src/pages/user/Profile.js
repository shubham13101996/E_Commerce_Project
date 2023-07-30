import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layouts from "../../components/Layout/Layouts";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state variable
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get the user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setEmail(email);
    setName(name);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);
  // submit form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        // console.log(res.data.message);
        toast.error(data?.error);
        // toast.success("res.data.message");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
    }
    // console.log(name, email, password, phone, address);
    // toast.success("Registered Successfully");
  };
  return (
    <Layouts title={"Your profile"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              {/* <h1>Register Page</h1> */}
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
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
                    disabled
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Profile;
