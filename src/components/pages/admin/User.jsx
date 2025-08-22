// import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersRequest, deleteUserRequest } from "../../../redux/userSlice";

// const User = () => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [searchType, setSearchType] = useState("name"); // ✅ Default search type is 'name'

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     list: users = [], 
//     loading,
//     error,
//     totalPages,
//     totalUsers,
//   } = useSelector((state) => state.users);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [search]);

//   // ✅ Updated useEffect to include searchType in the filters
//   useEffect(() => {
//     dispatch(
//       fetchUsersRequest({
//         page,
//         limit: 10,
//         filters: { 
//             search: debouncedSearch,
//             searchType: searchType // Send the selected search type
//         },
//       })
//     );
//   }, [dispatch, page, debouncedSearch, searchType]); // ✅ Add searchType to dependencies

//   const handleDelete = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUserRequest(userId));
//     }
//   };

//   const handleViewClick = (id) => {
//     navigate(`/admin-dashboard/user/${id}`);
//   };

//   const actionButtonClasses =
//     "px-3 py-1 rounded text-sm cursor-pointer transition hover:scale-105";

//   return (
//     <div className="min-h-screen bg-white pt-1 px-3 md:pt-4 md:px-10 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6">
//         Users
//         </h2>

//         {/* Search Bar */}
// {/*         <div className="bg-gray-100 rounded-md px-4 py-2 flex items-center gap-3 shadow-sm mb-6">
//             {/* ✅ Add select dropdown 
//             <select
//                 value={searchType}
//                 onChange={(e) => setSearchType(e.target.value)}
//                 className="bg-transparent outline-none text-gray-700 w-24 md:w-auto"
//             >
//             <option value="name">Name</option>
//             <option value="email">Email</option>
//             <option value="phoneNumber">phoneNumber</option>
//             </select>
//           <SearchIcon className="text-gray-400 w-5 h-5" />
//           <input
//            type="text"
//             placeholder={`Search by ${searchType}...`} // ✅ Dynamic placeholder
//             className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
//             value={search}
//             onChange={(e) => {
//             setSearch(e.target.value);
//              setPage(1)
//             }}
//             />
//             </div> */}
//           <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
//           <div className="relative w-full sm:w-44 flex-shrink-0">
//             <select
//               value={searchType}
//               onChange={(e) => setSearchType(e.target.value)}
//               className="w-full h-10 pl-4 pr-10 text-sm border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-[#3FBF81] focus:ring-1 focus:ring-[#3FBF81] transition-all duration-200 bg-white cursor-pointer"
//             >
//               <option value="name">Name</option>
//               <option value="email">Email</option>
//               <option value="phoneNumber">Phone Number</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </div>
//           </div>
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder={`Search by ${searchType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//               value={search}
//               onChange={(e) => {
//             setSearch(e.target.value);
//              setPage(1)
//             }}
//               className="w-full h-10 px-4 pl-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] focus:ring-1 focus:ring-[#3FBF81] transition-all duration-200"
//             />
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//             </svg>
//           </div>
//         </div>
//           {/* ... (rest of the component remains the same) ... */}
//         {loading && (
//           <div className="text-center py-6 text-gray-500">Loading users...</div>
//         )}
//         {error && (
//           <div className="text-center py-6 text-red-500">⚠ {error}</div>
//         )}
//         {!loading && !error && (
//           <div className="hidden md:block overflow-x-auto shadow-md rounded-md">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead className="bg-gray-100 text-gray-700 text-left text-sm font-large">
//                 <tr>
//                   <th className="px-4 py-3">User</th>
//                   <th className="px-16 py-3">Email</th>
//                   <th className="px-10 py-3">Contact No</th>
//                   <th className="px-10 py-3">Status</th>
//                   <th className="px-9 py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm">
//                 {users.length > 0 ? (
//                   users.map((user) => (
//                     <tr
//                       key={user._id}
//                       className="border border-gray-300 hover:bg-gray-50 transition"
//                     >
//                       <td className="px-4 py-4 font-medium">{user.name}</td>
//                       <td className="px-16 py-4">{user.email}</td>
//                       <td className="px-10 py-4">{user.phoneNumber}</td>
//                       <td className="px-9 py-4">
//                         <span className="px-3 py-1 rounded-full text-s bg-green-100 text-green-700">
//                           {user.isVerified ? "Active" : "Pending"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex gap-4 flex-wrap">
//                           <button
//                             className={`${actionButtonClasses} bg-[#3FBF81] text-white`}
//                             onClick={() => handleViewClick(user._id)}
//                           >
//                             View
//                           </button>
//                           <button
//                             className={`${actionButtonClasses} bg-red-500 text-white`}
//                             onClick={() => handleDelete(user._id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-6 text-gray-500">
//                       No matching users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {/* Mobile Cards */}
//         {!loading && !error && (
//           <div className="md:hidden flex flex-col gap-4">
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <div
//                   key={user._id}
//                   className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
//                 >
//                   <div className="text-lg font-semibold mb-1">{user.name}</div>
//                   <div className="text-sm text-gray-600 mb-1">{user.email}</div>
//                   <div className="text-sm text-gray-400 mb-3">
//                     {user.phoneNumber}
//                   </div>
//                   <div className="mt-2">
//                     <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 mb-1">
//                       {user.isVerified ? "Active" : "Pending"}
//                     </span>
//                   </div>
//                   <div className="mt-3 flex gap-2 flex-wrap">
//                     <button
//                       className={`${actionButtonClasses} bg-[#3FBF81] text-white w-full md:w-auto`}
//                       onClick={() => navigate(`/admin-dashboard/user/${user._id}`)}
//                     >
//                       View
//                     </button>
//                     <button
//                       className={`${actionButtonClasses} bg-red-500 text-white w-full md:w-auto`}
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-6 text-gray-500">
//                 No matching users found.
//               </div>
//             )}
//           </div>
//         )}
//         {/* Pagination */}
//         {!loading && !error && totalPages > 1 && (
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-sm text-gray-600">
//               Showing page {page} of {totalPages} (Total {totalUsers} users)
//             </p>
//             <div className="flex gap-2">
//               <button
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                 disabled={page === 1}
//                 onClick={() => setPage((p) => p - 1)}
//               >
//                 Prev
//               </button>
//               <button
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                 disabled={page === totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest, deleteUserRequest } from "../../../redux/userSlice";
import { 
  MagnifyingGlassIcon,
  TrashIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

const User = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchType, setSearchType] = useState("name");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    list: users = [],
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.users);

  // Debouncing for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetching users data
  useEffect(() => {
    dispatch(
      fetchUsersRequest({
        page,
        limit: 10,
        filters: {
          search: debouncedSearch,
          searchType: searchType,
        },
      })
    );
  }, [dispatch, page, debouncedSearch, searchType]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserRequest(userId));
    }
  };

  const handleViewClick = (id) => {
    navigate(`/admin-dashboard/user/${id}`);
  };

  return (
    <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Users Management
        </h1>
        <p className="text-gray-500">View, search, and manage application users.</p>
      </div>

      <div className="max-w-3xl w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] transition"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone Number</option>
          </select>

          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] transition"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="w-full">
        {loading && users.length === 0 ? (
          <p className="text-gray-500 text-center">Loading users...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="py-2 px-3 font-medium text-sm sm:text-base">User</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Email</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Contact No</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Status</th>
                  {/* highlight-start */}
                  {/* Badi screen ke liye alag alag headers */}
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Details</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Delete</th>
                  {/* Chhoti screen ke liye ek header */}
                  <th className="sm:hidden py-2 px-3 font-medium text-sm text-center">Actions</th>
                  {/* highlight-end */}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
                      <td className="py-2 px-3">
                        <div className="font-medium text-sm sm:text-base text-gray-800">{user.name}</div>
                        {/* <div className="text-xs sm:text-sm text-gray-500">{user.email}</div> */}
                      </td>
                      <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">{user.email}</td>
                      <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">{user.phoneNumber}</td>
                      <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base text-center">
                        <span className={`px-3 py-1 text-xs rounded-full ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {user.isVerified ? "Active" : "Pending"}
                        </span>
                      </td>

                      {/* highlight-start */}
                      {/* Desktop: Details button alag cell me */}
                      <td className="hidden sm:table-cell py-2 px-3 text-center">
                        <button
                          onClick={() => handleViewClick(user._id)}
                          className="text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm"
                        >
                          View Details
                        </button>
                      </td>
                      
                      {/* Desktop: Delete button alag cell me */}
                      <td className="hidden sm:table-cell py-2 px-3 text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete User"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                      
                      {/* Mobile: Dono buttons ek hi cell me */}
                      <td className="sm:hidden py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleViewClick(user._id)}
                            className="text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete User"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                      {/* highlight-end */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
            title="Previous Page"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
            title="Next Page"
          >
            <ArrowRightIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default User;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // highlight-start
// // useSelector ko import kiya
// import { useDispatch, useSelector } from "react-redux";
// // highlight-end
// import { fetchUsersRequest, deleteUserRequest } from "../../../redux/userSlice";
// import { 
//   MagnifyingGlassIcon,
//   TrashIcon, 
//   ArrowLeftIcon, 
//   ArrowRightIcon 
// } from "@heroicons/react/24/outline";

// const User = () => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [searchType, setSearchType] = useState("name");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux store se user list fetch ki
//   const {
//     list: users = [],
//     loading,
//     error,
//     totalPages,
//   } = useSelector((state) => state.users);

//   // highlight-start
//   // Logged-in user ki details fetch ki
//   const { user: loggedInUser } = useSelector((state) => state.auth);
//   // highlight-end

//   // Debouncing for search
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [search]);

//   // Fetching users data
//   useEffect(() => {
//     dispatch(
//       fetchUsersRequest({
//         page,
//         limit: 10,
//         filters: {
//           search: debouncedSearch,
//           searchType: searchType,
//         },
//       })
//     );
//   }, [dispatch, page, debouncedSearch, searchType]);

//   const handleDelete = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUserRequest(userId));
//     }
//   };

//   const handleViewClick = (id) => {
//     navigate(`/admin-dashboard/user/${id}`);
//   };

//   // highlight-start
//   // User list se logged-in admin ko filter karke hata diya
//   const usersToDisplay = users.filter(user => user._id !== loggedInUser?._id);
//   // highlight-end

//   return (
//     <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-10">
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//           Users Management
//         </h1>
//         <p className="text-gray-500">View, search, and manage application users.</p>
//       </div>

//       <div className="max-w-3xl w-full space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <select
//             value={searchType}
//             onChange={(e) => setSearchType(e.target.value)}
//             className="px-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] transition"
//           >
//             <option value="name">Name</option>
//             <option value="email">Email</option>
//             <option value="phoneNumber">Phone Number</option>
//           </select>

//           <div className="relative flex-grow">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder={`Search by ${searchType}...`}
//               className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-[#3fbf81] transition"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="w-full">
//         {loading && users.length === 0 ? (
//           <p className="text-gray-500 text-center">Loading users...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center">Error: {error}</p>
//         ) : (
//           <div className="overflow-x-auto rounded-lg border border-gray-200">
//             <table className="w-full border-collapse">
//               <thead className="bg-gray-100 text-left text-gray-700">
//                 <tr>
//                   <th className="py-2 px-3 font-medium text-sm sm:text-base">User</th>
//                   <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Email</th>
//                   <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Contact No</th>
//                   <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Status</th>
//                   <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Details</th>
//                   <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Delete</th>
//                   <th className="sm:hidden py-2 px-3 font-medium text-sm text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* highlight-start */}
//                 {/* Ab filtered list (usersToDisplay) ka use kiya ja raha hai */}
//                 {usersToDisplay.length > 0 ? (
//                   usersToDisplay.map((user) => (
//                 // highlight-end
//                     <tr key={user._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
//                       <td className="py-2 px-3">
//                         <div className="font-medium text-sm sm:text-base text-gray-800">{user.name}</div>
//                       </td>
//                       <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">{user.email}</td>
//                       <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">{user.phoneNumber}</td>
//                       <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base text-center">
//                         <span className={`px-3 py-1 text-xs rounded-full ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                           {user.isVerified ? "Active" : "Pending"}
//                         </span>
//                       </td>
//                       <td className="hidden sm:table-cell py-2 px-3 text-center">
//                         <button
//                           onClick={() => handleViewClick(user._id)}
//                           className="text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                       <td className="hidden sm:table-cell py-2 px-3 text-center">
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="text-red-500 hover:text-red-700"
//                           title="Delete User"
//                         >
//                           <TrashIcon className="w-5 h-5" />
//                         </button>
//                       </td>
//                       <td className="sm:hidden py-2 px-3 text-center">
//                         <div className="flex items-center justify-center gap-4">
//                           <button
//                             onClick={() => handleViewClick(user._id)}
//                             className="text-[#3fbf81] font-medium cursor-pointer hover:underline text-sm"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleDelete(user._id)}
//                             className="text-red-500 hover:text-red-700"
//                             title="Delete User"
//                           >
//                             <TrashIcon className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-6 text-gray-500 italic">
//                       No other users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {!loading && totalPages > 1 && (
//         <div className="flex justify-center items-center mt-6 space-x-4">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
//             title="Previous Page"
//           >
//             <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
//           </button>
//           <span className="text-gray-700 font-medium">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//             className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
//             title="Next Page"
//           >
//             <ArrowRightIcon className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;