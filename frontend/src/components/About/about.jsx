import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./about.css";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="about-section" ref={ref}>
      <div className="about-container">

        <div className="about-content">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >

            <span className="about-tag">Our Story</span>

            <h2 className="about-title">
              Crafted with Tradition.
              <span className="highlight"> Defined by Excellence.</span>
            </h2>

            <div className="divider"></div>

            <p className="about-text">
              Kamala Pickles is a celebration of Telangana’s bold culinary
              heritage. Rooted in time-honored family recipes, our signature
              Chicken and Mutton Pickles are meticulously prepared using
              premium cuts of meat, freshly ground spices, and traditional
              slow-cooking techniques.
            </p>

            <p className="about-text">
              From our kitchen to homes across Telangana and throughout India,
              Kamala Pickles delivers more than taste — it delivers legacy.
            </p>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;