import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();

  const selectPlan = (plan) => {
    navigate(`/register?plan=${plan}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Standard Plan */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Standard Plan</h2>
          <p className="text-gray-600 mb-6">Perfect for solo stores and small teams.</p>
          <ul className="text-sm text-gray-500 mb-6 space-y-2">
            <li>✅ 1 Store</li>
            <li>✅ Up to 5 employees</li>
            <li>✅ POS & Inventory</li>
          </ul>
          <button
            onClick={() => selectPlan('standard')}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Choose Standard
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Premium Plan</h2>
          <p className="text-gray-600 mb-6">Best for growing businesses and franchises.</p>
          <ul className="text-sm text-gray-500 mb-6 space-y-2">
            <li>✅ Multiple Stores</li>
            <li>✅ Unlimited employees</li>
            <li>✅ Full features + advanced reports</li>
          </ul>
          <button
            onClick={() => selectPlan('premium')}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Choose Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
