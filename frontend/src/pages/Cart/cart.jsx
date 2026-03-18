import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import { CartContext } from "../../context/CartContext";
import "./cart.css";


const Cart = () => {
  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");

  const context = useContext(CartContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { cartItems, increaseQty, decreaseQty, getGrandTotal, clearCart } = context;

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const adminNumber = "917095543843";

  const handlePlaceOrder = async () => {
    console.log("clicked")
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            totalAmount: getGrandTotal(),
          }),
        }
         
      );
      if (!response.ok) {
      throw new Error("Server not responding");
    }

      const data = await response.json();

      if (data.success) {
        const orderId = data.orderId;
        const orderDate = new Date().toLocaleString();

        let message = `Hello Kamala Pickle,\n\n`;
        message += `My Order ID: ${orderId}\n\n`;
        message += `Date: ${orderDate}\n\n`;
        message += `Order Details:\n`;

        cartItems.forEach((item, index) => {
          message += `${index + 1}. ${item.name}\n`;
          message += `₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        });

        message += `\nTotal Amount: ₹${getGrandTotal()}\n\n`;
        message += `Please confirm my order.`;

        setWhatsAppMessage(message);
        setCurrentOrderId(orderId);
        setShowSuccess(true);
      }
      else {
      alert("Order failed!");
    }
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  return (
    <>
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <Link to="/">
            <h1 className="logo">
              KAMALA <span>PICKLE</span>
            </h1>
          </Link>

          <div className="cart-badge">
            Cart ({cartCount})
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <div className="empty-cart">
            <p style={{ fontSize:28 , fontWeight:"Bold" }}>Your cart is empty.</p>
              <button className="button" onClick={() => navigate("/products")}>Add more</button>
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
              <button onClick={() => decreaseQty(item.id, item.weight)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id, item.weight)}>+</button>
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

              <button className="place-order" onClick={handlePlaceOrder}>
                Place Order
              </button>
              
            </div>
          </>


        )}
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <div className="emoji">🎉🎊</div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Order ID: <strong>{currentOrderId}</strong>
            </p>

            <button
              className="btn whatsapp"
              onClick={() => {
                setShowSuccess(false);
                clearCart();

                const encodedMessage = encodeURIComponent(whatsAppMessage);

                window.open(
                  `https://wa.me/${adminNumber}?text=${encodedMessage}`,
                  "_blank"
                );
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