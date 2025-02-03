import React from 'react'
import Login from './login/page'

function home() {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default home

















// import { BsFillCartCheckFill } from "react-icons/bs";
// import { IoIosApps } from "react-icons/io";
// import { PiUsersThreeFill } from "react-icons/pi";
// import { SiProtonmail } from "react-icons/si";
// import client from "@/sanity/lib/client";
// import BarChart from "./(dashboard)/dashboard/components/BarChart";

// async function getProducts() {
//   const res = await client.fetch(
//     `*[_type == "product"] {
//       _id,
//       name,
//       price,
//       stockLevel,
//       discountPercentage,
//       "image": image.asset->url,
//       category
//     }`
//   );

//   return res.length;
//   // setProducts(res);
// }

// async function CurrentData() {
//   const res = await client.fetch(`*[_type == "customerOrder"] {
//     _id,
//     customerName,
//     phone,
//     email,
//     address,
//     orderDate,
//     totalAmount,
//     status,
//     items[] {
//       product->{
//         name,
//         "image": image.asset->url,
//         price,
//         description,
//         discountPercentage,
//         isFeaturedProduct,
//         stockLevel,
//         category,
//         tags
//       },
//       quantity
//     }
//   }`);

//   // Get the current month and year
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   // Filter orders for the current month
//   const currentMonthOrders = res.filter((order: any) => {
//     const orderDate = new Date(order.orderDate);
//     return (
//       orderDate.getMonth() === currentMonth &&
//       orderDate.getFullYear() === currentYear
//     );
//   });

//   return currentMonthOrders;
// }

// async function getData() {
//   const res = await client.fetch(`*[_type == "customerOrder"] {
//     _id,
//     customerName,
//     phone,
//     email,
//     address,
//     orderDate,
//     totalAmount,
//     status,
//     items[] {
//       product->{
//         name,
//         "image": image.asset->url,
//         price,
//         description,
//         discountPercentage,
//         isFeaturedProduct,
//         stockLevel,
//         category,
//         tags
//       },
//       quantity
//     }
//   }`);
//   return res;
//   // setOrders(res);
//   // setLoading(false);
// }

// // Fetch data on component mount
// const fetchUsers = async () => {
//   const response = await fetch("http://localhost:3000/api/auth/users", {
//     cache: "no-store",
//   });
//   const data = await response.json();
//   const adminUsers = data.users.filter(
//     (user: { role: string }) => user.role === "user"
//   );
//   // setUsers(adminUsers);
//   return adminUsers.length;
// };

// async function getorders() {
//   const res = await client.fetch(`*[_type == "customerOrder"] {
//     _id,
//     customerName,
//     phone,
//     email,
//     address,
//     orderDate,
//     totalAmount,
//     status,
//     items[] {
//       product->{
//         name,
//         "image": image.asset->url,
//         price,
//         description,
//         discountPercentage,
//         isFeaturedProduct,
//         stockLevel,
//         category,
//         tags
//       },
//       quantity
//     }
//   }`);
//   return res;
// }

// export default async function Home() {
//   const data = await getData();
//   const users = await fetchUsers();
//   const product = await getProducts();
//   const Orders = await getorders();
//   console.log("orderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", Orders);

//   const sales = data.length;
//   // Filter orders where status is "Delivered"
//   const deliveredOrders = data.filter(
//     (order: any) => order.status === "delivered"
//   );
//   const totalSales = deliveredOrders.length; // Count of delivered orders

//   console.log("Total Delivered Orders: ", totalSales);
//   console.log("Users.......", users);


//   return (
//     <div className="mt-9">
//       <h2 className="text-2xl font-bold mb-6 pl-4 text-blue-600">
//         Dashboard Overview
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6  px-3">
//         {/* Card 1: Total Sales */}
//         <div className="bg-gradient-to-r from-green-600 to-green-400 shadow-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//           <span>
//             <h3 className="text-lg font-semibold">Total Sales</h3>
//             <p className="text-2xl font-bold">{totalSales}</p>
//           </span>
//           <div className="h-[70px] w-[70px] p-3 flex justify-center items-center rounded-full">
//             {" "}
//             <BsFillCartCheckFill className="text-[80px] " />{" "}
//           </div>
//         </div>

//         {/* Card 2: Total Orders */}

//         <div className="bg-gradient-to-r from-pink-600 to-pink-400 shadow-pink-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//           <span>
//             <h3 className="text-lg font-semibold">Total Orders</h3>
//             <p className="text-2xl font-bold">{sales}</p>
//           </span>
//           <IoIosApps className="text-[70px] " />
//         </div>

//         {/* Card 3: Total Users */}
//         <div className="bg-gradient-to-r from-orange-600 to-orange-400 shadow-orange-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//           <span>
//             <h3 className="text-lg font-semibold">Total Users</h3>
//             <p className="text-2xl font-bold">{users}</p>
//           </span>
//           <PiUsersThreeFill className="text-[70px] " />
//         </div>

//         {/* Card 4: Total Users */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//           <span>
//             <h3 className="text-lg font-semibold">Total Products</h3>
//             <p className="text-2xl font-bold">{product}</p>
//           </span>
//           <SiProtonmail className="text-[50px] text-orang-900" />
//         </div>
//       </div>

//       <div  className="my-5">
//       <BarChart />

//       </div>
  
//       {/* Recent Orders Table */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-bold  mb-4 pl-4 text-blue-700">
//           Recent Orders
//         </h3>
//         <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date
//                 </th>

//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Total
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {Orders.map((item: any) => (
//                 <tr key={item._id}>
//                   {" "}
//                   {/* Add a unique key for each row */}
//                   <td className="px-6 py-4">{item._id}</td>
//                   <td className="px-6 py-4">{item.customerName}</td>
//                   <td className="px-6 py-4">
//                     {new Date(item.orderDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4">{item.totalAmount}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 py-1 ${
//                         item.status === "delivered"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       } rounded-full text-sm`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}

//               {/* <tr>
//                 <td className="px-6 py-4">#12346</td>
//                 <td className="px-6 py-4">Jane Smith</td>
//                 <td className="px-6 py-4">John Doe</td>

//                 <td className="px-6 py-4">$200</td>
//                 <td className="px-6 py-4">
//                   <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//                     Pending
//                   </span>
//                 </td>
//               </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
