import React from "react";
import Layouts from "../components/Layout/Layouts";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //   total price of items in cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   remove item from cart
  const deleteCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

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
                  <p> $ {pro.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCartItem(pro._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>CART SUMMARY</h2>
            <p>Total || Checkout || Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="btn btn-outline-warning"
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CartPage;
