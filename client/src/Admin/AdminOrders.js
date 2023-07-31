import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/Layout/AdminMenu'
import Layouts from '../components/Layout/Layouts'
import { useAuth } from '../context/auth';
import moment from 'moment';
import axios from 'axios';

const AdminOrders = () => {
const [status,setStatus]=useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
const [changeStatus,setChangeStatus]= useState('')
const [orders, setOrders] = useState([]);
const [auth, setAuth] = useAuth();
const getOrders = async (req, res) => {
  try {
    const { data } = await axios.get("/api/v1/auth/all-orders");
    setOrders(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (auth?.token) getOrders();
}, [auth?.token]);
  return (
   <Layouts title={"Admin - All Orders"}>
     <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1} </td>
                        <td>{o?.status} </td>
                        <td> {o?.buyer?.name} </td>
                        <td>{moment(o?.createdAt).fromNow()} </td>
                        <td> {o?.payment?.success ? "Success" : "Failed"} </td>
                        <td> {o?.products?.length} </td>
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
                            width="100px"
                            height={"130px"}
                          />
                        </div>
                        <div className="col-md-8">
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
   </Layouts>
  )
}

export default AdminOrders