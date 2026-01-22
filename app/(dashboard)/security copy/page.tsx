// "use client";

// import { useState } from "react";

// export default function SecuritySettings() {
//   const [email, setEmail] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match!");
//       return;
//     }
//     // TODO: Call API to update security settings
//     console.log({ email, oldPassword, newPassword });
//     alert("Security settings updated successfully!");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-md rounded-lg mt-10">
//       {/* Tabs */}
//       <div className="flex items-center space-x-4 mb-8">
//         <button
//           className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
//         >
//           User Management
//         </button>
//         <button
//           className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium"
//         >
//           Security
//         </button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleUpdate} className="space-y-6">
//         {/* Email */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Old Password */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Old Password
//           </label>
//           <input
//             type="password"
//             placeholder="Old Password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* New Password */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             New Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Re- Enter New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center space-x-4">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Update
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               setEmail("");
//               setOldPassword("");
//               setNewPassword("");
//               setConfirmPassword("");
//             }}
//             className="px-6 py-3 text-gray-600 rounded-md hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
