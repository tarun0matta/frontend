import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaStore, FaUsers, FaChartBar, FaCheckCircle, FaHeadset } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-20">
        <animated.div style={fadeIn} className="max-w-7xl w-full space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Choose Your Perfect Plan
            </h2>
            <p className="mt-5 text-xl text-gray-500 max-w-2xl mx-auto">
              Select the plan that best fits your business needs and start optimizing your operations today with Infinity POS.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <PlanCard
              title="Standard"
              description="Perfect for small businesses and startups"
              price="$29"
              features={[
                { icon: <FaStore />, text: "Single store management" },
                { icon: <FaUsers />, text: "Up to 5 employee accounts" },
                { icon: <FaChartBar />, text: "Basic sales and inventory reporting" },
                { icon: <FaCheckCircle />, text: "Core POS & Inventory features" },
                { icon: <FaHeadset />, text: "Email support" },
              ]}
              buttonText="Get Started"
              onClick={() => selectPlan('standard')}
              color="indigo"
            />
            <PlanCard
              title="Premium"
              description="Ideal for growing businesses and franchises"
              price="$79"
              features={[
                { icon: <FaStore />, text: "Multi-store management" },
                { icon: <FaUsers />, text: "Unlimited employee accounts" },
                { icon: <FaChartBar />, text: "Advanced analytics and forecasting" },
                { icon: <FaCheckCircle />, text: "Full feature set including CRM" },
                { icon: <FaHeadset />, text: "24/7 priority support" },
              ]}
              buttonText="Upgrade to Premium"
              onClick={() => selectPlan('premium')}
              color="purple"
              highlighted={true}
            />
          </div>
         
        </animated.div>
      </div>
    </div>
  );
};

const PlanCard = ({ title, description, price, features, buttonText, onClick, color, highlighted }) => (
  <div 
    className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
      highlighted ? 'ring-4 ring-' + color + '-400 ring-opacity-50' : ''
    }`}
  >
    <div className={`px-6 py-12 bg-gradient-to-br from-${color}-500 to-${color}-600 sm:p-16 sm:pb-12`}>
      <h3 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
        {title}
      </h3>
      <p className="mt-4 text-xl leading-7 text-${color}-100">{description}</p>
      <p className="mt-4 text-5xl leading-none font-extrabold text-white">
        {price}<span className="ml-2 text-2xl font-medium text-${color}-100">/month</span>
      </p>
    </div>
    <div className="px-6 pt-10 pb-12 bg-white sm:px-16 sm:pt-12 sm:pb-16">
      <ul className="space-y-5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 w-6 h-6 text-${color}-500`}>
              {feature.icon}
            </div>
            <p className="ml-3 text-base leading-6 text-gray-700">{feature.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <button
          onClick={onClick}
          className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-lg leading-6 font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition duration-150 ease-in-out`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
);

export default Plans;