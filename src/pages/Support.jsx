import React from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Support Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-4">
              <FAQItem 
                question="How do I reset my password?" 
                answer="You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email."
              />
              <FAQItem 
                question="Can I use Infinity POS on multiple devices?" 
                answer="Yes, Infinity POS is cloud-based and can be accessed from multiple devices. Simply log in with your account credentials on any device."
              />
              <FAQItem 
                question="How do I set up a new product in the system?" 
                answer="To add a new product, go to the 'Inventory' section, click on 'Add New Product', and fill in the required details such as name, price, and quantity."
              />
            </ul>
            <Link to="/faq" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">View all FAQs</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">Our support team is available 24/7 to assist you with any questions or issues.</p>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@infinitypos.com" className="text-indigo-600 hover:text-indigo-800">support@infinitypos.com</a></li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Live Chat: Available on our website during business hours</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-semibold mb-4">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResourceLink title="User Manual" description="Comprehensive guide to using Infinity POS" link="/manual" />
            <ResourceLink title="Video Tutorials" description="Step-by-step video guides for common tasks" link="/tutorials" />
            <ResourceLink title="API Documentation" description="For developers integrating with our system" link="/api-docs" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
          <Link to="/contact" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
            Submit a Support Ticket
          </Link>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => (
  <li>
    <h3 className="font-medium text-lg">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </li>
);

const ResourceLink = ({ title, description, link }) => (
  <Link to={link} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
    <h3 className="font-medium text-lg">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default Support;