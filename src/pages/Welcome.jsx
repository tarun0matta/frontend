import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/pica logo.png';

const Navbar = ({ scrollToFooter }) => (
  <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logoImage} alt="Infinity POS Logo" className="h-12 w-auto" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Infinity POS
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink onClick={() => scrollToFooter('features')}>Features</NavLink>
          <NavLink to="/plans">Pricing</NavLink> {/* Updated this line */}
          <NavLink onClick={() => scrollToFooter('about')}>About Us</NavLink>
          <NavLink to="/support">Support</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <NavButton to="/login" variant="outline">Log in</NavButton>
          <NavButton to="/plans" variant="solid">Register</NavButton>
        </div>
      </div>
    </div>
  </nav>
);

const NavLink = ({ to, children, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
      >
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
      {children}
    </Link>
  );
};

const NavButton = ({ to, children, variant }) => (
  <Link
    to={to}
    className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out ${
      variant === 'solid'
        ? 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
        : 'border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50'
    }`}
  >
    {children}
  </Link>
);

const Welcome = () => {
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'features' && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar scrollToFooter={scrollToSection} />
      
      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-85 pb-20"> {/* Updated padding here */}
  <div className="max-w-4xl w-full text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
      Transform Your Business with <span className="text-indigo-600">Infinity POS</span>
    </h1>
    <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed">
      Streamline operations, boost sales, and gain powerful insights with our cutting-edge point of sale system.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
      <Button to="/login" primary>Log in</Button>
      <Button to="/plans">Get Started</Button>
    </div>
  </div>
</main>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Powerful Features to Revolutionize Your Business
          </h2>
          <div className="space-y-16">
            <FeatureDetail
              icon="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              title="Point of Sale (POS)"
              description="Empower your cashiers with a lightning-fast, intuitive billing system. Process transactions quickly, manage customer orders, and provide a seamless checkout experience. Our POS system is designed for speed and efficiency, reducing wait times and improving customer satisfaction."
              forRole="Cashier"
            />
            <FeatureDetail
              icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              title="Inventory Management"
              description="Take control of your stock with our comprehensive inventory management system. Track stock levels in real-time, set up automatic reorder points, and manage suppliers effortlessly. Gain insights into your best-selling items and optimize your inventory for maximum profitability."
              forRole="Manager/Owner"
            />
            <FeatureDetail
              icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              title="AI-Powered Analytics and Reports"
              description="Harness the power of artificial intelligence to gain deep insights into your business performance. Our advanced analytics and reporting tools provide you with actionable intelligence, helping you make data-driven decisions. Visualize trends, forecast demand, and identify opportunities for growth."
              forRole="Owner"
            />
            <FeatureDetail
              icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              title="Multi-Store Management"
              description="Seamlessly manage multiple locations from a single, centralized dashboard. Compare performance across stores, manage inventory for each location, and implement company-wide policies with ease. Perfect for businesses looking to scale and expand their operations."
              forRole="Owner"
            />
            <FeatureDetail
              icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              title="Role-Based Access Control"
              description="Ensure data security and operational efficiency with our role-based access control system. Assign specific permissions to different roles within your organization, allowing employees to access only the features and information relevant to their responsibilities. From cashiers to managers to owners, each role has a tailored experience."
              forRole="All Roles"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Footer ref={aboutRef} />
    </div>
  );
};

const Button = ({ to, children, primary }) => (
  <Link to={to}>
    <button
      className={`px-8 py-4 rounded-full font-semibold text-lg transition duration-300 ${
        primary ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
      }`}
    >
      {children}
    </button>
  </Link>
);

const FeatureDetail = ({ icon, title, description, forRole }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
    <div className="flex-shrink-0">
      <div className="bg-indigo-100 rounded-lg p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm font-semibold text-indigo-600">For: {forRole}</p>
    </div>
  </div>
);

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">About Infinity POS</h3>
            <p className="text-gray-300 mb-4">
              Infinity POS is a versatile, cloud-based point of sale system designed to empower businesses of all sizes. Our mission is to provide a comprehensive, user-friendly solution that streamlines operations, boosts sales, and offers valuable insights.
            </p>
            <p className="text-gray-300 mb-4">
              Whether you're running a bustling café, a trendy boutique, a multi-location restaurant chain, or a high-volume retail store, Infinity POS adapts to your unique needs. Our system is perfect for:
            </p>
            <ul className="text-gray-300 list-disc list-inside mb-4">
              <li>Restaurants and cafes</li>
              <li>Retail stores</li>
              <li>Bars and nightclubs</li>
              <li>Salons and spas</li>
              <li>Grocery and convenience stores</li>
              <li>Food trucks and pop-up shops</li>
            </ul>
            <p className="text-gray-300">
              Founded in 2023, we've rapidly grown to become a trusted partner for thousands of businesses across diverse industries. Our commitment to innovation and customer success drives us to continually enhance our platform, ensuring you stay ahead in today's competitive market.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-300 hover:text-white transition">Features</Link></li>
              <li><Link to="/plans" className="text-gray-300 hover:text-white transition">Pricing</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition">Support</Link></li>
            </ul>
          </div>
          <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/InfinityPOS" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center"><i className="fab fa-facebook-f mr-2"></i> Facebook</a></li>
              <li><a href="https://www.twitter.com/InfinityPOS" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center"><i className="fab fa-twitter mr-2"></i> Twitter</a></li>
              <li><a href="https://www.instagram.com/InfinityPOS" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center"><i className="fab fa-instagram mr-2"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2023 Infinity POS. All rights reserved. | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms" className="hover:text-white">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
});

export default Welcome;