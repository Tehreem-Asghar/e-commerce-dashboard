// app/stock/page.js
"use client"; // Client-side component
import React, { useEffect, useState } from "react";
import client from "../../../../sanity/lib/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Stock() {
  interface Product {
    _id: string;
    name: string;
    price: number;
    stockLevel: number;
    discountPercentage: number;
    image: string;
    category: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await client.fetch(
        `*[_type == "product"] {
          _id,
          name,
          price,
          stockLevel,
          discountPercentage,
          "image": image.asset->url,
          category
        }`
      );
      setProducts(res);
    }

    getData();
  }, []);

  // Function to delete a product
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await client.delete(id); // Delete the product from Sanity
        setProducts(products.filter((product) => product._id !== id)); // Remove the product from the UI
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-8">Product Stock</h2>

      {/* Low Stock Products Table */}
      <div className="mb-12">
        <p className="text-lg font-semibold text-red-600 mb-4">Low Stock (≤ 10)</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Discount</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.stockLevel <= 10)
                .map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        height={48}
                        width={48}
                      />
                    </td>
                    <td className="py-3 px-4   whitespace-nowrap">{product.name}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm ${
                          product.stockLevel <= 10 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {product.stockLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.discountPercentage > 0 ? (
                        <span className="text-red-500 font-bold">
                          {product.discountPercentage}%
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-3 px-4 flex items-center space-x-4">
                      <Link href={`/dashboard/products/${product._id}`}>
                        <button className="text-pink-700 hover:text-blue-500">
                          <FaEdit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-700 hover:text-red-900"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* High Stock Products Table */}
      <div>
        <p className="text-lg font-semibold text-green-600 mb-4">{`In Stock (>10)`}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Discount</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.stockLevel > 10)
                .map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <Image
                        height={48}
                         width={48}
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4  whitespace-nowrap">{product.name}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm ${
                          product.stockLevel <= 10 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {product.stockLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.discountPercentage > 0 ? (
                        <span className="text-red-500 font-bold">
                          {product.discountPercentage}%
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-3 px-4 flex items-center space-x-4">
                      <Link href={`/dashboard/products/${product._id}`}>
                        <button className="text-pink-700 hover:text-blue-500">
                          <FaEdit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-700 hover:text-red-900"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



































// "use client";
// import React, { useEffect, useState } from "react";
// import client from "../../sanity/lib/client";
// import Image from "next/image";
// import { FaEdit } from "react-icons/fa";

// function Stock() {
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     async function getData() {
//       const res = await client.fetch(
//         `*[_type == "product"] {
//           name,
//           price,
//           stockLevel,
//           discountPercentage,
//           "image": image.asset->url,
//           category
//         }`
//       );
//       setProducts(res);
//     }

//     getData();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto p-5">
//       <h2 className="text-3xl font-bold text-center mb-6">Product Stock</h2>
//       <p className="text-blue-500 font-bold  ">Stock quantity: less then 10</p>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
//         {products.map((product, index) => (
          
//           <>
//         {product.stockLevel <= 10 && <>
          
//              <div key={index} className="bg-white  p-4 rounded-lg shadow-lg">
//              <div className="w-full h-[200px] relative ">
//             <Image
//               src={product.image}
//               height={100}
//               width={100}
//               alt={product.name}
//               className="w-full h-[200px]  rounded-md"
//             />
//               <span  className="bg-slate-300 h-[30px] flex justify-center items-center w-[30px] rounded-full   absolute top-1 right-2">  <FaEdit className=" text-pink-700 hover:text-blue-500"/>   </span>  

//             </div>
//             <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
//             <div className="flex justify-between"> 
//             <p className="text-gray-600">Category: {product.category}</p>
//             <p className="text-gray-800 font-bold">Price: ${product.price}</p>
//             </div>
//             <div className="flex justify-between"> 

//             <p className="text-sm text-green-600">
//               Stock Level: {product.stockLevel}
//             </p>
//             {product.discountPercentage > 0 && (
//               <p className="text-red-500 font-bold">
//                 Discount: {product.discountPercentage}%
//               </p>
//             )}
//             </div>
//           </div>

//           </>}
//           </>
          
                           
        
//         ))}
        
//       </div>
//       <p className="text-blue-500 font-bold  my-8 ">Stock quantity: above 10</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
//       {products.map((product, index) => (
        
//         <>
//       {product.stockLevel > 10 && <>
        
//            <div key={index} className="bg-white  p-4 rounded-lg shadow-lg">
//            <div className="w-full h-[200px] relative ">
//           <Image
//             src={product.image}
//             height={100}
//             width={100}
//             alt={product.name}
//             className="w-full h-[200px]  rounded-md"
//           />
//             <span  className="bg-slate-300 h-[30px] flex justify-center items-center w-[30px] rounded-full   absolute top-1 right-2">  <FaEdit className=" text-pink-700 hover:text-blue-500"/>   </span>  

//           </div>
//           <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
//           <div className="flex justify-between"> 
//           <p className="text-gray-600">Category: {product.category}</p>
//           <p className="text-gray-800 font-bold">Price: ${product.price}</p>
//           </div>
//           <div className="flex justify-between"> 

//           <p className="text-sm text-green-600">
//             Stock Level: {product.stockLevel}
//           </p>
//           {product.discountPercentage > 0 && (
//             <p className="text-red-500 font-bold">
//               Discount: {product.discountPercentage}%
//             </p>
//           )}
//           </div>
//         </div>

//         </>}
//         </>
        
                         
      
//       ))}
      
//     </div>
//     </div>
//   );
// }

// export default Stock;































// "use client";
// import React, { useEffect, useState } from "react";
// import client from "../../sanity/lib/client";

// function Stock() {
//   const [orders, setOrders] = useState<any[]>([]);

//   useEffect(() => {
//     async function getData() {
//       const res = await client.fetch(`*[_type == "product"] {
//  name,
//   price,
//   stockLevel,
//   discountPercentage,
//   "image": image.asset->url,
//   category
// }

// `);

//       setOrders(res);
//     }

//     getData();
//   }, []);

//   return <div></div>;
// }

// export default Stock;
