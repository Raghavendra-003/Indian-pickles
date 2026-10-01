import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import { CartContext } from "../../context/CartContext";
import "./cart.css";

const Cart = () => {
  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(CartContext);
  const navigate = useNavigate();

  if (!context) return null;

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    getGrandTotal,
    clearCart,
  } = context;

  const cartCount = (cartItems || []).reduce(
  (total, item) => total + item.quantity,
  0
);

  const adminNumber = "917095543843";
  const API_URL = (import.meta.env.VITE_API_URL || "https://indian-pickles.onrender.com").replace(/\/+$/, "");

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formattedItems = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        weight: item.weight,
        price: item.price,
        quantity: item.quantity,
      }));

      const url = `${API_URL}/api/orders/create-order`;
      const requestBody = {
        items: formattedItems,
        totalAmount: getGrandTotal(),
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      let data;

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (err) {
        data = {};
      }

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("The order service is starting or temporarily unavailable. Please wait a minute and try again.");
        }
        throw new Error(data.message || `Could not place order (server error ${response.status}).`);
      }

      if (data.success) {
        const orderId = data.orderId;
        const orderDate = new Date().toLocaleString();
        console.log(orderId, orderDate, formattedItems);
        let message = `Hello Kamala Pickle,\n\n`;
        message += `My Order ID: ${orderId}\n\n`;
        message += `Date: ${orderDate}\n\n`;
        message += `Order Details:\n`;

        formattedItems.forEach((item, index) => {
          message += `${index + 1}. ${item.name} (${item.weight})\n`;
          message += `₹${item.price} x ${item.quantity} = ₹${
            item.price * item.quantity
          }\n`;
        });

        message += `\nTotal Amount: ₹${getGrandTotal()}\n\n`;
        message += `Please confirm my order.`;

        setWhatsAppMessage(message);
        setCurrentOrderId(orderId);

        // 🔥 SHOW MODAL
        setShowSuccess(true);
      } else {
        throw new Error(data.message || "The server did not confirm the order. Please try again.");
      }
    } catch (error) {
      const message = error instanceof TypeError
        ? "Could not reach the order service. It may be starting; please wait a minute and try again."
        : error.message || "Could not place your order. Please try again.";
      console.error("Order submission failed:", error);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <Link to="/" className="logo-link">
            <h1 className="logo">
              KAMALA <span>PICKLE</span>
            </h1>
          </Link>

          <div className="cart-badge">Cart  ({cartCount})</div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <div className="empty-cart">
            <p style={{ fontSize: 28, fontWeight: "bold" }}>
              Your cart is empty.
            </p>
            <button
              className="button"
              onClick={() => navigate("/products")}
            >
              Add more
            </button>
          </div>
        )}

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-left">
              <img src={item.image} alt={item.name} />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Weight: {item.weight}</p>
                <p>₹{item.price}</p>
                <p className="subtotal">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>
            </div>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id, item.weight)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id, item.weight)}>
                +
              </button>
            </div>
          </div>
        ))}

        {/* Footer */}
        {cartItems.length > 0 && (
          <>
            <div className="total">
              Grand Total: ₹{getGrandTotal()}
            </div>

            <div className="cart-actions">
              <Link to="/products">
                <button className="button">Back</button>
              </Link>

              <button
                className="place-order"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ SUCCESS MODAL */}
      {showSuccess && (
        <div
          className="modal"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccess(false)}
              className="close-btn"
            >
              ❌
            </button>

            <div className="emoji">🎉🎊</div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Order ID: <strong>{currentOrderId}</strong>
            </p>

            <button
              className="btn whatsapp"
              onClick={() => {
                const encodedMessage =
                  encodeURIComponent(whatsAppMessage);

                window.open(
                  `https://wa.me/${adminNumber}?text=${encodedMessage}`,
                  "_blank"
                );

                setShowSuccess(false);
                clearCart();
              }}
            >
              Continue to WhatsApp
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;