'use client'; // Client-side component banane ke liye

import { useState } from 'react';

import { useEffect } from 'react';






interface User {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
  }
  
 


export default function CustomersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch data on component mount
  const fetchUsers = async () => {
    const response = await fetch('https://e-commerce-dashboard-gules.vercel.app/api/auth/users', {
      cache: 'no-store',
    });
    const data = await response.json();
    const adminUsers = data.users.filter((user: { role: string; }) => user.role === 'user');
    setUsers(adminUsers);
  };

  // Edit user
  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  // Update user
  const handleUpdate = async (updatedData: Partial<User>) => {
    if (!editUser) return;
    const response = await fetch(`https://e-commerce-dashboard-gules.vercel.app/api/auth/users/${editUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    if (data.user) {
      fetchUsers(); // Refresh user list
      setIsEditModalOpen(false);
    }
  };

  // Delete user
  const handleDelete = async (id : string)  => {
    if (confirm('Are you sure you want to delete this user?')) {
      const response = await fetch(`https://e-commerce-dashboard-gules.vercel.app/api/auth/users/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message === 'User deleted successfully') {
        fetchUsers(); // Refresh user list
      }
    }
  };

  // Fetch users on component mount
  
  useEffect(() => {
      fetchUsers();
    }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Users</h2>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <div className="min-w-[600px]">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 whitespace-nowrap">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-4 text-sm sm:px-6 whitespace-nowrap">{user.name}</td>
                  <td className="px-4 py-4 text-sm sm:px-6 whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-4 text-sm sm:px-6 whitespace-nowrap">{user.address}</td>
                  <td className="px-4 py-4 text-sm sm:px-6 whitespace-nowrap">{user.phone}</td>
                  <td className="px-4 py-4 text-sm sm:px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm sm:px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900 mr-2 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedData = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  address: formData.get('address') as string,
                  phone: formData.get('phone') as string,
                };
                handleUpdate(updatedData);
              }}
            >
              {editUser && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    defaultValue={editUser.name}
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={editUser.email}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="address"
                    defaultValue={editUser.address}
                    className="w-full p-2 border rounded"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editUser.phone}
                    className="w-full p-2 border rounded"
                    placeholder="Phone"
                  />
                </div>
              )}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
