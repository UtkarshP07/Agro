import React from "react";

export default function Sidebar() {
  return (
    <div className="w-1/4 bg-green-800 text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2"><a href="#">Home</a></li>
        <li className="mb-2"><a href="#">My Products</a></li>
        <li className="mb-2"><a href="#">Stats</a></li>
        <li className="mb-2"><a href="#">Orders</a></li>
      </ul>
    </div>
  );
}
