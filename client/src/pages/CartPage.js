import React from "react";
import Layouts from "../components/Layout/Layouts";
import { useCart } from "../context/cart";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  return (
    <Layouts title={"Cart - Ecommerce App"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((pro) => (
              <div className="row card p-3 flex-row mb-2">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${pro?._id}`}
                    className="card-img-top"
                    alt={pro.name}
                    width={"100px"}
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{pro.name}</p>
                  <p>{pro.description.substring(0, 30)}</p>
                  <p>{pro.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">Checkout || Payment</div>
        </div>
      </div>
    </Layouts>
  );
};

export default CartPage;
