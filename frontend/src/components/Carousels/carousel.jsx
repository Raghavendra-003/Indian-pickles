import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./carousel.css";

import heroMango from "../../assets/hero-mango-pickle.jpg";
import heroGongura from "../../assets/hero-gongura-pickle.jpg";
import heroAmla from "../../assets/hero-amla-pickle.jpg";

const slides = [
  {
    image: heroMango,
    name: "Mango Pickle",
    tagline:
      "Authentic Telangana-style mango pickle crafted with handpicked spices and sun-dried perfection.",
  },
  {
    image: heroGongura,
    name: "Gongura Pickle",
    tagline:
      "A tangy, spicy delight made from fresh sorrel leaves and traditional stone-ground masalas.",
  },
  {
    image: heroAmla,
    name: "Amla Pickle",
    tagline:
      "Bold, aromatic amla cloves infused with premium cold-pressed oil and spices.",
  },
];

const Carousels = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="hero-slide"
        >
          <img
            src={slides[current].image}
            alt={slides[current].name}
            className="hero-image"
          />

          <div className="overlay-left"></div>
          <div className="overlay-bottom"></div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <h1>{slides[current].name}</h1>

            <p className="tagline">{slides[current].tagline}</p>

            <div className="hero-buttons">
              <Link to="/products">
                <button className="btn-primary">Shop Now</button>
              </Link>

              <Link to="/products">
                <button className="btn-outline">Explore All</button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="nav-arrows">
        <button onClick={prev} className="arrow-btn">❮</button>
        <button onClick={next} className="arrow-btn">❯</button>
      </div>

      <div className="indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`indicator ${i === current ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousels;