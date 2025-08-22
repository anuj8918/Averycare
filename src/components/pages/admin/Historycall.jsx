// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// // import SearchIcon from '@mui/icons-material/Search';
// // import { deleteScheduledCallRequest } from '../../../redux/userSlice';
// // import { fetchScheduledCallsRequest,updateScheduledCallsSearchQuery } from '../../../redux/userSlice';
// // const HistoryCall = () => {
// //     const dispatch = useDispatch();
// //     const {
// //         scheduledCalls,
// //         totalScheduledCalls,
// //         page,
// //         limit,
// //         loading,
// //         error,
// //         scheduledCallsSearchQuery,
// //     } = useSelector((state) => state.users);
// //     const [localSearchQuery, setLocalSearchQuery] = useState(scheduledCallsSearchQuery);
// //    const today = new Date();
// //         const thirtyDaysAgo = new Date(today);
// //         thirtyDaysAgo.setDate(today.getDate() - 30);
// //         const startDate = thirtyDaysAgo.toISOString().split('T')[0];
// //         const endDate = today.toISOString().split('T')[0];
// //      useEffect(() => {
// //         // Dispatch an action to set a default date range
// //         dispatch(updateScheduledCallsSearchQuery({
// //              scheduledAtBeetweenStartDate: startDate,
// //             scheduledAtBeetweenEndDate: endDate,// The current date
// //         }));
// //          dispatch(fetchScheduledCallsRequest({
// //          scheduledAtBeetweenStartDate: startDate,
// //             scheduledAtBeetweenEndDate: endDate,
// //     }));
// //     }, [dispatch]);
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setLocalSearchQuery((prev) => ({
// //             ...prev,
// //             [name]: value,
// //         }));
// //     };
// //     useEffect(() => {
// //   setLocalSearchQuery(scheduledCallsSearchQuery);
// // }, [scheduledCallsSearchQuery]);
// //     const handleFormSubmit = (e) => {
// //   //       e.preventDefault();
// //   //        dispatch(updateScheduledCallsSearchQuery({
// //   //   ...localSearchQuery,
// //   //   page: 1, // reset to first page when applying new filter
// //   //   limit,
// //   // }));
// //     dispatch(fetchScheduledCallsRequest({
// //     ...localSearchQuery,
// //     page: 1,
// //     limit,
// //   }));
// //     };
// //    const handleClearFilters = () => {
// //   const clearedValues = {
// //     recipientName: '',
// //     scheduledByName: '',
// //     scheduledToName: '',
// //     recipientNumber: '',
// //     scheduledAtBeetweenStartDate: '',
// //     scheduledAtBeetweenEndDate: '',
// //     minDuration: '',
// //     maxDuration: '',
// //     status: '',
// //     triesLeft: '',
// //   };
// //   setLocalSearchQuery(clearedValues);
// //   dispatch(updateScheduledCallsSearchQuery({
// //     ...clearedValues,
// //     page: 1,
// //     limit,
// //   }));
// //   dispatch(fetchScheduledCallsRequest({
// //     ...clearedValues,
// //     page: 1,
// //     limit,
// //   }));
// // };
// //     const totalPages = Math.ceil(totalScheduledCalls / limit);
// //   const handlePageChange = (newPage) => {
// //   dispatch(updateScheduledCallsSearchQuery({
// //     ...scheduledCallsSearchQuery,
// //     page: newPage,
// //     limit,
// //   }));
// //   dispatch(fetchScheduledCallsRequest({
// //     ...scheduledCallsSearchQuery,
// //     page: newPage,
// //     limit,
// //   }));
// // };
// //     // Use a nullish coalescing operator to ensure scheduledCalls is always an array
// //     const callsToRender = scheduledCalls ?? [];
// //      const handleDelete = (id) => {
// //         if (window.confirm("Are you sure you want to delete this user?")) {
// //            dispatch(deleteScheduledCallRequest(id));
// //         }
// //       };
// //     return (
// //         <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
// //             <h2 className="text-xl sm:text-2xl font-semibold mb-4">All Call History</h2>
// //             {/* Search + Filters Form */}
// //             <form onSubmit={handleFormSubmit} className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
// //                 <div className="relative w-full md:w-1/3">
// //                     <input
// //                         type="text"
// //                         name="recipientName"
// //                         placeholder="Search by recipient name..."
// //                         value={localSearchQuery.recipientName}
// //                         onChange={handleInputChange}
// //                         className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
// //                     />
// //                     <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
// //                 </div>
// //                   <div className="relative w-full md:w-1/3">
// //     <input
// //       type="text"
// //       name="recipientNumber"
// //       placeholder="Search by recipient number..."
// //       value={localSearchQuery.recipientNumber}
// //       onChange={handleInputChange}
// //       className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
// //     />
// //     <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
// //   </div>
// //                 <div className="flex flex-wrap justify-between gap-3 w-full md:w-auto">
// //                     <select
// //                         name="status"
// //                         value={localSearchQuery.status}
// //                         onChange={handleInputChange}
// //                         className="w-full md:w-auto text-sm px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none"
// //                     >
// //                         <option value="">All Status</option>
// //                         <option value="COMPLETED">Completed</option>
// //                         <option value="FAILED">Failed</option>
// //                         <option value="PENDING">Pending</option>
// //                     </select>
// //                 </div>
// //                 <div className="flex justify-end gap-3 w-full md:w-auto">
// //                     <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm bg-gray-300 rounded-md shadow-sm hover:bg-gray-400">Clear</button>
// //                     <button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Search</button>
// //                 </div>
// //             </form>
// //             {/* --- Loading State --- */}
// //             {loading && <div className="text-center py-8">Loading call history...</div>}
// //             {/* --- Table for md+ screens --- */}
// //             <div className="hidden md:block overflow-x-auto">
// //                 <table className="min-w-full bg-white border border-gray-300 text-sm">
// //                     <thead className="bg-gray-100 text-gray-700">
// //                         <tr>
// //                             <th className="p-3 text-left">Recipient</th>
// //                              <th className="p-3 text-left">PhoneNumber</th>
// //                             <th className="p-3 text-left">Date</th>
// //                             <th className="p-3 text-left">Time</th>
// //                             <th className="p-3 text-left">Scheduled By</th>
// //                             <th className="p-3 text-left">Status</th>
// //                             <th className="p-3 text-left">Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {/* Conditional rendering of table body content */}
// //                         {callsToRender.length > 0 ? (
// //                             callsToRender.map((call) => (
// //                                 <tr key={call._id} className="border-t border-gray-200">
// //                                     <td className="p-3 font-medium">
// //                                         {call.recipientName}
// //                                     </td>
// //                                       <td className="p-3 font-medium">
// //                                        {call.recipientNumber}
// //                                     </td>
// //                                     <td className="p-3 whitespace-nowrap">
// //                                         {new Date(call.scheduledAt).toLocaleDateString()}
// //                                         {/* <br />
// //                                         <span className="text-xs">{new Date(call.scheduledAt).toLocaleTimeString()}</span> */}
// //                                     </td>
// //                                     {/* <td className="p-3">{call.durationInSeconds ? `${call.durationInSeconds}s` : '-'}</td> */}
// //                                   <td className="p-3">{new Date(call.scheduledAt).toLocaleTimeString()}</td>
// //                                     <td className="p-3">{call.scheduledBy?.name || 'N/A'}</td>
// //                                      <td className="p-3">
// //                                         <span className={` text-s font-medium ${call.status === 'COMPLETED' ? 'text-gray-700' : call.status === 'FAILED' ? ' text-gray-700' : ' text-gray-700'}`}>
// //                                             {call.status}
// //                                         </span>
// //                                     </td>
// //                                     <td className="p-3 space-x-2 text-gray-500">
// //                                         <DeleteOutlineOutlinedIcon
// //                                             sx={{ fontSize: 24 }}
// //                                             className="cursor-pointer text-red-500 hover:text-red-700"
// //                                             onClick={() => handleDelete(call._id)}
// //                                         />
// //                                     </td>
// //                                 </tr>
// //                             ))
// //                         ) : (
// //                             <tr>
// //                                 <td colSpan="7" className="text-center p-4 text-gray-500">
// //                                     No call history found.
// //                                 </td>
// //                             </tr>
// //                         )}
// //                     </tbody>
// //                 </table>
// //             </div>
// //             {/* --- Mobile card view --- */}
// //             <div className="md:hidden space-y-4">
// //                 {callsToRender.length > 0 ? (
// //                     callsToRender.map((call) => (
// //                         <div key={call._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
// //                             {/* ... existing mobile card view content ... */}
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <div className="text-center text-gray-500 py-4">
// //                         No call history found.
// //                     </div>
// //                 )}
// //             </div>
// //             {/* --- Pagination Controls --- */}
// //             {!loading && !error && totalScheduledCalls > limit && (
// //                 <div className="flex justify-between items-center mt-6">
// //                     {/* ... pagination content ... */}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };
// // export default HistoryCall;

// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { 
// //   deleteScheduledCallRequest, 
// //   fetchScheduledCallsRequest, 
// //   updateScheduledCallsSearchQuery 
// // } from '../../../redux/userSlice';
// // import { 
// //   TrashIcon, 
// //   ArrowLeftIcon, 
// //   ArrowRightIcon 
// // } from '@heroicons/react/24/outline';

// // const HistoryCall = () => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const {
// //         scheduledCalls,
// //         totalScheduledCalls,
// //         page,
// //         limit,
// //         loading,
// //         error,
// //         scheduledCallsSearchQuery,
// //     } = useSelector((state) => state.users);

// //     const [localSearchQuery, setLocalSearchQuery] = useState(scheduledCallsSearchQuery);

// //     useEffect(() => {
// //         const today = new Date();
// //         const thirtyDaysAgo = new Date(today);
// //         thirtyDaysAgo.setDate(today.getDate() - 30);
// //         const startDate = thirtyDaysAgo.toISOString().split('T')[0];
// //         const endDate = today.toISOString().split('T')[0];

// //         const initialFilters = {
// //             ...scheduledCallsSearchQuery,
// //             scheduledAtBeetweenStartDate: scheduledCallsSearchQuery.scheduledAtBeetweenStartDate || startDate,
// //             scheduledAtBeetweenEndDate: scheduledCallsSearchQuery.scheduledAtBeetweenEndDate || endDate,
// //         };
        
// //         dispatch(updateScheduledCallsSearchQuery(initialFilters));
// //         dispatch(fetchScheduledCallsRequest(initialFilters));
// //     }, [dispatch]);

// //     useEffect(() => {
// //         setLocalSearchQuery(scheduledCallsSearchQuery);
// //     }, [scheduledCallsSearchQuery]);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setLocalSearchQuery((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleFormSubmit = (e) => {
// //         e.preventDefault();
// //         const newQuery = { ...localSearchQuery, page: 1 };
// //         dispatch(updateScheduledCallsSearchQuery(newQuery));
// //         dispatch(fetchScheduledCallsRequest(newQuery));
// //     };

// //     const handleClearFilters = () => {
// //         const clearedValues = {
// //             page: 1, limit: 10, recipientName: '', recipientNumber: '', status: '',
// //             scheduledAtBeetweenStartDate: '', scheduledAtBeetweenEndDate: '',
// //         };
// //         setLocalSearchQuery(clearedValues);
// //         dispatch(updateScheduledCallsSearchQuery(clearedValues));
// //         dispatch(fetchScheduledCallsRequest(clearedValues));
// //     };

// //     const totalPages = Math.ceil(totalScheduledCalls / limit);

// //     const handlePageChange = (newPage) => {
// //         if (newPage > 0 && newPage <= totalPages) {
// //             const newQuery = { ...scheduledCallsSearchQuery, page: newPage };
// //             dispatch(updateScheduledCallsSearchQuery(newQuery));
// //             dispatch(fetchScheduledCallsRequest(newQuery));
// //         }
// //     };
    
// //     const handleDelete = (id) => {
// //         if (window.confirm("Are you sure you want to delete this call record?")) {
// //             dispatch(deleteScheduledCallRequest(id));
// //         }
// //     };
    
// //     const callsToRender = scheduledCalls ?? [];

// //     return (
// //         <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-8">
// //             <div>
// //                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Calls </h1>
// //                 <p className="text-gray-500">Search and manage all scheduled calls.</p>
// //             </div>

// //             <form onSubmit={handleFormSubmit} className="space-y-4">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //                     <input type="text" name="recipientName" placeholder="Search by Recipient Name" value={localSearchQuery.recipientName || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
// //                     <input type="text" name="recipientNumber" placeholder="Search by Recipient Number" value={localSearchQuery.recipientNumber || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
// //                     <input type="date" name="scheduledAtBeetweenStartDate" value={localSearchQuery.scheduledAtBeetweenStartDate || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] text-gray-500" />
// //                     <select name="status" value={localSearchQuery.status || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] appearance-none bg-white">
// //                         <option value="">All Status</option>
// //                         <option value="COMPLETED">Completed</option>
// //                         <option value="FAILED">Failed</option>
// //                         <option value="PENDING">Pending</option>
// //                     </select>
// //                 </div>
// //                 <div className="flex items-center justify-end gap-3 pt-2">
// //                     <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">Clear</button>
// //                     <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#3FBF81] rounded-lg hover:bg-[#36a973]">Search</button>
// //                 </div>
// //             </form>

// //             <div className="w-full">
// //                 {loading && callsToRender.length === 0 ? (
// //                     <p className="text-gray-500 text-center py-8">Loading call history...</p>
// //                 ) : error ? (
// //                     <p className="text-red-500 text-center py-8">Error: {error}</p>
// //                 ) : (
// //                     <div className="overflow-x-auto rounded-lg border border-gray-200">
// //                         <table className="w-full border-collapse">
// //                             {/* highlight-start */}
// //                             <thead className="bg-gray-100 text-left text-gray-700">
// //                                 <tr>
// //                                     <th className="py-2 px-3 font-medium text-sm sm:text-base">Recipient</th>
// //                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Phone Number</th>
// //                                     <th className="py-2 px-3 font-medium text-sm sm:text-base">Date</th>
// //                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Time</th>
// //                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Scheduled By</th>
// //                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Status</th>
// //                                     <th className="py-2 px-3 font-medium text-sm sm:text-base text-center">Actions</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {callsToRender.length > 0 ? (
// //                                     callsToRender.map((call) => (
// //                                         <tr key={call._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
// //                                             <td className="py-2 px-3 font-medium text-sm sm:text-base text-gray-800">{call.recipientName}</td>
// //                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.recipientNumber}</td>
// //                                             <td className="py-2 px-3 text-sm">{new Date(call.scheduledAt).toLocaleDateString()}</td>
// //                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{new Date(call.scheduledAt).toLocaleTimeString()}</td>
// //                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.scheduledBy?.name || 'N/A'}</td>
// //                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">
// //                                                 <span className={`px-3 py-1 text-xs rounded-full capitalize ${
// //                                                     call.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
// //                                                     call.status === 'FAILED' ? 'bg-red-100 text-red-700' : 
// //                                                     'bg-yellow-100 text-yellow-700'
// //                                                 }`}>
// //                                                     {call.status.toLowerCase()}
// //                                                 </span>
// //                                             </td>
// //                                             <td className="py-2 px-3 text-center">
// //                                                 <button onClick={() => handleDelete(call._id)} className="text-red-500 hover:text-red-700 inline-block">
// //                                                     <TrashIcon className="w-5 h-5" />
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))
// //                                 ) : (
// //                                     <tr>
// //                                         <td colSpan="7" className="text-center py-6 text-gray-500 italic">No call history found.</td>
// //                                     </tr>
// //                                 )}
// //                             </tbody>
// //                             {/* highlight-end */}
// //                         </table>
// //                     </div>
// //                 )}
// //             </div>

// //             {!loading && totalPages > 1 && (
// //                 <div className="flex justify-center items-center mt-6 space-x-4">
// //                     <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
// //                         <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
// //                     </button>
// //                     <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
// //                     <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
// //                         <ArrowRightIcon className="w-5 h-5 text-gray-700" />
// //                     </button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default HistoryCall;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     deleteScheduledCallRequest,
//     fetchScheduledCallsRequest,
//     updateScheduledCallsSearchQuery
// } from '../../../redux/userSlice';
// import { TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// const HistoryCall = () => {
//     const dispatch = useDispatch();

//     const {
//         scheduledCalls,
//         totalScheduledCalls,
//         page,
//         limit,
//         loading,
//         error,
//         scheduledCallsSearchQuery,
//     } = useSelector((state) => state.users);

//     const [localSearchQuery, setLocalSearchQuery] = useState(scheduledCallsSearchQuery);

//     useEffect(() => {
//         // By default, fetch all calls without any filters
//         const initialFilters = {
//             page: 1,
//             limit: 10,
//             recipientName: '',
//             recipientNumber: '',
//             status: '',
//         };
//         dispatch(updateScheduledCallsSearchQuery(initialFilters));
//         dispatch(fetchScheduledCallsRequest(initialFilters));
//     }, [dispatch]);

//     useEffect(() => {
//         setLocalSearchQuery(scheduledCallsSearchQuery);
//     }, [scheduledCallsSearchQuery]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLocalSearchQuery((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const newQuery = { ...localSearchQuery, page: 1 };
//         dispatch(updateScheduledCallsSearchQuery(newQuery));
//         dispatch(fetchScheduledCallsRequest(newQuery));
//     };

//     const handleClearFilters = () => {
//         const clearedValues = {
//             page: 1,
//             limit: 10,
//             recipientName: '',
//             recipientNumber: '',
//             status: '',
//         };
//         setLocalSearchQuery(clearedValues);
//         dispatch(updateScheduledCallsSearchQuery(clearedValues));
//         dispatch(fetchScheduledCallsRequest(clearedValues));
//     };

//     const totalPages = Math.ceil(totalScheduledCalls / limit);

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             const newQuery = { ...scheduledCallsSearchQuery, page: newPage };
//             dispatch(fetchScheduledCallsRequest(newQuery));
//         }
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this call record?")) {
//             dispatch(deleteScheduledCallRequest(id));
//         }
//     };

//     const callsToRender = scheduledCalls ?? [];

//     return (
//         <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-8">
//             <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Calls</h1>
//                 <p className="text-gray-500">Search and manage all scheduled calls.</p>
//             </div>

//             <form onSubmit={handleFormSubmit} className="space-y-4">
//                 {/* ✅ REMOVED: Date filter ka input field yahan se hata diya hai */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <input type="text" name="recipientName" placeholder="Search by Recipient Name" value={localSearchQuery.recipientName || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
//                     <input type="text" name="recipientNumber" placeholder="Search by Recipient Number" value={localSearchQuery.recipientNumber || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
                    
//                     {/* ✅ STATUS FILTER: Yeh ab akele aur theek se kaam karega */}
//                     <select name="status" value={localSearchQuery.status || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] appearance-none bg-white">
//                         <option value="">All Status</option>
//                         <option value="completed">Completed</option>
//                         <option value="failed">Failed</option>
//                         <option value="pending">Pending</option>
//                     </select>
//                 </div>
//                 <div className="flex items-center justify-end gap-3 pt-2">
//                     <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">Clear</button>
//                     <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#3FBF81] rounded-lg hover:bg-[#36a973]">Search</button>
//                 </div>
//             </form>

//             <div className="w-full">
//                 {loading && callsToRender.length === 0 ? ( <p className="text-gray-500 text-center py-8">Loading call history...</p> ) : 
//                  error ? ( <p className="text-red-500 text-center py-8">Error: {error}</p> ) : (
//                     <div className="overflow-x-auto rounded-lg border border-gray-200">
//                         <table className="w-full border-collapse">
//                             <thead className="bg-gray-100 text-left text-gray-700">
//                                 <tr>
//                                     <th className="py-2 px-3 font-medium text-sm sm:text-base">Recipient</th>
//                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Phone Number</th>
//                                     <th className="py-2 px-3 font-medium text-sm sm:text-base">Date</th>
//                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Time</th>
//                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Scheduled By</th>
//                                     <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Status</th>
//                                     <th className="py-2 px-3 font-medium text-sm sm:text-base text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {callsToRender.length > 0 ? (
//                                     callsToRender.map((call) => (
//                                         <tr key={call._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
//                                             <td className="py-2 px-3 font-medium text-sm sm:text-base text-gray-800">{call.recipientName}</td>
//                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.recipientNumber}</td>
//                                             <td className="py-2 px-3 text-sm">{new Date(call.scheduledAt).toLocaleDateString()}</td>
//                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{new Date(call.scheduledAt).toLocaleTimeString()}</td>
//                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.scheduledBy?.name || 'N/A'}</td>
//                                             <td className="hidden sm:table-cell py-2 px-3 text-sm">
//                                                 <span className={`px-3 py-1 text-xs rounded-full capitalize ${
//                                                     call.status === 'completed' ? 'bg-green-100 text-green-700' :
//                                                     call.status === 'failed' ? 'bg-red-100 text-red-700' :
//                                                     'bg-yellow-100 text-yellow-700'
//                                                 }`}>
//                                                     {call.status.toLowerCase()}
//                                                 </span>
//                                             </td>
//                                             <td className="py-2 px-3 text-center">
//                                                 <button onClick={() => handleDelete(call._id)} className="text-red-500 hover:text-red-700 inline-block">
//                                                     <TrashIcon className="w-5 h-5" />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="7" className="text-center py-6 text-gray-500 italic">No call history found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {!loading && totalPages > 1 && (
//                 <div className="flex justify-center items-center mt-6 space-x-4">
//                     <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
//                         <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
//                     </button>
//                     <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
//                     <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
//                         <ArrowRightIcon className="w-5 h-5 text-gray-700" />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HistoryCall;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    deleteScheduledCallRequest,
    fetchScheduledCallsRequest,
    updateScheduledCallsSearchQuery
} from '../../../redux/userSlice';
import { TrashIcon, ArrowLeftIcon, ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline';

const HistoryCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        scheduledCalls,
        totalScheduledCalls,
        page,
        limit,
        loading,
        error,
        scheduledCallsSearchQuery,
    } = useSelector((state) => state.users);

    const [localSearchQuery, setLocalSearchQuery] = useState(scheduledCallsSearchQuery);

    useEffect(() => {
        const initialFilters = {
            page: 1,
            limit: 10,
            recipientName: '',
            recipientNumber: '',
            status: '',
        };
        dispatch(updateScheduledCallsSearchQuery(initialFilters));
        dispatch(fetchScheduledCallsRequest(initialFilters));
    }, [dispatch]);

    useEffect(() => {
        setLocalSearchQuery(scheduledCallsSearchQuery);
    }, [scheduledCallsSearchQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalSearchQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newQuery = { ...localSearchQuery, page: 1 };
        dispatch(updateScheduledCallsSearchQuery(newQuery));
        dispatch(fetchScheduledCallsRequest(newQuery));
    };

    const handleClearFilters = () => {
        const clearedValues = {
            page: 1,
            limit: 10,
            recipientName: '',
            recipientNumber: '',
            status: '',
        };
        setLocalSearchQuery(clearedValues);
        dispatch(updateScheduledCallsSearchQuery(clearedValues));
        dispatch(fetchScheduledCallsRequest(clearedValues));
    };

    const totalPages = Math.ceil(totalScheduledCalls / limit);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            const newQuery = { ...scheduledCallsSearchQuery, page: newPage };
            dispatch(fetchScheduledCallsRequest(newQuery));
        }
    };
    
  const handleViewDetails = (call) => {
  navigate(`/admin-dashboard/history-call/${call._id}`, { state: { callData: call } });
};

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this call record?")) {
            dispatch(deleteScheduledCallRequest(id));
        }
    };

    const callsToRender = scheduledCalls ?? [];

    return (
        <div className="flex flex-col sm:px-10 lg:px-12 pb-12 min-h-screen bg-white space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Calls</h1>
                <p className="text-gray-500">Search and manage all scheduled calls.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input type="text" name="recipientName" placeholder="Search by Recipient Name" value={localSearchQuery.recipientName || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
                    <input type="text" name="recipientNumber" placeholder="Search by Recipient Number" value={localSearchQuery.recipientNumber || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81]" />
                    <select name="status" value={localSearchQuery.status || ''} onChange={handleInputChange} className="w-full h-10 px-4 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] appearance-none bg-white">
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">Clear</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#3FBF81] rounded-lg hover:bg-[#36a973]">Search</button>
                </div>
            </form>

            <div className="w-full">
                {loading && callsToRender.length === 0 ? ( <p className="text-gray-500 text-center py-8">Loading call history...</p> ) : 
                 error ? ( <p className="text-red-500 text-center py-8">Error: {error}</p> ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-left text-gray-700">
                                <tr>
                                    <th className="py-2 px-3 font-medium text-sm sm:text-base">Recipient</th>
                                    <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Phone Number</th>
                                    <th className="py-2 px-3 font-medium text-sm sm:text-base">Date</th>
                                    <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Scheduled By</th>
                                    <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Status</th>
                                    {/* ✅ CHANGE: Badi screen ke liye alag "Details" column */}
                                    <th className="hidden md:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Details</th>
                                    <th className="py-2 px-3 font-medium text-sm sm:text-base text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {callsToRender.length > 0 ? (
                                    callsToRender.map((call) => (
                                        <tr key={call._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
                                            <td className="py-2 px-3 font-medium text-sm sm:text-base text-gray-800">{call.recipientName}</td>
                                            <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.recipientNumber}</td>
                                            <td className="py-2 px-3 text-sm">{new Date(call.scheduledAt).toLocaleDateString()}</td>
                                            <td className="hidden sm:table-cell py-2 px-3 text-sm">{call.scheduledBy?.name || 'N/A'}</td>
                                            <td className="hidden sm:table-cell py-2 px-3 text-sm">
                                                <span className={`px-3 py-1 text-xs rounded-full capitalize ${
                                                    call.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    call.status === 'failed' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {call.status}
                                                </span>
                                            </td>
                                            {/* ✅ CHANGE: Badi screen par "Details" button alag cell mein */}
                                            <td className="hidden md:table-cell py-2 px-3 text-center">
                                                <button onClick={() => handleViewDetails(call)} className="text-[#3fbf81] hover:underline inline-block">
                                                    View Details
                                                </button>
                                            </td>
                                            <td className="py-2 px-3 text-center">
                                                {/* ✅ CHANGE: Chhoti screen par dono button yahan dikhenge */}
                                                <div className="flex items-center justify-center md:hidden">
                                                    <button onClick={() => handleViewDetails(call)} className="text-[#3fbf81] hover:underline mr-4">
                                                        View
                                                    </button>
                                                    <button onClick={() => handleDelete(call._id)} className="text-red-500 hover:text-red-700">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                {/* ✅ CHANGE: Badi screen par sirf delete button yahan dikhega */}
                                                <div className="hidden md:inline-block">
                                                    <button onClick={() => handleDelete(call._id)} className="text-red-500 hover:text-red-700">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-500 italic">No call history found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                        <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                    </button>
                    <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                        <ArrowRightIcon className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistoryCall;