import {useState, useEffect, useContext} from "react"
import {Link, useLocation} from "react-router-dom"
import {FiMenu, FiX, FiShoppingCart} from "react-icons/fi"
import {CartContext} from "../../context/CartContext"
import kamalaLogo from "../../assets/kamala.jpg"
import "./navbar.css"

const navLinks = [
  {label: "Home", path: "/"},
  {label: "Products", path: "/products"},
]

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isFeaturedProductsVisible, setIsFeaturedProductsVisible] = useState(false)

  const location = useLocation()

  const {cartItems} = useContext(CartContext)

  const cartCount = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0

  const showMobileCart =
    isFeaturedProductsVisible || location.pathname === "/products"

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsScrolled(scrollTop > 10)
    }
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true} )

    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeaturedProductsVisible(entry.isIntersecting)
      },
      {threshold: 0.1}
    )

    const featured = document.getElementById("featured-products")

    if (featured) observer.observe(featured)

    return () => {
      if (featured) observer.unobserve(featured)
    }

  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  return (

    <div className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">

        <Link to="/" className="logo-container">

          <img src={kamalaLogo} alt="Kamala Pickle Logo" className={`logo-image ${isScrolled ? "small" : ""}`} />

          <span className={`logo-text ${isScrolled ? "small" : ""}`}>
            KAMALA <span>PICKLE</span>
          </span>

        </Link>


        {/* Desktop Menu */}

        <div className="nav-links">

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/cart" className="cart-link">
            <button className="cart-btn">
              <FiShoppingCart/>
              Cart ({cartCount})
            </button>
          </Link>

        </div>


        {/* Mobile Menu */}

        <div className="mobile-icons">

          {showMobileCart &&
            <Link to="/cart">
              <button className="cart-btn mobile-cart">
                <FiShoppingCart/>
                <span>{cartCount}</span>
              </button>
            </Link>
          }

          <button
            className="menu-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
          </button>

        </div>

      </div>


      {isMobileOpen && (

        <div className="mobile-menu">

          {navLinks.map(link => (

            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.label}
            </Link>

          ))}

        </div>

      )}

    </div>
  )
}

export default Navbar