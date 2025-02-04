"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


interface FormData {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const ProfileUpdate = () => {
  const { data: session, update } = useSession();

  console.log("session", session);

  const [formData, setFormData] = useState<FormData>({
    _id: session?.user.id || "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });


  



  const [loading, setLoading] = useState(false);
  const getUserInitial = (name?: string) => name?.charAt(0).toUpperCase();

  useEffect(() => {
    async function getDatabase() {
      try {
        if (!session?.user.id) return;

        const response = await fetch(`/api/auth/getdatafromdb`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: session?.user.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from database");
        }

        const data = await response.json();
        if (data.user) {
          setFormData({
            _id: session?.user.id || "",
            name: data.user.name || "",
            email: data.user.email || "",
            address: data.user.address || "",
            phone: data.user.phone ? String(data.user.phone) : "",
          });
          getUserInitial(data.user.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getDatabase();
  }, [session?.user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/profileUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      // Update the state with the new user data
      setFormData(result.user);

      // Update session after successful update
      await update({
        _id: session?.user.id,
        name: result.user.name,
        email: result.user.email,
        address: result.user.address,
        phone: result.user.phone,
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        alert(error.message || "An error occurred");
      } else {
        alert("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg  md:px-9">
    
      <div className="my-10 w-[90%] md:w-[50%] mx-auto">
        <h2 className="sm:text-[20px]  text-[16px] text-blue-600 font-bold  ">
          Edite Profile 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4  mt-9">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded"
            //   readOnly
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600  text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:[#FB2E86]"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
   
    </div>
  );
};

export default ProfileUpdate;





// import React from 'react'

// function page() {
//   return (
//     <div>
//      hello
//     </div>
//   )
// }

// export default page
