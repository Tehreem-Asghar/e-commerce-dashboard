"use client";
import { FaHistory, FaBorderStyle } from "react-icons/fa";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import client from "../../../../sanity/lib/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const CustomerOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await client.fetch(`*[_type == "customerOrder"] {
        _id,
        customerName,
        phone,
        email,
        address,
        orderDate,
        totalAmount,
        status,
        items[] {
          product->{
            name,
            "image": image.asset->url,
            price,
            description,
            discountPercentage,
            isFeaturedProduct,
            stockLevel,
            category,
            tags
          },
          quantity
        }
      }`);
      setOrders(res);
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] px-4 py-8 min-h-screen w-full max-w-[1920px] mx-auto">
      {/* Heading */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600 flex gap-2 items-center">
          <FaHistory className="text-blue-600" />
          All Orders
        </h1>

        {/* Orders Table */}
        {loading ? (
          // Loading State
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-20 w-full bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        ) : orders.length > 0 ? (
          // Table with Orders
          <div className="overflow-x-auto rounded-lg shadow-sm bg-white border border-gray-200">
            <Table className="min-w-full">
              <TableCaption className="text-gray-500 py-4">
                List of all customer orders.
              </TableCaption>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4">
                    User
                  </TableHead>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4">
                    Status
                  </TableHead>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4  whitespace-nowrap">
                    Order Date
                  </TableHead>
                  <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">
                    Amount
                  </TableHead>
                  <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((item) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors border-b"
                  >
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="text-gray-800 font-semibold  whitespace-nowrap">
                          {item.customerName}
                        </p>
                        <p className="text-gray-600 text-sm   whitespace-nowrap">
                          {item.email}
                        </p>
                        <p className="text-gray-600 text-sm  whitespace-nowrap">
                          {item.phone}
                        </p>
                        <p className="text-gray-600 text-sm  whitespace-nowrap">
                          {item.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-gray-700  whitespace-nowrap">
                      {format(new Date(item.orderDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap py-4 font-semibold text-gray-800">
                      Rs-{item.totalAmount}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center h-full">
                        <Link href={`/dashboard/orders/${item._id}`}>
                          <FaBorderStyle className="text-blue-600 hover:text-blue-800 text-[24px] cursor-pointer" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
              No Orders Found
            </h1>
            <p className="text-gray-500 mt-2">
              Your order list is currently empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;

// "use client";
// import { FaHistory } from "react-icons/fa";
// import { format } from "date-fns";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";
// import client from "../../sanity/lib/client";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"

// const CustomerOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//     // const { data: session } = useSession();
// //   const email = session?.user?.email
// useEffect(() => {
//     async function getData() {
//       const res =
//         await client.fetch(`*[_type == "customerOrder"] {
//           _id,
//   customerName,
//   phone,
//   email,
//   address,
//   orderDate,
//   totalAmount,
//   status,
//   items[] {
//     product->{
//       name,
//      "image": image.asset->url,
//       price,
//       description,
//       discountPercentage,
//       isFeaturedProduct,
//       stockLevel,
//       category,
//       tags
//     },
//     quantity
//   }
// }
// `);

//       setOrders(res);
//     }

//     getData();
//   }, []);

//   return (
// <div className="bg-gradient-to-r from-[#ffe8f2] to-[#d1b6db]    px-4 py-6 flex flex-col  justify-center  items-center h-full w-[100%]  max-w-[1920px] mx-auto">
//   {/* Heading */}
//   <h1 className="text-3xl font-bold mb-6 text-blue-600 flex gap-2 items-center">
//     {/* <FaHistory className="pt-1" /> */}
//      All Orders
//   </h1>

//   {/* Orders Table */}
//   {orders.length > 0 ? (
//     <>
// <Table>
//   <TableCaption>All order list.</TableCaption>
//   <TableHeader >
//     <TableRow >
//       <TableHead className="w-[100px] text-[16px] text-[#1D3178]  font-bold">User</TableHead>
//       <TableHead  className="text-[#1D3178]  text-[16px] font-bold">Product</TableHead>

//       <TableHead  className="text-[#1D3178]  text-[16px] font-bold">Status</TableHead>
//       <TableHead  className="text-[#1D3178] text-[16px]  font-bold ">Delivery_Expected</TableHead>

//       <TableHead className="text-right  text-[#1D3178]  text-[16px] font-bold">Amount</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody>
//   {orders.map((item)=>(
//     <TableRow>
//       <TableCell className="font-medium">

//           <>

//           <p  className="text-pink-600">{item.customerName}</p>
//          <p className="text-blue-500">{item.email}</p>
//         <p className="text-[#1D3178]">{item.phone}</p>
//         <p className="text-[#1D3178]">{item.address}</p>
//           </>

//        </TableCell>
//       <TableCell>
//         <>
//         <div className="grid grid-cols-1 w-[300px] gap-2">
//           {item.items.map((item: any, index: number) => (
//             <div className="flex  items-center" key={item.product._id}>
//                 {/* <p className="text-[10px] text-[#1D3178] flex ">{item.product.name} <p>( {item.quantity} )</p> </p> */}
//              <Image
//               key={index}
//               src={item.product.image}
//               alt={item.product.name}
//               width={50}
//               height={50}
//               className="h-[30px] w-[30px] rounded-md object-cover"

//               />
//               <p className="text-[14px] text-[#1D3178]   pl-1">{item.product.name}( {item.quantity} )</p>

//             </div>
//           ))}
//         </div>
//         </>
//       </TableCell>
//       <TableCell className="text-green-700  font-bold">
//       {item.status}
//       </TableCell>
//       <TableCell >{format(new Date(item.orderDate), "MMM dd yyyy")}</TableCell>

//       <TableCell className="text-right">{item.totalAmount}</TableCell>
//     </TableRow>
//       ))}
//   </TableBody>
// </Table>

//     </>
//   ) : (
//     <>
//       <div>
//         <h1 className="text-[#1D3178] font-serif"> Empty  Order</h1>
//       </div>
//     </>
//   )}
// </div>

/* 

     <div className="screen5:hidden block w-[100%] mx-auto overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px] table-auto">
          <thead>
            <tr className="text-[#1D3178] text-left border-b">
              <th className="pl-2 py-3 w-1/5">User</th>
              <th className="pl-2 py-3 w-1/3">Product</th>
              <th className="pl-2 py-3 w-1/5">Payment</th>
              <th className="pl-2 py-3 w-1/5">Status</th>
              <th className="pl-2 py-3 w-1/5">Delivery Expected</th>
            </tr>
          </thead>
          <tbody className="pt-3 md:text-[16px] sm:text-[14px] text-[12px]">
            {orders &&
              orders.map((order: any) => <OrderRow key={order._id} order={order} />)}
          </tbody>
        </table>
      </div>

      <div className="screen5:grid grid-cols-1 md:grid-cols-2 hidden flex-col gap-3">
        {orders.map((item) => (
          <div key={item._id} className="bg-slate-100 p-1 shadow-lg shadow-red-400 w-full h-auto">
            <span className="flex flex-col md:flex-row justify-between px-2">
              <p>{item.customerName}</p> <p>{item.address}</p>
            </span>
            <span className="flex flex-col md:flex-row justify-between px-2">
              <p>{item.phone}</p> <p className="text-blue-500">{item.email}</p>
            </span>
            <div className="grid">
              {item.items.map((pro: any) => (
                <div className="flex gap-1 my-2 border-b">
                  <Image
                    src={pro.product.image}
                    height={100}
                    width={100}
                    alt={pro.product.name}
                    className="h-[60px] w-[60px]"
                  />
                  <div>
                    <p className="line-clamp-2">{pro.product.name}</p>
                    <p>Quantity : {pro.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <span className="flex justify-between px-2">
              <p className="text-[#1D3178]">Amount : {item.totalAmount}</p>
              <p className="text-pink-600">{item.status}</p>
            </span>
          </div>
        ))}
      </div>  */

//     <div className="px-4 py-6  w-full max-w-[1920px] mx-auto">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6 text-blue-600 flex gap-2 items-center">
//         <FaHistory className="pt-1" /> Order History
//       </h1>

//   {/* Orders Table */}
//        {orders.length >0 ? <>

//         <div className="screen5:hidden  block w-full mx-auto overflow-x-auto">
//         <table className="w-full border-collapse min-w-[600px]">
//           <thead >
//             <tr className="text-[#1D3178]   text-left border-b">
//               <th className="pl-2 py-3">User</th>
//               <th className="pl-2 py-3">Product</th>
//               <th className="pl-2 py-3">Payment</th>
//               <th className="pl-2 py-3">Status</th>
//               <th className="pl-2 py-3 ">Delivery Expected </th>
//             </tr>
//           </thead>
//           <tbody className="pt-3 md:text-[16px] sm:text-[14px] text-[12px]">
//             {orders &&
//               orders.map((order: any) => (
//                <OrderRow key={order._id} order={order} />
//               ))}
//           </tbody>
//         </table>
//       </div>

//        <div  className="screen5:grid  grid-cols-1 md:grid-cols-2 hidden  flex-col gap-3 ">
//            {orders.map((item)=>(
//             <div key={item._id}  className="bg-slate-100  p-1 shadow-lg shadow-red-400 w-full h-auto">
//                 <span className="flex  flex-col md:flex-row justify-between px-2"><p>{item.customerName}</p> <p>{item.address}</p>  </span>
//                 <span className="flex   flex-col md:flex-row justify-between px-2"><p>{item.phone}</p> <p  className="text-blue-500">{item.email}</p>  </span>
//                 <div className="grid  ">
//                     {item.items.map((pro : any)=>(
//                         <div className="flex gap-1 my-2 border-b" >
//                          <Image  src={pro.product.image} height={100} width={100} alt={pro.product.name}  className="h-[60px] w-[60px]" />

//                           <div> <p className="line-clamp-2">{pro.product.name} </p>
//                           <p >Quantity : {pro.quantity}</p>
//                           </div>
//                           </div>
//                     ))}
//                  </div>

//                 <span className="flex justify-between px-2"><p className="text-[#1D3178]">Amount : {item.totalAmount}</p> <p className="text-pink-600">  {item.status} </p>  </span>

//             </div>
//            ))}

//        </div>

//        </> : <>

//        <div>
//         <h1  className="text-[#1D3178] font-serif">Order History is Empty</h1>
//        </div>

//        </>}

//     </div>
//   );
// };

// Single Order Row Component
// const OrderRow = ({ order }: { order: any }) => {
//   return (
//     <tr className="border-b">
//       {/* User Info */}
//       <td className="pl-2 py-3 whitespace-pre-wrap">
//         <p  className="text-pink-600">{order.customerName}</p>
//         <p className="text-blue-500">{order.email}</p>
//         <p className="text-[#1D3178]">{order.phone}</p>
//         <p className="text-[#1D3178]">{order.address}</p>
//       </td>

//       {/* Product Info */}
//       <td className="pl-2 py-3">
//         <div className="grid grid-cols-1 w-[300px] gap-2">
//           {order.items.map((item: any, index: number) => (
//             <div className="flex  items-center" key={item.product._id}>
//                 {/* <p className="text-[10px] text-[#1D3178] flex ">{item.product.name} <p>( {item.quantity} )</p> </p> */}
//              <Image
//               key={index}
//               src={item.product.image}
//               alt={item.product.name}
//               width={50}
//               height={50}
//               className="h-[40px] w-[40px] rounded-md object-cover"
//              //   unoptimized
//               />
//               <p className="text-[12px] text-[#1D3178]   pl-1">{item.product.name}( {item.quantity} )</p>

//             </div>
//           ))}
//         </div>
//       </td>

//       {/* Payment Info */}
//       <td className="pl-2 py-3 text-[#1D3178] text-sm">RS.{order.totalAmount}</td>

//       {/* Status */}
//       <td className="pl-2 py-3 text-sm"><mark>{order.status}</mark></td>

//       {/* Delivery Date */}
//       <td className="pl-2 py-3 text-[#1D3178] text-sm">
//         <p>{format(new Date(order.orderDate), "MMM dd yyyy")}</p>
//       </td>
//     </tr>
//   );
// };

// export default CustomerOrders;

// import React from 'react'

// function orders() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default orders
