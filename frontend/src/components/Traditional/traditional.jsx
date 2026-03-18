import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./traditional.css";

import traditionalImg from "../../assets/traditional-making.jpg";

const Traditional = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="traditional-section" ref={ref}>
      <div className="traditional-container">

        <div className="traditional-grid">

          {/* Image */}
          <motion.div
            className="traditional-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="image-box">
              <img
                src={traditionalImg}
                alt="Traditional pickle making"
                className="traditional-image"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="traditional-text"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            <span className="heritage-tag">
              Heritage & Tradition
            </span>

            <h2 className="traditional-title">
              Made the Way <br />
              <span>Our Grandmothers Did</span>
            </h2>

            <div className="divider"></div>

            <p className="traditional-description">
              From our kitchen to homes across Telangana and throughout India,
              Kamala Pickles delivers more than taste — it delivers legacy.
            </p>

            <p className="traditional-description">
              Every batch is prepared with love by local artisans who have
              inherited recipes passed down through generations. We believe in
              preserving the authentic taste of India.
            </p>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Traditional;