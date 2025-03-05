import React from "react";
import Stats from "./components/Stats";
import AddProduct from "./components/AddProduct";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";

export default function Farmers() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Farmer's Dashboard</h1>
        <Stats />
        <AddProduct />
        <ProductList />
      </div>
    </div>
  );
}
