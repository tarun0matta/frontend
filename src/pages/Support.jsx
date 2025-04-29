import React from 'react';
import { Link } from 'react-router-dom';
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

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-3xl w-full space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Support Center</h1>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-4">
              <FAQItem 
                question="How do I reset my password?" 
                answer="Click on the 'Forgot Password' link on the login page and follow the instructions sent to your email."
              />
              <FAQItem 
                question="Can I use Infinity POS on multiple devices?" 
                answer="Yes, Infinity POS is cloud-based and can be accessed from any device with your account credentials."
              />
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">Email: support@infinitypos.com</p>
            <p>Phone: +1 (800) 123-4567</p>
          </div>
          
          <div className="text-center">
            <Link to="/contact" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Submit a Support Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => (
  <li>
    <h3 className="font-medium">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </li>
);

export default Support;