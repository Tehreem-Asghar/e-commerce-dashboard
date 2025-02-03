"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoPersonSharp } from "react-icons/io5";
import { IdCard } from "lucide-react";

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


  const [changePassword, setChangePassword] = useState({
    _id: session?.user.id || "",
    password : "",
    newPassword : "",
    confirmPassword : ""
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





// const handlePassword = async (e: React.FormEvent)=>{
//     e.preventDefault();
//     setLoading(true);


//     try{


//     }catch(err){
//         console.log(err)
//     }





// }











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
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.message || "An error occurred");
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
      {/* <div className="w-[40%] my-10">
      <h2 className="sm:text-[20px]  text-[16px] text-[#FB2E86] font-bold  ">
          Change Password
      </h2>


      <form onSubmit={handlePassword} className="flex flex-col gap-4  mt-9">
          <input
            type="text"
            name="password"
            value={changePassword.password}
            onChange={handleChange}
            placeholder="Enter current Password"
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="newPassword"
            value={changePassword.newPassword}
            onChange={handleChange}
            placeholder="Enter new Password"
            className="p-2 border rounded"
       
          />
          <input
            type="text"
            name="confirmPassword"
            value={changePassword.confirmPassword}
            onChange={handleChange}
            placeholder="Enter ConfirmPassword"
            className="p-2 border rounded"
          />
         
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:[#FB2E86]"
            }`}
          >
            {loading ? "Updating Password..." : "Change PassWord"}
          </button>
        </form>
         

     </div> */}
    </div>
  );
};

export default ProfileUpdate;









































// 'use client';

// import { useState } from 'react';

// export default function SettingsPage() {
//   const [settings, setSettings] = useState({
//     darkMode: false,
//     notifications: true,
//     language: 'English',
//     autoUpdate: false,
//     privacyMode: false,
//     theme: 'Light',
//     backup: 'Daily',
//     twoFactorAuth: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, type, checked, value } = e.target as HTMLInputElement;
//     setSettings((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="darkMode"
//             checked={settings.darkMode}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Dark Mode</span>
//         </label>
//       </div>

//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="notifications"
//             checked={settings.notifications}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Enable Notifications</span>
//         </label>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Language</label>
//         <select
//           name="language"
//           value={settings.language}
//           onChange={handleChange}
//           className="p-2 border rounded w-full"
//         >
//           <option value="English">English</option>
//           <option value="Urdu">Urdu</option>
//           <option value="French">French</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="autoUpdate"
//             checked={settings.autoUpdate}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Enable Auto Updates</span>
//         </label>
//       </div>

//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="privacyMode"
//             checked={settings.privacyMode}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Privacy Mode</span>
//         </label>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Theme</label>
//         <select
//           name="theme"
//           value={settings.theme}
//           onChange={handleChange}
//           className="p-2 border rounded w-full"
//         >
//           <option value="Light">Light</option>
//           <option value="Dark">Dark</option>
//           <option value="System">System Default</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Backup Frequency</label>
//         <select
//           name="backup"
//           value={settings.backup}
//           onChange={handleChange}
//           className="p-2 border rounded w-full"
//         >
//           <option value="Daily">Daily</option>
//           <option value="Weekly">Weekly</option>
//           <option value="Monthly">Monthly</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="twoFactorAuth"
//             checked={settings.twoFactorAuth}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Enable Two-Factor Authentication</span>
//         </label>
//       </div>
//     </div>
//   );
// }
