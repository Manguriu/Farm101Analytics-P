import React from "react";

const FlockManage: React.FC = () => {
  const handleManageFlock = () => {
    alert("Manage Flock button clicked");
    // Add your manage flock logic here
  };

  const handleDeleteFlock = () => {
    if (window.confirm("Are you sure you want to delete this flock?")) {
      alert("Flock deleted");
      // Add your delete flock logic here
    }
  };

  return (
    <div className="flex flex-row gap-6 justify-center items-center p-4 mt-6">
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <h2 className="text-lg font-bold mb-2">
          Batch Name: Autem praesentium co
        </h2>
        <p className="mb-1">Age: 15560 days</p>
        <p className="mb-1">Current Count: 16</p>
        <p className="mb-4">Breed: Tempora sint eu volu</p>
        <div className="flex justify-between">
          <button
            onClick={handleManageFlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Manage Flock
          </button>
          <button
            onClick={handleDeleteFlock}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Flock
          </button>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <h2 className="text-lg font-bold mb-2">
          Batch Name: Autem praesentium co
        </h2>
        <p className="mb-1">Age: 15560 days</p>
        <p className="mb-1">Current Count: 16</p>
        <p className="mb-4">Breed: Tempora sint eu volu</p>
        <div className="flex justify-between">
          <button
            onClick={handleManageFlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Manage Flock
          </button>
          <button
            onClick={handleDeleteFlock}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Flock
          </button>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <h2 className="text-lg font-bold mb-2">
          Batch Name: Autem praesentium co
        </h2>
        <p className="mb-1">Age: 15560 days</p>
        <p className="mb-1">Current Count: 16</p>
        <p className="mb-4">Breed: Tempora sint eu volu</p>
        <div className="flex justify-between">
          <button
            onClick={handleManageFlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Manage Flock
          </button>
          <button
            onClick={handleDeleteFlock}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Flock
          </button>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <h2 className="text-lg font-bold mb-2">
          Batch Name: Autem praesentium co
        </h2>
        <p className="mb-1">Age: 15560 days</p>
        <p className="mb-1">Current Count: 16</p>
        <p className="mb-4">Breed: Tempora sint eu volu</p>
        <div className="flex justify-between">
          <button
            onClick={handleManageFlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Manage Flock
          </button>
          <button
            onClick={handleDeleteFlock}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Flock
          </button>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
        <h2 className="text-lg font-bold mb-2">
          Batch Name: Autem praesentium co
        </h2>
        <p className="mb-1">Age: 15560 days</p>
        <p className="mb-1">Current Count: 16</p>
        <p className="mb-4">Breed: Tempora sint eu volu</p>
        <div className="flex justify-between">
          <button
            onClick={handleManageFlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Manage Flock
          </button>
          <button
            onClick={handleDeleteFlock}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Flock
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlockManage;
