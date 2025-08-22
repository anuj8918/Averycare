// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsersRequest,fetchFamilyMembersRequest } from '../../../redux/userSlice';
// import { useDispatch, useSelector } from "react-redux";

// const Overview = () => {
//   const navigate = useNavigate();
//     const dispatch = useDispatch()


//    const { list: users, familyMembers, loading, error } = useSelector(
//      (state) => state.users
//    );

//    const { totalFamilyMembers } = useSelector((state) => state.users);
//    const { totalUsers } = useSelector((state) => state.users);
//     useEffect(() => {
//      dispatch(fetchUsersRequest());
//       dispatch(fetchFamilyMembersRequest());
//    }, [dispatch]);
 
//      const cards = [
//      { label: "Total Users", value: totalUsers, route: "/admin/users" },
//    ];
//   const statuses = ['User Service', 'Call Service', 'AI Engine', 'Database'];

//   return (
//     <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-7 font-sans">
      
//       {/* Overview Header */}
//       <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
//         Overview
//       </h2>

//       {/* Overview Cards - Using flexbox for more fluid responsiveness */}
//       <div className="grid grid-cols-1 min-[350px]:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {/* Total Users Card */}
//         <div
//           className="col-span-1 lg:max-w-[210px] min-h-[120px]"
//           onClick={() => navigate('users')}
//         >
//           <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
//             <div className="text-xl text-gray-600 font-medium">Total Users</div>
//             <div className="text-3xl font-bold text-gray-800 mt-3">
//             {loading ? "..." : totalUsers ?? 0}
//             </div>
//           </div>
//         </div>

//         {/* Total Family Members Card */}
//         <div 
//           className="col-span-1 lg:max-w-[210px] min-h-[120px]"
//           onClick={() => navigate('members')}
//         >
//           <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
//             <div className="text-xl text-gray-600 font-medium">Total Family Members</div>
//             <div className="text-3xl font-bold text-gray-800 mt-3">
//             {loading ? "..." : totalFamilyMembers ?? 0}
//             </div>
//           </div>
//         </div>

//         {/* Completed Calls Card */}
//         <div className="col-span-1 lg:max-w-[210px] min-h-[120px]">
//           <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
//             <div className="text-xl text-gray-600 font-medium text-center">Completed Calls</div>
//             <div className="text-3xl font-bold text-gray-800 mt-3">--</div>
//           </div>
//         </div>

//         {/* Active Today Card */}
//         <div className="col-span-1 lg:max-w-[210px] min-h-[120px]">
//           <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col justify-center items-center p-5 h-full">
//             <div className="text-xl text-gray-600 font-medium">Active Today </div>
//             <div className="text-3xl font-bold text-gray-800 mt-3">--</div>
//           </div>
//         </div>
//       </div>
  
//       {/* System Status Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:mr-12">
//         <h2 className="text-xl font-semibold mb-6">System Status</h2>
//         <ul className="space-y-6">
//           {statuses.map((status, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center text-gray-800"
//             >
//               <span>{status}</span>
//               <span className="w-3 h-3 bg-green-600 rounded-full"></span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

//  export default Overview;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // highlight-start
// // 1. Call history fetch karne ke liye action import kiya
// import { fetchUsersRequest, fetchFamilyMembersRequest, fetchScheduledCallsRequest } from '../../../redux/userSlice';
// // highlight-end
// import { useDispatch, useSelector } from "react-redux";
// import {
//   UsersIcon,
//   UserGroupIcon,
//   PhoneArrowUpRightIcon,
//   SignalIcon,
//   CircleStackIcon,
//   CpuChipIcon,
//   PhoneIcon as CallServiceIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';

// const Overview = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // highlight-start
//   // 2. Redux store se 'totalScheduledCalls' ka data nikala
//   const { 
//     totalFamilyMembers, 
//     totalUsers, 
//     loading, 
//     error,
//     totalScheduledCalls 
//   } = useSelector(
//     (state) => state.users
//   );
//   // highlight-end

