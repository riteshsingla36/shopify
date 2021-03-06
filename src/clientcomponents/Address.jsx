import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  if (JSON.parse(sessionStorage.getItem("total")) === 0) {
    navigate("/cart");
  }
  const [addresses, setAddresses] = useState([]);
  const [currentAdd, setCurrentAdd] = useState("");
  const id = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    axios
      .get(`/address?user=${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((data) => setAddresses(data.data))
      .catch((err) => alert(err.message));
  }, []);

  const pay = () => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onerror = () => {
      alert("Razorpay failed to load");
    };
    script.onload = async () => {
      try {
        const result = await axios.post(
          "/create-order",
          {
            amount: JSON.parse(sessionStorage.getItem("total")) + "00",
          },
          {
            headers: {
              token: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/get-razorpay-key");

        const address = await axios
          .get(`/address/${JSON.parse(localStorage.getItem("address"))}`, {
            headers: {
              token: JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((data) => data.data)
          .catch((err) => alert("address not found"));

        const items = await axios
          .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`, {
            headers: {
              token: JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((data) => data.data);

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "shopify",
          description: "transaction",
          order_id: order_id,
          handler: async function (res) {
            const result = await axios.patch(
              `/cart/${JSON.parse(localStorage.getItem("cart"))}/pay-order`,
              {
                amount: amount / 100,
                razorpayPaymentId: res.razorpay_payment_id,
                razorpayOrderId: res.razorpay_order_id,
                razorpaySignature: res.razorpay_signature,
                address: address,
                products: [...items],
              },
              {
                headers: {
                  token: JSON.parse(localStorage.getItem("token")),
                },
              }
            );

            // deleting all previous items existing for this cart

            axios.delete(
              `/item/deleteall/${JSON.parse(localStorage.getItem("cart"))}`,
              {
                headers: {
                  token: JSON.parse(localStorage.getItem("token")),
                },
              }
            );

            //creating new cart after successful payment
            axios
              .post(
                "/cart",
                {
                  user: JSON.parse(localStorage.getItem("user"))._id,
                },
                {
                  headers: {
                    token: JSON.parse(localStorage.getItem("token")),
                  },
                }
              )
              .then((data) => {
                localStorage.setItem("cart", JSON.stringify(data.data._id));
              });
            navigate("/");
            localStorage.removeItem("total")
            localStorage.removeItem("address")
            localStorage.removeItem("rzp_device_id")
            alert(result.data.msg);
            sessionStorage.clear();
            window.location.reload();
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err.message);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <h1>
        Address
        <button onClick={() => navigate("/create-address")}>
          Create Address
        </button>
      </h1>
      {addresses.map((address) => {
        return (
          <div key={address._id}>
            <input
              type="radio"
              value={address._id}
              name="adrs"
              onChange={() => {
                localStorage.setItem("address", JSON.stringify(address._id));
                setCurrentAdd(address._id);
              }}
              checked={
                JSON.parse(localStorage.getItem("address")) === address._id
              }
            />
            <h1>{address.name} </h1>
            <p>{address.area}</p>
          </div>
        );
      })}

      <button
        disabled={JSON.parse(localStorage.getItem("address")) ? false : true}
        onClick={pay}
      >
        Proceed to pay
      </button>
    </div>
  );
};

export default Address;
