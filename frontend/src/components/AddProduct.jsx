import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product Added:", product);
    setProduct({ name: "", price: "", stock: "" }); // Reset Form
  };

  return (
    <div className="border p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="stock" placeholder="Stock (kg)" value={product.stock} onChange={handleChange} className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