//   useEffect(() => {
//     dispatch(fetchUsersRequest());
//     dispatch(fetchFamilyMembersRequest());
//     // highlight-start
//     // 3. Component load hone par sabhi calls ka data fetch kiya
//     dispatch(fetchScheduledCallsRequest({})); // Empty object to fetch all without filters
//     // highlight-end
//   }, [dispatch]);

//   // highlight-start
//   // 4. Cards array ko dynamic data ke saath update kiya
//   const cards = [
//     {
//       label: "Total Users",
//       value: totalUsers,
//       route: 'users',
//       icon: <UsersIcon />,
//     },
//     {
//       label: "Family Members",
//       value: totalFamilyMembers,
//       route: 'members',
//       icon: <UserGroupIcon />,
//     },
//     {
//       label: "Scheduled Calls", // Naam update kiya
//       value: totalScheduledCalls,    // Dynamic value use kiya
//       route: 'history-call',         // Clickable banaya
//       icon: <PhoneArrowUpRightIcon />,
//     },
//     {
//       label: "Active Today",
//       value: 2, // Yeh abhi bhi placeholder hai
//       route: null,
//       icon: <SignalIcon />,
//     },
//   ];
//   // highlight-end

//   const systemStatuses = [
//     { name: 'User Service', icon: <UserCircleIcon className="w-6 h-6 text-gray-500" /> },
//     { name: 'Call Service', icon: <CallServiceIcon className="w-6 h-6 text-gray-500" /> },
//     { name: 'AI Engine', icon: <CpuChipIcon className="w-6 h-6 text-gray-500" /> },
//     { name: 'Database', icon: <CircleStackIcon className="w-6 h-6 text-gray-500" /> },
//   ];

//   const CardSkeleton = () => (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//       <div className="flex items-center gap-4">
//         <div className="h-14 w-14 bg-gray-200 rounded-full animate-pulse"></div>
//         <div className="flex flex-col gap-2">
//           <div className="h-5 w-28 bg-gray-200 rounded-md animate-pulse"></div>
//           <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white min-h-screen sm:px-8 lg:px-12 space-y-8 pb-12 overflow-x-hidden">
      
//       <div className="space-y-2">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
//           Admin Overview
//         </h1>
//         <p className="text-gray-600 text-base">
//           A quick glance at your application's key metrics and system status.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {loading ? (
//           cards.map((_, index) => <CardSkeleton key={index} />)
//         ) : (
//           cards.map((card, index) => (
//             <div
//               key={index}
//               onClick={() => card.route && navigate(card.route)}
//               className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.route ? 'cursor-pointer' : 'cursor-default'}`}
//             >
//               <div className="flex items-center gap-4">
//                 <div className="bg-[#e6f8f0] p-3 rounded-full">
//                   {React.cloneElement(card.icon, { className: "w-7 h-7 text-[#3fbf81]" })}
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-base font-medium text-gray-600">{card.label}</span>
//                   <span className="text-3xl font-bold text-gray-800 mt-1">
//                     {card.value ?? 0}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
  
//       <div className="space-y-4">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-600">System Status</h2>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <ul className="space-y-5">
//             {systemStatuses.map((service, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center text-gray-800"
//               >
//                 <div className="flex items-center gap-3">
//                   {service.icon}
//                   <span className="font-medium">{service.name}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium text-green-700">Operational</span>
//                   <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm mt-4">Error loading data: {error}</p>}
//     </div>
//   );
// };

