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
          <NavLink to="/plans">Pricing</NavLink>
          <NavLink onClick={() => scrollToFooter('about')}>About Us</NavLink>
          <NavLink onClick={() => scrollToFooter('contact')}>Contact</NavLink>
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
  const footerRef = useRef(null);

  const scrollToFooter = (section) => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
      // You can add logic here to scroll to specific sections within the footer if needed
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar scrollToFooter={scrollToFooter} />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-20">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-600">
            <FeatureCard
              icon="M13 10V3L4 14h7v7l9-11h-7z"
              title="Lightning-Fast Transactions"
              description="Process sales quickly and efficiently, reducing wait times and improving customer satisfaction."
            />
            <FeatureCard
              icon="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              title="Real-time Analytics"
              description="Gain valuable insights into your business performance with our powerful reporting tools."
            />
            <FeatureCard
              icon="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              title="Multi-store Management"
              description="Easily manage multiple locations from a single, intuitive dashboard."
            />
          </div>
        </div>
      </main>
      <Footer ref={footerRef} />
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

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
    </svg>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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