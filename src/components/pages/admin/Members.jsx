// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFamilyMembersRequest, deleteFamilyMemberRequest } from '../../../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { debounce } from 'lodash';

// const Members = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     familyMembers = [],
//     totalPages = 1,
//     total = 0,
//     loading,
//     error,
//   } = useSelector((state) => state.users);




//   // Consolidated state for search and pagination
//   const [searchParams, setSearchParams] = useState({
//     searchField: 'name',
//     searchValue: '',
//     page: 1,
//   });

//   const { searchField, searchValue, page } = searchParams;
//   const limit = 10; // Can be dynamic

//   // Use a debounced function to trigger the search API call
//   const debouncedFetch = useMemo(
//     () =>
//       debounce((payload) => {
//         dispatch(fetchFamilyMembersRequest(payload));
//       }, 500),
//     [dispatch]
//   );

//   // Fetch members whenever searchField, searchValue, or page changes
//   useEffect(() => {
//     const payload = {
//       page,
//       limit,
//       [searchField]: searchValue,
//     };
//     debouncedFetch(payload);
//   }, [debouncedFetch, searchField, searchValue, page, limit]);

//   const handleViewClick = useCallback(
//     (id) => {
//       navigate(`/admin-dashboard/members/${id}`);
//     },
//     [navigate]
//   );

//   const handleDeleteClick = useCallback(
//     (id) => {
//       if (window.confirm('Are you sure you want to delete this member?')) {
//         dispatch(deleteFamilyMemberRequest(id));
//       }
//     },
//     [dispatch]
//   );

//   const handleSearchChange = useCallback(
//     (e) => {
//       let value = e.target.value;
//       if (searchField === 'phoneNumber') {
//         value = value.replace(/\+/g, '');
//       }
//       setSearchParams((prev) => ({
//         ...prev,
//         searchValue: value,
//         page: 1, // Reset page to 1 whenever the search value changes
//       }));
//     },
//     [searchField]
//   );

//   const handleFieldChange = useCallback((e) => {
//     setSearchParams({
//       searchField: e.target.value,
//       searchValue: '',
//       page: 1, // Reset page and search value when changing field
//     });
//   }, []);

//   const handlePageChange = useCallback(
//     (newPage) => {
//       if (newPage > 0 && newPage <= totalPages) {
//         setSearchParams((prev) => ({
//           ...prev,
//           page: newPage,
//         }));
//       }
//     },
//     [totalPages]
//   );

//   const actionButtonClasses = 'px-3 py-1 rounded text-sm cursor-pointer transition hover:scale-105';

//   return (
//     <div className="min-h-screen bg-white pt-2 px-3 md:pt-4 md:px-10 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-7">Family Members</h2>

//         {/* Search Section */}
//         <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
//           <div className="relative w-full sm:w-44 flex-shrink-0">
//             <select
//               value={searchField}
//               onChange={handleFieldChange}
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
//               placeholder={`Search by ${searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//               value={searchValue}
//               onChange={handleSearchChange}
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

//         {loading && <p className="text-center text-gray-500">Loading family members...</p>}
//         {error && <p className="text-center text-red-500">Error: {error}</p>}

