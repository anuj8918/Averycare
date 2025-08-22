// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   list: [],
//   userDetail: null,
//   familyMembers: [],
//   singleFamilyMember: null,
//   page: 1,
//   limit: 10,
//   totalPages: 1,
//   totalUsers: 0,
//   count: 0,
//   loading: false,
//   error: null,
//   familyMemberSearchQuery: {
//     name: '',
//     email: '',
//     phoneNumber: '',
//   },
//     scheduledCallsSearchQuery: { // <-- Added new search query state
//     recipientName: '',
//     scheduledByName: '',
//     scheduledToName: '',
//     recipientNumber: '',
//     scheduledAtBeetweenStartDate: '',
//     scheduledAtBeetweenEndDate: '',
//     minDuration: '',
//     maxDuration: '',
//     status: '',
//     triesLeft: '',
//   },
// };
// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//      // :small_blue_diamond: Reset state on logout
//     resetState: () => initialState,
//     fetchUsersRequest: (state) => { state.loading = true; state.error = null },
//     // fetchUsersSuccess: (state, action) => { state.loading = false; state.list = action.payload },
//     fetchUsersSuccess: (state, action) => {
//         // console.log("Payload received:", action.payload);
//       state.loading = false;
//       state.list = action.payload.users;       // user array
//       // state.page = action.payload.page;        // current page
//       // state.limit = action.payload.limit;      // per page limit
//       state.totalPages = action.payload.totalPages;
//       state.totalUsers = action.payload.totalUsers;
//       // state.count = action.payload.count;      // current page count
//     },
//     fetchUsersFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     fetchUserDetailRequest: (state) => { state.loading = true; state.error = null; state.userDetail = null },
//     fetchUserDetailSuccess: (state, action) => {
//       state.loading = false;
//       state.userDetail = action.payload
//      },
//     fetchUserDetailFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     deleteUserRequest: (state) => { state.loading = true },
//     deleteUserSuccess: (state, action) => { state.loading = false; state.list = state.list.filter(u => u._id !== action.payload) },
//     deleteUserFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     fetchFamilyMembersRequest: (state) => { state.loading = true; state.error = null },
//      fetchFamilyMembersSuccess: (state, action) => {
//       state.loading = false;
//       state.familyMembers = action.payload.data;
//       state.total = action.payload.total;
//       state.totalFamilyMembers = action.payload.total;
//       state.page = action.payload.page;
//       state.limit = action.payload.limit;
//       state.totalPages = action.payload.totalPages; // <-- Add this line
//     },
//     fetchFamilyMembersFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     fetchSingleFamilyMemberRequest: (state) => { state.loading = true; state.error = null },
//     fetchSingleFamilyMemberSuccess: (state, action) => { state.loading = false; state.singleFamilyMember = action.payload },
//     fetchSingleFamilyMemberFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     deleteFamilyMemberRequest: (state) => { state.loading = true },
//     deleteFamilyMemberSuccess: (state, action) => {
//       state.loading = false;
//       state.familyMembers = state.familyMembers.filter(m => m._id !== action.payload);
//       if (state.singleFamilyMember?._id === action.payload) state.singleFamilyMember = null;
//     },
//     deleteFamilyMemberFailure: (state, action) => { state.loading = false; state.error = action.payload },
//     fetchScheduledCallsRequest: (state, action) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchScheduledCallsSuccess: (state, action) => {
//       state.loading = false;
//       state.scheduledCalls = action.payload.data;
//       state.totalScheduledCalls = action.payload.total;
//       state.page = action.payload.page;
//       state.limit = action.payload.limit;
//       state.totalPages = Math.ceil(action.payload.total / action.payload.limit) || 1;
//     },
//     fetchScheduledCallsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//      updateScheduledCallsSearchQuery: (state, action) => {
//       state.scheduledCallsSearchQuery = {
//         ...state.scheduledCallsSearchQuery,
//         ...action.payload,
//       };
//       state.page = 1; // Reset page to 1 on filter change
//     },
//     deleteScheduledCallRequest: (state) => {
//   state.loading = true;
//   state.error = null;
// },
// deleteScheduledCallSuccess: (state, action) => {
//   state.loading = false;
//   // Remove the deleted call from state
//   state.scheduledCalls = state.scheduledCalls.filter(call => call._id !== action.payload);
// },
// deleteScheduledCallFailure: (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// },
//   },
// });
// export const {
//    resetState,
//   fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure,
//   fetchUserDetailRequest, fetchUserDetailSuccess, fetchUserDetailFailure,
//   deleteUserRequest, deleteUserSuccess, deleteUserFailure,
//   fetchFamilyMembersRequest, fetchFamilyMembersSuccess, fetchFamilyMembersFailure,
//   fetchSingleFamilyMemberRequest, fetchSingleFamilyMemberSuccess, fetchSingleFamilyMemberFailure,
//   deleteFamilyMemberRequest, deleteFamilyMemberSuccess, deleteFamilyMemberFailure,
//    fetchScheduledCallsRequest,
//   fetchScheduledCallsSuccess,
//   fetchScheduledCallsFailure,
//   updateScheduledCallsSearchQuery,
//    deleteScheduledCallRequest, deleteScheduledCallSuccess, deleteScheduledCallFailure,
// } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    userDetail: null,
    familyMembers: [],
    singleFamilyMember: null,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalUsers: 0,
    count: 0,
    loading: false,
    error: null,
    familyMemberSearchQuery: {
        name: '',
        email: '',
        phoneNumber: '',
    },
    scheduledCalls: [],
    totalScheduledCalls: 0,
    scheduledCallsSearchQuery: {
        recipientName: '',
        scheduledByName: '',
        scheduledToName: '',
        recipientNumber: '',
        // ✅ REMOVED: Saari date properties yahan se hata di hain
        minDuration: '',
        maxDuration: '',
        status: '',
        triesLeft: '',
    },
};
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetState: () => initialState,
        fetchUsersRequest: (state) => { state.loading = true; state.error = null },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.users;
            state.totalPages = action.payload.totalPages;
            state.totalUsers = action.payload.totalUsers;
        },
        fetchUsersFailure: (state, action) => { state.loading = false; state.error = action.payload },
        fetchUserDetailRequest: (state) => { state.loading = true; state.error = null; state.userDetail = null },
        fetchUserDetailSuccess: (state, action) => {
            state.loading = false;
            state.userDetail = action.payload
        },
        fetchUserDetailFailure: (state, action) => { state.loading = false; state.error = action.payload },
        deleteUserRequest: (state) => { state.loading = true },
        deleteUserSuccess: (state, action) => { state.loading = false; state.list = state.list.filter(u => u._id !== action.payload) },
        deleteUserFailure: (state, action) => { state.loading = false; state.error = action.payload },
        fetchFamilyMembersRequest: (state) => { state.loading = true; state.error = null },
        fetchFamilyMembersSuccess: (state, action) => {
            state.loading = false;
            state.familyMembers = action.payload.data;
            state.total = action.payload.total;
            state.totalFamilyMembers = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.totalPages = action.payload.totalPages;
        },
        fetchFamilyMembersFailure: (state, action) => { state.loading = false; state.error = action.payload },
        fetchSingleFamilyMemberRequest: (state) => { state.loading = true; state.error = null },
        fetchSingleFamilyMemberSuccess: (state, action) => { state.loading = false; state.singleFamilyMember = action.payload },
        fetchSingleFamilyMemberFailure: (state, action) => { state.loading = false; state.error = action.payload },
        deleteFamilyMemberRequest: (state) => { state.loading = true },
        deleteFamilyMemberSuccess: (state, action) => {
            state.loading = false;
            state.familyMembers = state.familyMembers.filter(m => m._id !== action.payload);
            if (state.singleFamilyMember?._id === action.payload) state.singleFamilyMember = null;
        },
        deleteFamilyMemberFailure: (state, action) => { state.loading = false; state.error = action.payload },
        fetchScheduledCallsRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchScheduledCallsSuccess: (state, action) => {
            state.loading = false;
            state.scheduledCalls = action.payload.data;
            state.totalScheduledCalls = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.totalPages = Math.ceil(action.payload.total / action.payload.limit) || 1;
        },
        fetchScheduledCallsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateScheduledCallsSearchQuery: (state, action) => {
            state.scheduledCallsSearchQuery = {
                ...state.scheduledCallsSearchQuery,
                ...action.payload,
            };
        },
        deleteScheduledCallRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteScheduledCallSuccess: (state, action) => {
            state.loading = false;
            state.scheduledCalls = state.scheduledCalls.filter(call => call._id !== action.payload);
            state.totalScheduledCalls -= 1;
        },
        deleteScheduledCallFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const {
    resetState,
    fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure,
    fetchUserDetailRequest, fetchUserDetailSuccess, fetchUserDetailFailure,
    deleteUserRequest, deleteUserSuccess, deleteUserFailure,
    fetchFamilyMembersRequest, fetchFamilyMembersSuccess, fetchFamilyMembersFailure,
    fetchSingleFamilyMemberRequest, fetchSingleFamilyMemberSuccess, fetchSingleFamilyMemberFailure,
    deleteFamilyMemberRequest, deleteFamilyMemberSuccess, deleteFamilyMemberFailure,
    fetchScheduledCallsRequest,
    fetchScheduledCallsSuccess,
    fetchScheduledCallsFailure,
    updateScheduledCallsSearchQuery,
    deleteScheduledCallRequest, deleteScheduledCallSuccess, deleteScheduledCallFailure,
} = userSlice.actions;

export default userSlice.reducer;