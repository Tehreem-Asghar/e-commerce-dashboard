
"use client"; // Client-side component
import React, { useEffect, useState } from "react";
import client from "@/sanity/lib/client";

import { useRouter } from "next/navigation";

interface Params {
  id: string;
}

export default function EditProduct({ params }: { params: Params }) {
  const { id } = params; // Product ID from dynamic route
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stockLevel: 0,
    discountPercentage: 0,
    category: "",
    description : ""
  });

  // Fetch product data based on ID
  useEffect(() => {
    async function fetchProduct() {
      const res = await client.fetch(
        `*[_type == "product" && _id == $id][0] {
          name,
          price,
          stockLevel,
          discountPercentage,
          category,
          description
        }`,
        { id }
      );
      setFormData({
        name: res.name,
        price: res.price,
        stockLevel: res.stockLevel,
        discountPercentage: res.discountPercentage,
        category: res.category,
        description : res.description
      });
    }
    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await client
        .patch(id)
        .set(formData)
        .commit();
      alert("Product updated successfully!");
      router.push("/dashboard/stock"); // Redirect to stock page after update
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Level</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}