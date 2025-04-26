import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiCreditCard } from 'react-icons/fi';

const YourAccount = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Account</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FiUser className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiMail className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiCreditCard className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="font-medium">{user.plan}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Plan Details</h3>
        <p className="text-gray-600">
          Your current plan includes:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    </div>
  );
};

export default YourAccount;