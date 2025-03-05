import React from "react";

const sampleProducts = [
  { id: 1, name: "Wheat", price: "₹50/kg", stock: "100kg" },
  { id: 2, name: "Rice", price: "₹40/kg", stock: "250kg" },
];

export default function ProductList() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Products</h2>
      <ul className="border p-4 rounded-lg shadow">
        {sampleProducts.map((product) => (
          <li key={product.id} className="flex justify-between p-2 border-b">
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
