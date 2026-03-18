import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "./cta.css";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-overlay"></div>

      <motion.div
        className="cta-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="cta-tag">
          Ready to Experience Tradition?
        </span>

        <h2 className="cta-title">
          Taste <span>Tradition</span> Today
        </h2>

        <p className="cta-text">
          Order now and discover the authentic flavors of India, delivered
          fresh to your doorstep.
        </p>

        <div className="cta-buttons">
          <Link to="/products">
            <button className="cta-btn">
              Shop Collection
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;