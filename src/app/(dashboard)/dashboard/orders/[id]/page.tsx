"use client";
import React, { useEffect, useState } from "react";
import client from "@/sanity/lib/client";
import Image from "next/image";

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

interface OrderData {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

interface Params {
  id: string;
}

function Order({ params }: { params: Params }) {
  const { id } = params;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const res: OrderData = await client.fetch(
          `*[_type == "customerOrder" && _id == $id][0] {
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
          }`,
          { id }
        );

        setOrder(res);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  if (loading) 
    return <div className="h-screen w-full flex justify-center items-center"> <p className="text-center text-gray-600">Loading...</p> </div>;
  
  if (!order) 
    return <div className="h-screen w-full flex justify-center items-center"><p className="text-center text-red-500">Order not found</p> </div>;

  return (
    <div className="sm:p-6 p-2 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-8 shadow-blue-400">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Order Details</h1>

        {/* Customer Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Customer Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 sm:whitespace-nowrap"><strong>Customer Name:</strong> {order.customerName}</p>
              <p className="text-gray-600 sm:whitespace-nowrap"><strong>Email:</strong> {order.email}</p>
            </div>
            <div>
              <p className="text-gray-600 sm:whitespace-nowrap"><strong>Phone:</strong> {order.phone}</p>
              <p className="text-gray-600 sm:whitespace-nowrap"><strong>Address:</strong> {order.address}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-600 whitespace-nowrap"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p className="text-gray-600 whitespace-nowrap"><strong>Total Amount:</strong> ${order.totalAmount}</p>
            <p className="text-gray-600 whitespace-nowrap"><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Order Items</h2>
          <ul className="space-y-4">
            {order.items?.map((item, index) => (
              <li key={index} className="border-b pb-4">
                <div className="flex items-center space-x-6">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    height={80}
                    width={80}
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
                    <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                    <p className="text-gray-600"><strong>Price:</strong> ${item.product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Order;


































// "use client";
// import React, { useEffect, useState } from "react";
// import client from "@/sanity/lib/client";
// import Image from "next/image";

// interface Params {
//   id: string;
// }

// function Order({ params }: { params: Params }) {
//   const { id } = params;
//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const res = await client.fetch(
//           `*[_type == "customerOrder" && _id == $id][0] {
//             _id,
//             customerName,
//             phone,
//             email,
//             address,
//             orderDate,
//             totalAmount,
//             status,
//             items[] {
//               product->{
//                 name,
//                 "image": image.asset->url,
//                 price,
//                 description,
//                 discountPercentage,
//                 isFeaturedProduct,
//                 stockLevel,
//                 category,
//                 tags
//               },
//               quantity
//             }
//           }`,
//           { id } // Query parameters
//         );

//         setOrder(res);
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) {
//       getData();
//     }
//   }, [id]);

//   if (loading) return <div className="h-screen w-full flex justify-center items-center">  <p className="text-center text-gray-600">Loading...</p> </div> 
//   if (!order) return <div className="h-screen w-full flex justify-center items-center"><p className="text-center text-red-500">Order not found</p> </div> 

//   return (
//     <div className="sm:p-6 p-2 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-8  shadow-blue-400  ">
//         <h1 className="text-3xl font-bold  mb-6  text-blue-800">Order Details</h1>

//         {/* Customer Information */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold  mb-4   text-blue-600">Customer Information</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-600 sm:whitespace-nowrap"><strong>Customer Name:</strong> {order.customerName}</p>
//               <p className="text-gray-600 sm:whitespace-nowrap"><strong>Email:</strong> {order.email}</p>
//             </div>
//             <div>
//               <p className="text-gray-600 sm:whitespace-nowrap"><strong>Phone:</strong> {order.phone}</p>
//               <p className="text-gray-600 sm:whitespace-nowrap"><strong>Address:</strong> {order.address}</p>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-8 ">
//           <h2 className="text-xl font-semibold text-blue-600 mb-4">Order Summary</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <p className="text-gray-600 whitespace-nowrap"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
//             <p className="text-gray-600 whitespace-nowrap"><strong>Total Amount:</strong> ${order.totalAmount}</p>
//             <p className="text-gray-600 whitespace-nowrap"><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
//           </div>
//         </div>

//         {/* Order Items */}
//         <div>
//           <h2 className="text-xl font-semibold text-blue-600 mb-4">Order Items</h2>
//           <ul className="space-y-4">
//             {order.items?.map((item: any, index: number) => (
//               <li key={index} className="border-b pb-4">
//                 <div className="flex items-center space-x-6">
//                   <Image
//                     src={item.product.image}
                    
//                     alt={item.product.name}
//                     className="w-20 h-20 object-cover rounded-lg"
//                     height={80}
//                     width={80}
//                   />
//                   <div>
//                     <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
//                     <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
//                     <p className="text-gray-600"><strong>Price:</strong> ${item.product.price}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Order;