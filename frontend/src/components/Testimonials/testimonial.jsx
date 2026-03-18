import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./testimonial.css";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The chicken pickle reminds me of my grandmother's recipe. Absolutely divine taste and premium quality!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    text: "Best mutton pickle I've ever tasted. The spice levels are perfect.",
    rating: 5,
  },
  {
    name: "Vishwak Anagani",
    location: "Vijayawada",
    text: "My entire family loved it.",
    rating: 4.5,
  },
  {
    name: "Arun Kumar",
    location: "Bangalore",
    text: "Best pickle I’ve tasted in years. Highly recommended!",
    rating: 4.9,
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    text: "Kamala Pickle has set a new standard. The packaging is elegant and the taste is authentic. Love it!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const prevSlide = () => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrent((p) => (p + 1) % testimonials.length);
  };

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="testimonials-container">

        <div className="testimonials-header">
          <span className="testimonial-tag">
            Love from Our Customers
          </span>

          <h2 className="testimonial-title">
            What People <span>Say</span>
          </h2>

          <div className="divider"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="testimonial-box"
        >

          <div className="stars">
            {"★★★★★".slice(0, Math.round(testimonials[current].rating))}
          </div>

          <p className="testimonial-text">
            "{testimonials[current].text}"
          </p>

          <p className="testimonial-name">
            {testimonials[current].name}
          </p>

          <p className="testimonial-location">
            {testimonials[current].location}
          </p>

        </motion.div>

        <div className="testimonial-controls">

          <button className="nav-btn" onClick={prevSlide}>
            ◀
          </button>

          <div className="dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          <button className="nav-btn" onClick={nextSlide}>
            ▶
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;