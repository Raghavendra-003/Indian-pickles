import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar/navbar";
import Carousels from "../../components/Carousels/carousel"
import Footer from "../../components/Footer/footer";
import About from "../../components/About/about";
import Traditional from "../../components/Traditional/traditional";
import Testimonial from "../../components/Testimonials/testimonial";
import WhyChooseUs from "../../components/WhyChooseUs/choose";
import CTASection from "../../components/CTASection/cta";
import FeaturedItems from "../../components/FeaturedItems/items";

import "./home.css";

const   Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Carousels />
      <About />
      <Traditional/>
      <WhyChooseUs/>
      <FeaturedItems/>
      <Testimonial/>
      <CTASection/>
      <Footer/>
    </div>
  );
};

export default Home;