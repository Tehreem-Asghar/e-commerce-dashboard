"use client";
import { FaHistory, FaBorderStyle } from "react-icons/fa";
import { format } from "date-fns";
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

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
  tags: string[];
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface CustomerOrder {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  orderDate: string;
  totalAmount: number;
  status: "Delivered" | "Pending" | "Cancelled";
  items: OrderItem[];
}

const CustomerOrders = () => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const res: CustomerOrder[] = await client.fetch(
        `*[_type == "customerOrder"] {
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
        }`
      );
      setOrders(res);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] px-4 py-8 min-h-screen w-full max-w-[1920px] mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-600 flex gap-2 items-center">
          <FaHistory className="text-blue-600" />
          All Orders
        </h1>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-20 w-full bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-sm bg-white border border-gray-200">
            <Table className="min-w-full">
              <TableCaption className="text-gray-500 py-4">List of all customer orders.</TableCaption>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4">User</TableHead>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4">Status</TableHead>
                  <TableHead className="text-[16px] text-gray-700 font-bold py-4  whitespace-nowrap">Order Date</TableHead>
                  <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">Amount</TableHead>
                  <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((item) => (
                  <TableRow key={item._id} className="hover:bg-gray-50 transition-colors border-b">
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="text-gray-800 font-semibold  whitespace-nowrap">{item.customerName}</p>
                        <p className="text-gray-600 text-sm   whitespace-nowrap">{item.email}</p>
                        <p className="text-gray-600 text-sm  whitespace-nowrap">{item.phone}</p>
                        <p className="text-gray-600 text-sm  whitespace-nowrap">{item.address}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
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
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">No Orders Found</h1>
            <p className="text-gray-500 mt-2">Your order list is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;





















// "use client";
// import { FaHistory, FaBorderStyle } from "react-icons/fa";
// import { format } from "date-fns";
// // import Image from "next/image";
// import { useEffect, useState } from "react";
// import client from "../../../../sanity/lib/client";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";







// const CustomerOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getData() {
//       const res = await client.fetch(`*[_type == "customerOrder"] {
//         _id,
//         customerName,
//         phone,
//         email,
//         address,
//         orderDate,
//         totalAmount,
//         status,
//         items[] {
//           product->{
//             name,
//             "image": image.asset->url,
//             price,
//             description,
//             discountPercentage,
//             isFeaturedProduct,
//             stockLevel,
//             category,
//             tags
//           },
//           quantity
//         }
//       }`);
//       setOrders(res);
//       setLoading(false);
//     }

//     getData();
//   }, []);

//   return (
//     <div className="bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] px-4 py-8 min-h-screen w-full max-w-[1920px] mx-auto">
//       {/* Heading */}
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-blue-600 flex gap-2 items-center">
//           <FaHistory className="text-blue-600" />
//           All Orders
//         </h1>

//         {/* Orders Table */}
//         {loading ? (
//           // Loading State
//           <div className="space-y-4">
//             {[...Array(5)].map((_, index) => (
//               <Skeleton
//                 key={index}
//                 className="h-20 w-full bg-gray-200 rounded-lg"
//               />
//             ))}
//           </div>
//         ) : orders.length > 0 ? (
//           // Table with Orders
//           <div className="overflow-x-auto rounded-lg shadow-sm bg-white border border-gray-200">
//             <Table className="min-w-full">
//               <TableCaption className="text-gray-500 py-4">
//                 List of all customer orders.
//               </TableCaption>
//               <TableHeader className="bg-gray-50">
//                 <TableRow>
//                   <TableHead className="text-[16px] text-gray-700 font-bold py-4">
//                     User
//                   </TableHead>
//                   <TableHead className="text-[16px] text-gray-700 font-bold py-4">
//                     Status
//                   </TableHead>
//                   <TableHead className="text-[16px] text-gray-700 font-bold py-4  whitespace-nowrap">
//                     Order Date
//                   </TableHead>
//                   <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">
//                     Amount
//                   </TableHead>
//                   <TableHead className="text-right text-[16px] text-gray-700 font-bold py-4">
//                     Action
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.map((item) => (
//                   <TableRow
//                     key={item._id}
//                     className="hover:bg-gray-50 transition-colors border-b"
//                   >
//                     <TableCell className="py-4">
//                       <div className="space-y-1">
//                         <p className="text-gray-800 font-semibold  whitespace-nowrap">
//                           {item.customerName}
//                         </p>
//                         <p className="text-gray-600 text-sm   whitespace-nowrap">
//                           {item.email}
//                         </p>
//                         <p className="text-gray-600 text-sm  whitespace-nowrap">
//                           {item.phone}
//                         </p>
//                         <p className="text-gray-600 text-sm  whitespace-nowrap">
//                           {item.address}
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell className="py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                           item.status === "Delivered"
//                             ? "bg-green-100 text-green-700"
//                             : item.status === "Pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </TableCell>
//                     <TableCell className="py-4 text-gray-700  whitespace-nowrap">
//                       {format(new Date(item.orderDate), "MMM dd, yyyy")}
//                     </TableCell>
//                     <TableCell className="text-right whitespace-nowrap py-4 font-semibold text-gray-800">
//                       Rs-{item.totalAmount}
//                     </TableCell>
//                     <TableCell className="py-4">
//                       <div className="flex items-center justify-center h-full">
//                         <Link href={`/dashboard/orders/${item._id}`}>
//                           <FaBorderStyle className="text-blue-600 hover:text-blue-800 text-[24px] cursor-pointer" />
//                         </Link>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         ) : (
//           // Empty State
//           <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               No Orders Found
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Your order list is currently empty.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerOrders;

