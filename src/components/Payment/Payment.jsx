import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const server = "http://localhost:8081/api/v2";

  useEffect(() => {
    const savedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
    if (savedOrderData) {
      setOrderData(savedOrderData);
    }
  }, []);

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const order = {
      cart: orderData?.cart,
      shippingAddress: orderData?.shippingAddress,
      user: user,
      totalPrice: orderData?.totalPrice,
      paymentInfo: {
        type: "Cash On Delivery",
      },
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(`${server}/order/create-order`, order, config);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    } catch (error) {
      toast.error("An error occurred while processing your order.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo cashOnDeliveryHandler={cashOnDeliveryHandler} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <br />
      {/* Cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Bayar Ditempat COD (Cash On Delivery)
          </h4>
        </div>

        {/* Cash on delivery */}
        {select === 3 && (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  console.log('order data : '+orderData);
  console.log('shipping : '+shipping);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      {/* ... JSX for displaying cart data */}
    </div>
  );
};

export default Payment;
