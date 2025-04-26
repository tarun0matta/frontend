import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import logoImage from '../assets/pica logo.png';

const Navbar = () => {
  return (
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
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavButton to="/login" variant="outline">Log in</NavButton>
            <NavButton to="/register" variant="solid">Sign up</NavButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
    {children}
  </Link>
);

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    config: config.molasses,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <animated.div style={fadeIn} className="max-w-4xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Transform Your Business with <span className="text-indigo-600">Infinity POS</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed">
            Streamline operations, boost sales, and gain powerful insights with our cutting-edge point of sale system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <AnimatedButton to="/demo" primary>Log in</AnimatedButton>
            <AnimatedButton to="/register" primary>Get Started</AnimatedButton>
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
        </animated.div>
      </main>
    </div>
  );
};

const AnimatedButton = ({ to, children, primary }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonAnimation = useSpring({
    scale: isHovered ? 1.05 : 1,
    shadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    config: config.wobbly,
  });

  return (
    <Link to={to}>
      <animated.button
        style={buttonAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`px-8 py-4 rounded-full font-semibold text-lg transition duration-300 ${
          primary 
            ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
            : 'text-indigo-600 bg-white hover:bg-indigo-50 border-2 border-indigo-600'
        }`}
      >
        {children}
      </animated.button>
    </Link>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardAnimation = useSpring({
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    config: config.wobbly,
  });

  return (
    <animated.div
      style={cardAnimation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white p-6 rounded-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </animated.div>
  );
};

export default Welcome;