//         {!loading && !error && (
//           <>
//             {/* Table Layout */}
//             <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
//               <table className="w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50 text-sm text-gray-700">
//                   <tr>
//                     <th className="p-4 text-left">Name</th>
//                     <th className="p-4 text-left">Email</th>
//                     <th className="p-4 text-left">Phone Number</th>
//                     <th className="px-9 py-4 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {familyMembers.length > 0 ? (
//                     familyMembers.map((member) => (
//                       <tr key={member._id} className="hover:bg-gray-50 transition-colors duration-150">
//                         <td className="px-4 py-3 font-medium text-gray-800">{member.name}</td>
//                         <td className="px-3 py-3 text-gray-600">{member.email}</td>
//                         <td className="px-4 py-3 text-gray-600">{member.phoneNumber}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex flex-wrap gap-6">
//                             <button
//                               className={`${actionButtonClasses} bg-[#3FBF81] text-white hover:bg-[#3FBF84]`}
//                               onClick={() => handleViewClick(member._id)}
//                             >
//                               View
//                             </button>
//                             <button
//                               className={`${actionButtonClasses} bg-red-500 text-white hover:bg-red-600`}
//                               onClick={() => handleDeleteClick(member._id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center py-6 text-gray-500">
//                         No family members found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card Layout */}
//             <div className="md:hidden flex flex-col gap-4">
//               {familyMembers.length > 0 ? (
//                 familyMembers.map((member) => (
//                   <div
//                     key={member._id}
//                     className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-150 border border-gray-200"
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <div className="text-lg font-bold text-gray-800">{member.name}</div>
//                         <div className="text-sm text-gray-500">{member.email}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-600 mb-4">
//                       <span className="font-semibold text-gray-700">Phone: </span>
//                       {member.phoneNumber}
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         className={`${actionButtonClasses} bg-[#3FBF81] text-white hover:bg-[#3FBF83] flex-1`}
//                         onClick={() => handleViewClick(member._id)}
//                       >
//                         View
//                       </button>
//                       <button
//                         className={`${actionButtonClasses} bg-red-500 text-white hover:bg-red-600 flex-1`}
//                         onClick={() => handleDeleteClick(member._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-6 text-gray-500">No family members found.</div>
//               )}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-between items-center mt-6">
//                 <p className="text-sm text-gray-600">
//                   Showing page {page} of {totalPages} (Total {total} members)
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     disabled={page === 1}
//                     onClick={() => handlePageChange(page - 1)}
//                   >
//                     Prev
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     disabled={page === totalPages}
//                     onClick={() => handlePageChange(page + 1)}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Members;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilyMembersRequest, deleteFamilyMemberRequest } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Members = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    familyMembers = [],
    totalPages = 1,
    total = 0,
    loading,
    error,
  } = useSelector((state) => state.users);

  const [searchParams, setSearchParams] = useState({
    searchField: 'name',
    searchValue: '',
    page: 1,
  });

  const { searchField, searchValue, page } = searchParams;
  const limit = 10;

  const debouncedFetch = useMemo(
    () =>
      debounce((payload) => {
        dispatch(fetchFamilyMembersRequest(payload));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    const payload = {
      page,
      limit,
      [searchField]: searchValue,
    };
    debouncedFetch(payload);
  }, [debouncedFetch, searchField, searchValue, page, limit]);

  const handleViewClick = useCallback(
    (id) => {
      navigate(`/admin-dashboard/members/${id}`);
    },
    [navigate]
  );

  const handleDeleteClick = useCallback(
    (id) => {
      if (window.confirm('Are you sure you want to delete this member?')) {
        dispatch(deleteFamilyMemberRequest(id));
      }
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e) => {
      let value = e.target.value;
      if (searchField === 'phoneNumber') {
        value = value.replace(/\+/g, '');
      }
      setSearchParams((prev) => ({
        ...prev,
        searchValue: value,
        page: 1,
      }));
    },
    [searchField]
  );

  const handleFieldChange = useCallback((e) => {
    setSearchParams({
      searchField: e.target.value,
      searchValue: '',
      page: 1,
    });
  }, []);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setSearchParams((prev) => ({
          ...prev,
          page: newPage,
        }));
      }
    },
    [totalPages]
  );

  return (
    <div className="min-h-screen bg-white pt-2 px-3 md:pt-4 md:px-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-7">Family Members</h2>

        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-44 flex-shrink-0">
            <select
              value={searchField}
              onChange={handleFieldChange}
              className="w-full h-10 pl-4 pr-10 text-sm border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-[#3FBF81] focus:ring-1 focus:ring-[#3FBF81] transition-all duration-200 bg-white cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phoneNumber">Phone Number</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              placeholder={`Search by ${searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full h-10 px-4 pl-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3FBF81] focus:ring-1 focus:ring-[#3FBF81] transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {loading && <p className="text-center text-gray-500 py-8">Loading family members...</p>}
        {error && <p className="text-center text-red-500 py-8">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="py-2 px-3 font-medium text-sm sm:text-base">Member Name</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Email</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base">Phone Number</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Details</th>
                  <th className="hidden sm:table-cell py-2 px-3 font-medium text-sm sm:text-base text-center">Delete</th>
                  <th className="sm:hidden py-2 px-3 font-medium text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {familyMembers.length > 0 ? (
                  familyMembers.map((member) => (
                    <tr key={member._id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
                      <td className="py-2 px-3 font-medium text-sm sm:text-base text-gray-800">{member.name}</td>
                      <td className="hidden sm:table-cell py-2 px-3 text-sm">{member.email}</td>
                      <td className="hidden sm:table-cell py-2 px-3 text-sm">{member.phoneNumber}</td>
                      
                      <td className="hidden sm:table-cell py-2 px-3 text-center">
                        <button onClick={() => handleViewClick(member._id)} className="text-[#3fbf81] font-medium hover:underline text-sm">
                          View Details
                        </button>
                      </td>
                      <td className="hidden sm:table-cell py-2 px-3 text-center">
                        <button onClick={() => handleDeleteClick(member._id)} className="text-red-500 hover:text-red-700">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                      
                      <td className="sm:hidden py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button onClick={() => handleViewClick(member._id)} className="text-[#3fbf81] font-medium hover:underline text-sm">
                            View
                          </button>
                          <button onClick={() => handleDeleteClick(member._id)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* highlight-start */}
        {/* Pagination Controls - Centered */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              title="Previous Page"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-gray-700 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              title="Next Page"
            >
              <ArrowRightIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
        {/* highlight-end */}
      </div>
    </div>
  );
};

export default Members;