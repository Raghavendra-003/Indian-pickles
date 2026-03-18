import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { CartContext } from "../../context/CartContext";
import "./Product.css";

/* Product Images */
import productChicken from "../../assets/product-chicken.jpg";
import productMutton from "../../assets/product-mutton.jpg";
import productKakarakaya from "../../assets/product-kakarakaya.jpg";
import productMango from "../../assets/product-mango.jpg";
import productGongura from "../../assets/product-gongura.jpg";
import productLemon from "../../assets/product-lemon.jpg";
import productGreenApple from "../../assets/product-greenapple.jpg";
import productAmla from "../../assets/product-amla.jpg";

const allProducts = [
  {
    id: "1",
    name: "Chicken Pickle (Boneless)",
    image: productChicken,
    category: "non-veg",
    available: true,
    desc: "Tender chicken pieces infused with bold spices.",
    variants: [
      { weight: "250g", price: 380 },
      { weight: "500g", price: 710 },
      { weight: "1kg", price: 1400 }
    ]
  },
  {
    id: "2",
    name: "Karela Pickle",
    image: productKakarakaya,
    category: "veg",
    available: true,
    desc: "Succulent kakarakaya pieces blended with rich traditional spices.",
    variants: [
      { weight: "250g", price: 180 },
      { weight: "500g", price: 325 },
      { weight: "1kg", price: 580 }
    ]
  },
  {
    id: "3",
    name: "Mutton Pickle (Boneless)",
    image: productMutton,
    category: "non-veg",
    available: true,
    desc: "Succulent mutton pieces infused with rich spices.",
    variants: [
      { weight: "250g", price: 570 },
      { weight: "500g", price: 1130 },
      { weight: "1kg", price: 2160 }
    ]
  },
  {
    id: "4",
    name: "Mango Pickle",
    image: productMango,
    category: "veg",
    available: true,
    desc: "Authentic Telangana-style mango pickle.",
    variants: [
      { weight: "250g", price: 149 },
      { weight: "500g", price: 299 },
      { weight: "1kg", price: 549 }
    ]
  },
  {
    id: "5",
    name: "Gongura Pickle",
    image: productGongura,
    category: "veg",
    available: true,
    desc: "Tangy delight prepared with fresh gongura leaves.",
    variants: [
      { weight: "250g", price: 169 },
      { weight: "500g", price: 349 },
      { weight: "1kg", price: 649 }
    ]
  },
  {
    id: "6",
    name: "Lemon Pickle",
    image: productLemon,
    category: "veg",
    available: true,
    desc: "Zesty lemon pickle bursting with citrusy goodness.",
    variants: [
      { weight: "250g", price: 139 },
      { weight: "500g", price: 279 },
      { weight: "1kg", price: 499 }
    ]
  },
  {
    id: "7",
    name: "Green Apple Pickle",
    image: productGreenApple,
    category: "veg",
    available: true,
    desc: "Tangy green apple crafted with traditional spices.",
    variants: [
      { weight: "250g", price: 279 },
      { weight: "500g", price: 499 },
      { weight: "1kg", price: 929 }
    ]
  },
  {
    id: "8",
    name: "Amla Pickle",
    image: productAmla,
    category: "veg",
    available: true,
    desc: "Fresh amla pickle with bold Indian flavors.",
    variants: [
      { weight: "250g", price: 279 },
      { weight: "500g", price: 499 },
      { weight: "1kg", price: 929 }
    ]
  }
];

const Products = () => {

  const [filter, setFilter] = useState("all");
  const [selectedWeights, setSelectedWeights] = useState({});

  const { addToCart, decreaseQty, cartItems } = useContext(CartContext);

  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  return (
    <div className="products-page">

      <Navbar />

      {/* Header */}
      <div className="products-header">
        <h1 className="products-title">Our Collection</h1>
        <div className="products-divider"></div>
      </div>

      {/* Filters */}
      <div className="products-filters">

        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`filter-btn ${filter === "veg" ? "active" : ""}`}
          onClick={() => setFilter("veg")}
        >
          Veg
        </button>

        <button
          className={`filter-btn ${filter === "non-veg" ? "active" : ""}`}
          onClick={() => setFilter("non-veg")}
        >
          Non-Veg
        </button>

      </div>

      {/* Product Grid */}
      <div className="products-container">
        <div className="products-grid">

          {filteredProducts.map((product) => {

            const selectedIndex = selectedWeights[product.id] || 0;
            const variant = product.variants[selectedIndex];

            const currentItemId = product.id + "-" + variant.weight;

            const cartItem = cartItems.find(
              (item) => item.id === currentItemId
            );

            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div className="product-card" key={product.id}>

                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  <span
                    className={`product-tag ${
                      product.category === "veg" ? "veg" : "nonveg"
                    }`}
                  >
                    {product.category === "veg" ? "Veg" : "Non-Veg"}
                  </span>

                </div>

                <div className="product-content">

                  <h3 className="product-name">{product.name}</h3>

                  <p className="product-desc">{product.desc}</p>

                  <select
                    className="product-select"
                    value={selectedIndex}
                    onChange={(e) =>
                      setSelectedWeights({
                        ...selectedWeights,
                        [product.id]: Number(e.target.value)
                      })
                    }
                  >
                    {product.variants.map((v, index) => (
                      <option key={index} value={index}>
                        {v.weight} - ₹{v.price}
                      </option>
                    ))}
                  </select>

                  <div className="product-footer">

                    <span className="product-price">
                      ₹{variant.price}
                    </span>

                    {quantity === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() =>
                          addToCart({
                            id: currentItemId,
                            name: product.name,
                            price: variant.price,
                            weight: variant.weight,
                            image: product.image
                          })
                        }
                      >
                        Add
                      </button>
                    ) : (
                      <div className="qty-control">

                        <button
                          onClick={() =>
                            decreaseQty(currentItemId, variant.weight)
                          }
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          onClick={() =>
                            addToCart({
                              id: currentItemId,
                              name: product.name,
                              price: variant.price,
                              weight: variant.weight,
                              image: product.image
                            })
                          }
                        >
                          +
                        </button>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>

      <Footer />

    </div>
  );
};

export default Products;