// app/add-product/page.js
"use client"; // Client-side component
import React, { useState } from "react";
import client from "../../../../sanity/lib/client";
import type { SanityImageAssetDocument } from "@sanity/client";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stockLevel: 0,
    discountPercentage: 0,
    category: "",
    isFeaturedProduct: "", // For isFeaturedProduct dropdown
    tags: [] as string[], // For tags
    image: null as null | SanityImageAssetDocument, // For image file
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle tags selection
  // const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setFormData({
  //     ...formData,
  //     tags: selectedOptions,
  //   });
  // };

  // Handle image file upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        // Upload image to Sanity
        const result = await client.assets.upload("image", file);
        setFormData({
          ...formData,
          image: result, // Save the image asset reference
        });
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Create a new product in Sanity
      const newProduct = {
        _type: "product",
        name: formData.name,
        price: parseFloat(formData.price.toString()),
        stockLevel: parseInt(formData.stockLevel.toString()),
        isFeaturedProduct: formData.isFeaturedProduct === "true", // Convert to boolean
        discountPercentage: parseFloat(formData.discountPercentage.toString()),
        category: formData.category,
        tags: formData.tags, // Add tags to the product
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: formData.image ? formData.image._id : "", // Reference the uploaded image
          },
        },
      };

      await client.create(newProduct);
      alert("Product added successfully!");
      router.push("/stock"); // Redirect to stock page after adding
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product.");
    }
  };

  // Tags options
  const tagOptions = [
    { title: "Featured", value: "featured" },
    { title: "Latest", value: "latest" },
    { title: "Trending", value: "trending" },
    { title: "Top category", value: "topCategory" },
    { title: "Product", value: "product" },
    { title: "Trending section discount product", value: "discountTreProduct" },
    { title: "Shops", value: "shops" },
    { title: "Offer Product", value: "offerProduct" },
    { title: "Unique Features", value: "uniqueFeatures" },
  ];

  // isFeaturedProduct options
  const isFeaturedOptions = [
    { title: "Yes", value: "true" },
    { title: "No", value: "false" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
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
            required
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
            required
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
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Is Featured Product</label>
          <select
            name="isFeaturedProduct"
            value={formData.isFeaturedProduct}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {isFeaturedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <select
            name="tags"
            value={formData.tags}
            onChange={handleChange} // Use handleChange for single selection
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a tag
            </option>
            {tagOptions.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}