// export default Overview;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    fetchUsersRequest,
    fetchFamilyMembersRequest,
    fetchScheduledCallsRequest
} from '../../../redux/userSlice';
import { useDispatch, useSelector } from "react-redux";
import {
    UsersIcon,
    UserGroupIcon,
    PhoneArrowUpRightIcon,
    SignalIcon,
    CircleStackIcon,
    CpuChipIcon,
    PhoneIcon as CallServiceIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

const Overview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // highlight-start
    // 1. Redux store se 'scheduledCalls' (poora array) nikala
    const {
        totalFamilyMembers,
        totalUsers,
        loading,
        error,
        scheduledCalls, // Yeh calls ka poora array hai
        totalScheduledCalls
    } = useSelector(
        (state) => state.users
    );

    // 2. Aaj ke calls ka count store karne ke liye state banaya
    const [todaysCallsCount, setTodaysCallsCount] = useState(0);
    // highlight-end

    useEffect(() => {
        dispatch(fetchUsersRequest());
        dispatch(fetchFamilyMembersRequest());
        // 3. Saare scheduled calls fetch kiye (limit badha di taaki sab aa jayein)
        dispatch(fetchScheduledCallsRequest({ page: 1, limit: 1000 }));
    }, [dispatch]);

    // highlight-start
    // 4. Jab bhi calls ka data Redux se update hoga, usse filter karke aaj ke calls count karenge
    useEffect(() => {
        if (scheduledCalls && scheduledCalls.length > 0) {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            const callsForToday = scheduledCalls.filter(call => {
                const callDateString = new Date(call.scheduledAt).toISOString().split('T')[0];
                return callDateString === todayString && call.status === 'pending'; // Sirf pending calls count karein
            });

            setTodaysCallsCount(callsForToday.length);
        }
    }, [scheduledCalls]); // Yeh tab chalega jab 'scheduledCalls' array update hoga
    // highlight-end

    const cards = [
        {
            label: "Total Users",
            value: totalUsers,
            route: 'users',
            icon: <UsersIcon />,
        },
        {
            label: "Family Members",
            value: totalFamilyMembers,
            route: 'members',
            icon: <UserGroupIcon />,
        },
        {
            label: "Total Calls",
            value: totalScheduledCalls,
            route: 'history-call',
            icon: <PhoneArrowUpRightIcon />,
        },
        // highlight-start
        // 5. "Active Today" card ki value ko dynamic state se link kiya
        {
            label: "Pending Today",
            value: todaysCallsCount, // Dynamic value
            route: 'history-call', // Isse clickable banaya
            icon: <SignalIcon />,
        },
        // highlight-end
    ];

    const systemStatuses = [
        { name: 'User Service', icon: <UserCircleIcon className="w-6 h-6 text-gray-500" /> },
        { name: 'Call Service', icon: <CallServiceIcon className="w-6 h-6 text-gray-500" /> },
        { name: 'AI Engine', icon: <CpuChipIcon className="w-6 h-6 text-gray-500" /> },
        { name: 'Database', icon: <CircleStackIcon className="w-6 h-6 text-gray-500" /> },
    ];

    const CardSkeleton = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex flex-col gap-2">
                    <div className="h-5 w-28 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen space-y-8 pb-12">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                    Admin Overview
                </h1>
                <p className="text-gray-600 text-base">
                    A quick glance at your application's key metrics and system status.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading && !totalUsers ? ( // Loading state tab tak dikhaye jab tak data na aa jaye
                    cards.map((_, index) => <CardSkeleton key={index} />)
                ) : (
                    cards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => card.route && navigate(card.route)}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.route ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-[#e6f8f0] p-3 rounded-full">
                                    {React.cloneElement(card.icon, { className: "w-7 h-7 text-[#3fbf81]" })}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-gray-600">{card.label}</span>
                                    <span className="text-3xl font-bold text-gray-800 mt-1">
                                        {card.value ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
    
            <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-600">System Status</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <ul className="space-y-5">
                        {systemStatuses.map((service, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center text-gray-800"
                            >
                                <div className="flex items-center gap-3">
                                    {service.icon}
                                    <span className="font-medium">{service.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-green-700">Operational</span>
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-4">Error loading data: {error}</p>}
        </div>
    );
};

export default Overview;