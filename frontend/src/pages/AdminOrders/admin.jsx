import { useEffect, useState } from "react";
import "./admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data && data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Expected orders array but got:", data);
          setOrders([]);
        }
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
        setOrders([]);
      });
  }, []);

  // Group orders by date
  const groupedOrders = orders.reduce((groups, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(order);
    return groups;
  }, {});

  return (
    <div className="admin-orders">
      <h2 className="title">All Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {Object.entries(groupedOrders).map(([date, dailyOrders]) => (
        <div key={date} className="date-group">
          <h2 className="date-heading">
            📅 {date} ({dailyOrders.length} Orders)
          </h2>

          {dailyOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order.orderId}</h3>

              <p>
                <strong>Time:</strong>{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>

              <p>
                <strong>Total Products:</strong>{" "}
                {order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </p>

              <h4>Items:</h4>
              <ul className="items-list">
                {order.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}</strong> - {item.quantity} x ₹
                    {item.price} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="total">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;