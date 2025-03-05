import React from "react";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-green-200 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <p className="text-xl font-bold">₹1,25,000</p>
      </div>
      <div className="p-4 bg-blue-200 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Orders</h3>
        <p className="text-xl font-bold">32</p>
      </div>
      <div className="p-4 bg-yellow-200 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Revenue</h3>
        <p className="text-xl font-bold">₹75,000</p>
      </div>
    </div>
  );
}
