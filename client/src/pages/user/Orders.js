import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layouts from "../../components/Layout/Layouts";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layouts title={"Your Order"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1} </th>
                        <th>{o?.status} </th>
                        <th> {o?.buyer?.name} </th>
                        <th>{moment(o?.createdAt).fromNow()} </th>
                        <th> {o?.payment?.success ? "Success" : "Failed"} </th>
                        <th> {o?.products?.length} </th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p,i) => (
                      <div className="row card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100%"
                            height={"130px"}
                          />
                        </div>
                        <div className="col-md-4">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Orders;
