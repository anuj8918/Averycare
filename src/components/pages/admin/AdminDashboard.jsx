// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import CallIcon from '@mui/icons-material/Call';
// import { useDispatch } from "react-redux";
// // import { adminLogout } from '../../../redux/adminSlice';
// // import { removeAdminToken } from '../../../utils/adminAuth';
// import { resetState } from '../../../redux/userSlice';

// const AdminDashboard = () => {
//   const navigate = useNavigate(); 
//   const dispatch = useDispatch();
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

//   // Function to handle link clicks
//   const handleNavigation = (path) => {
//     navigate(path);
//     setIsSidebarOpen(false); // Close sidebar after clicking a link
//   };

//    const handleLogout = () => {
//     // Token clear
//     localStorage.removeItem("token");

//     // Redux state reset
//       dispatch(resetState());

//     // Redirect to login
//     navigate("/admin-login");
//   };

//   return (
//     <div className="flex min-h-screen bg-white relative">
//       {/* Mobile Toggle Button, visible on screens smaller than 1024px */}
//       <button
//         className="fixed top-4 left-4 z-50 p-2 text-gray-700 lg:hidden"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 
//                    lg:relative lg:translate-x-0 lg:flex-shrink-0 
//                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="py-3 border-b border-gray-200">
//           <h1 className="text-2xl font-bold px-3">Admin Panel</h1>
//         </div>
//         <ul className="p-3">
//           <li className="w-full mt-4 px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('/admin-dashboard')}>
//             <HomeOutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
//             <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Dashboard</span>
//           </li>
//           <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('users')}>
//             <PeopleAltOutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
//             <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Users</span>
//           </li>
//           <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('members')}>
//             <Groups2OutlinedIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
//             <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Family Members</span>
//           </li>
//           <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full" onClick={() => handleNavigation('callhistory')}>
//             <CallIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
//             <span className="text-lg font-normal text-gray-700 group-hover:text-green-600">Completed Calls</span>
//           </li>
//           <li className="w-full px-2 py-3 cursor-pointer transition flex items-center gap-4 group hover:bg-gray-100 rounded-full"  onClick={handleLogout}>
//             <LogoutIcon className="text-gray-600 group-hover:text-green-600" style={{ fontSize: "26px" }} />
//             <span className="text-lg font-normal text-gray-700 group-hover:text-green-600" >Logout</span>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from "react-redux"; // Commented out to resolve build error
// import { resetState } from '../../../redux/userSlice'; // Commented out to resolve build error

// Navigation items ko Heroicons ke saath update kiya
const navItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/admin-dashboard', icon: HomeIcon },
    { id: 'users', name: 'Users', path: 'users', icon: UsersIcon },
    { id: 'members', name: 'Family Members', path: 'members', icon: UserGroupIcon },
    { id: 'callhistory', name: 'All Calls', path: 'history-call', icon: PhoneIcon },
];

const AdminDashboard = () => {
  const navigate = useNavigate(); 
  // const dispatch = useDispatch(); // Commented out to resolve build error

  const handleLogout = () => {
    localStorage.removeItem("token");
    // dispatch(resetState()); // Commented out to resolve build error
    navigate("/admin-login");
  };

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Toggle Button */}
      {/* <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button> */}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 
                   lg:relative lg:translate-x-0 lg:flex-shrink-0 
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Styling ko naye theme ke hisaab se update kiya */}
        <nav className="flex flex-col gap-2 pt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              // The 'end' prop ensures this link is only active when the URL is an exact match.
              end={item.id === 'dashboard'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-full mx-4 transition-all duration-200
                 ${
                   isActive
                     ? "bg-[#E3F5ED] text-[#3fbf81] font-semibold" // Active state
                     : "text-gray-700 hover:bg-[#F6FAF9]" // Inactive state for ALL items
                 }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-base">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
