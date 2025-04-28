import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import logoImage from '../assets/pica logo.png';

const Navbar = () => (
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

const Plans = () => {
  const navigate = useNavigate();

  const selectPlan = (plan) => {
    navigate(`/register?plan=${plan}`);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-20">
        <animated.div style={fadeIn} className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Select the plan that best fits your business needs
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <PlanCard
              title="Standard"
              price="$29"
              features={[
                "Single store management",
                "Up to 5 employee accounts",
                "Basic sales and inventory reporting",
                "Core POS & Inventory features",
                "Email support",
              ]}
              buttonText="Get Started"
              onClick={() => selectPlan('standard')}
            />
            <PlanCard
              title="Premium"
              price="$79"
              features={[
                "Multi-store management",
                "Unlimited employee accounts",
                "Advanced analytics and forecasting",
                "Full feature set including CRM",
                "24/7 priority support",
              ]}
              buttonText="Get Started"
              onClick={() => selectPlan('premium')}
              highlighted={true}
            />
          </div>
        </animated.div>
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, features, buttonText, onClick, highlighted }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-8">
      <h3 className="text-2xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-4 text-4xl font-bold text-indigo-600">
        {price}<span className="text-lg font-normal text-gray-500">/month</span>
      </p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FaCheck className="flex-shrink-0 w-5 h-5 text-green-500" />
            <span className="ml-3 text-base text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <button
          onClick={onClick}
          className={`w-full px-4 py-2 text-sm font-medium rounded-md text-white ${
            highlighted 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
);

export default Plans;