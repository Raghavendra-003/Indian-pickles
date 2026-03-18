import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* =====================================================
   GET ALL ORDERS (Admin)
   URL: /api/orders/all
===================================================== */
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
});

/* =====================================================
   GET SINGLE ORDER BY ORDER ID
   URL: /api/orders/:orderId
===================================================== */
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Fetch Single Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
    });
  }
});

/* =====================================================
   CREATE ORDER
   URL: /api/orders/create-order
===================================================== */
router.post("/create-order", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid total amount is required",
      });
    }

    // Find last order
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    let newOrderNumber = 1001;

    if (lastOrder && lastOrder.orderId) {
      const lastNumber = parseInt(
        lastOrder.orderId.replace("KP", "")
      );

      if (!isNaN(lastNumber) && lastNumber < 999999) {
        newOrderNumber = lastNumber + 1;
      }
    }

    const orderId = `KP${newOrderNumber}`;

    const newOrder = new Order({
      orderId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;