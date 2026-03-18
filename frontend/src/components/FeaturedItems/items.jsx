import React, { useRef, useState, useContext } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import productLemon from "../../assets/product-lemon.jpg";
import productChicken from "../../assets/product-chicken.jpg";
import productMutton from "../../assets/product-mutton.jpg";
import productKakarakaya from "../../assets/product-kakarakaya.jpg";
import "./items.css";

/* Products */

const products = [
  {
    id: "1",
    name: "Chicken Pickle (Boneless)",
    image: productChicken,
    tag: "Popular",
    available: true,
    variants: [
      { weight: "250g", price: 380 },
      { weight: "500g", price: 710 },
      { weight: "1kg", price: 1400 },
    ],
  },
  {
    id: "2",
    name: "Mutton Pickle (Boneless)",
    image: productMutton,
    tag: "Tasty",
    available: true,
    variants: [
      { weight: "250g", price: 570 },
      { weight: "500g", price: 1130 },
      { weight: "1kg", price: 2160 },
    ],
  },
  {
    id: "3",
    name: "Karela Pickle",
    image: productKakarakaya,
    tag: "Spicy",
    available: true,
    variants: [
      { weight: "250g", price: 180 },
      { weight: "500g", price: 325 },
      { weight: "1kg", price: 580 },
    ],
  },
  {
    id: "4",
    name: "Lemon Pickle",
    image: productLemon,
    tag: "New",
    available: true,
    variants: [
      { weight: "250g", price: 149 },
      { weight: "500g", price: 249 },
      { weight: "1kg", price: 499 },
    ],
  },
];

const FeaturedItems = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedWeights, setSelectedWeights] = useState({});

  const context = useContext(CartContext);
  if (!context) return null;

  const { addToCart, decreaseQty, cartItems } = context;

  return (
    <section className="featured-section" ref={ref} id="featured-products">
      <div className="featured-container">

        {/* Header */}
        <div className="featured-header">
          <span className="featured-tag">Handpicked for You</span>

          <h2 className="featured-title">
            Featured <span>Collection</span>
          </h2>

          <div className="divider"></div>
        </div>

        {/* Product Grid */}

        <div className="product-grid">
          {products.map((product, i) => {

            const selectedIndex = selectedWeights[product.id] ?? 0;
            const selectedVariant = product.variants[selectedIndex];

            const currentItemId = product.id + "-" + selectedVariant.weight;

            const cartItem = cartItems.find(
              (item) => item.id === currentItemId
            );

            const currentQuantity = cartItem?.quantity ?? 0;

            return (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >

                <div className="">

                  {/* Image */}

                  <div className="product-image">
                    <img src={product.image} alt={product.name} />

                    <span className="product-tag">
                      {product.tag}
                    </span>
                  </div>

                  {/* Content */}

                  <div className="product-content">

                    <h3>{product.name}</h3>

                    {/* Weight Selector */}

                    <select
                      disabled={!product.available}
                      value={selectedIndex}
                      onChange={(e) =>
                        setSelectedWeights({
                          ...selectedWeights,
                          [product.id]: Number(e.target.value),
                        })
                      }
                    >
                      {product.variants.map((variant, index) => (
                        <option key={index} value={index}>
                          {variant.weight} - ₹{variant.price}
                        </option>
                      ))}
                    </select>

                    <p className="product-price">
                      ₹{selectedVariant.price}
                    </p>

                    {/* Cart Controls */}

                    {currentQuantity === 0 ? (
                      <button
                        className="add-cart-btn"
                        disabled={!product.available}
                        onClick={() =>
                          addToCart({
                            id: currentItemId,
                            name: product.name,
                            price: selectedVariant.price,
                            weight: selectedVariant.weight,
                            image: product.image,
                          })
                        }
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="qty-controls">

                        <button
                          onClick={() =>
                            decreaseQty(currentItemId, selectedVariant.weight)
                          }
                        >
                          −
                        </button>

                        <span>{currentQuantity}</span>

                        <button
                          onClick={() =>
                            addToCart({
                              id: currentItemId,
                              name: product.name,
                              price: selectedVariant.price,
                              weight: selectedVariant.weight,
                              image: product.image,
                            })
                          }
                        >
                          +
                        </button>

                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}

        <div className="view-all">
          <Link to="/products">
            <button className="view-btn">
              View All Products
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedItems;