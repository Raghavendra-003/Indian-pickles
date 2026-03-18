import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./choose.css";

const features = [
  {
    icon: "🌿",
    title: "100% Natural Ingredients",
    desc: "Only the freshest, purest ingredients make it into our jars.",
  },
  {
    icon: "🛡️",
    title: "No Preservatives",
    desc: "Naturally fermented and preserved using traditional techniques.",
  },
  {
    icon: "🤲",
    title: "Handmade in Small Batches",
    desc: "Every jar is crafted with personal care and attention.",
  },
  {
    icon: "🚚",
    title: "Pan-India Delivery",
    desc: "From our kitchen to your doorstep, anywhere in India.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="why-section" ref={ref}>
      <div className="why-container">

        <div className="why-header">
          <span className="why-tag">Our Promise</span>

          <h2 className="why-title">
            Why Choose <span>Kamala Pickle</span>
          </h2>

          <div className="divider"></div>
        </div>

        <div className="why-grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="why-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="icon-box">
                {feature.icon}
              </div>

              <h3 className="feature-title">
                {feature.title}
              </h3>

              <p className="feature-desc">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;