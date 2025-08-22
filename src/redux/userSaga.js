// import { call, put, takeLatest, select } from "redux-saga/effects";
// import axios from "axios";
// import { decodeJWT } from "../utils/auth";
// import {
//   fetchUsersRequest,
//   fetchUsersSuccess,
//   fetchUsersFailure,
//   fetchUserDetailRequest,
//   fetchUserDetailSuccess,
//   fetchUserDetailFailure,
//   deleteUserRequest,
//   deleteUserSuccess,
//   deleteUserFailure,
//   fetchFamilyMembersRequest,
//   fetchFamilyMembersSuccess,
//   fetchFamilyMembersFailure,
//   fetchSingleFamilyMemberRequest,
//   fetchSingleFamilyMemberSuccess,
//   fetchSingleFamilyMemberFailure,
//    deleteFamilyMemberRequest,
//   deleteFamilyMemberSuccess,
//   deleteFamilyMemberFailure,
//   // :telephone_receiver: New actions for scheduled calls
//   fetchScheduledCallsRequest,
//   fetchScheduledCallsSuccess,
//   fetchScheduledCallsFailure,
//   deleteScheduledCallRequest,
//   deleteScheduledCallSuccess,
//   deleteScheduledCallFailure,
// } from "./userSlice";
// import { getAdminToken,removeAdminToken } from "../utils/adminAuth";
// const selectToken = (state) => state.auth.token;
// // Fetch users
// function* fetchUsersSaga(action) {
//   try {
//     const token = getAdminToken();
//     if (!token) throw new Error("No authorization token found");
//     const decoded = decodeJWT(token);
//     if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
//       throw new Error("JWT expired on frontend");
//     }
//     const { page = 1, limit = 10, filters = {} } = action.payload || {};
//     const queryParams = new URLSearchParams({ page, limit });
//     // :white_check_mark: Search term ko "name" ya "email" mein se kisi ek mein append karein
//     if (filters.search && filters.search.trim() !== "") {
//         if (filters.searchType === "name") {
//             queryParams.append("name", filters.search.trim());
//         } else if (filters.searchType === "email") {
//             queryParams.append("email", filters.search.trim());
//         } else if (filters.searchType === "phoneNumber") {
//             queryParams.append("phoneNumber", filters.search.trim());
//         }
//     }
//     if (filters.isVerified) {
//       queryParams.append("isVerified", filters.isVerified);
//     }
//     if (filters.createdAtInBetweenStartDate) {
//       queryParams.append("createdAtInBetweenStartDate", filters.createdAtInBetweenStartDate);
//     }
//     if (filters.createdAtInBetweenEndDate) {
//       queryParams.append("createdAtInBetweenEndDate", filters.createdAtInBetweenEndDate);
//     }
//     // Baaki ke filters ko add karein
//     for (const key in filters) {
//       if (
//         key !== "search" &&
//         key !== "searchType" && // `searchType` ko skip karein
//         key !== "name" &&
//         key !== "email" &&
//         key !== "phoneNumber" &&
//         filters[key] !== null &&
//         filters[key] !== undefined &&
//         filters[key] !== ""
//       ) {
//         queryParams.append(key, filters[key]);
//       }
//     }
//     const response = yield call(
//       axios.get,
//       `http://localhost:5000/api/admin/users?${queryParams.toString()}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     const { users, totalPages, totalUsers } = response.data;
//     yield put(
//       fetchUsersSuccess({
//         users,
//         page,
//         limit,
//         totalPages,
//         totalUsers,
//         count: users.length,
//       })
//     );
//   } catch (error) {
//     yield put(fetchUsersFailure(error.response?.data?.message || error.message));
//   }
// }
// // Fetch Single User (when View button clicked)
// function* fetchUserDetailSaga(action) {
//   try {
//     const token = getAdminToken(); // :white_check_mark: read token from localStorage
//     if (!token) throw new Error("No authorization token found");
//     const response = yield call(
//       axios.get,
//       `http://localhost:5000/api/admin/user/${action.payload}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     yield put(fetchUserDetailSuccess(response.data.data.user));
//   } catch (error) {
//     yield put(fetchUserDetailFailure(error.response?.data?.message || error.message));
//   }
// }
// // Delete user
// // Delete user
// function* deleteUserSaga(action) {
//   try {
//     const token = getAdminToken(); // :white_check_mark: same as other sagas
//     if (!token) throw new Error("No authorization token found");
//     yield call(
//       axios.delete,
//       `http://localhost:5000/api/admin/user/${action.payload}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     yield put(deleteUserSuccess(action.payload));
//   } catch (error) {
//     yield put(deleteUserFailure(error.response?.data?.message || "Failed to delete user"));
//   }
// }
//  function* fetchFamilyMembersSaga(action) {
//   try {
//     const token = getAdminToken();
//     if (!token) throw new Error("No authorization token found");
//     const {
//       page,
//       limit,
//       name,
//       email,
//       phoneNumber,
//       isUser,
//       createdAtStartDate,
//       createdAtEndDate,
//       modifiedInBetweenStartDate,
//       modifiedInBetweenEndDate,
//       linkedToPrimaryUserName,
//     } = action.payload || {};
//     const params = new URLSearchParams();
//     if (name) params.append("name", name);
//     if (email) params.append("email", email);
//     if (phoneNumber) params.append("phoneNumber", phoneNumber);
//     if (isUser !== undefined) params.append("isUser", isUser);
//     if (createdAtStartDate) params.append("createdAtStartDate", createdAtStartDate);
//     if (createdAtEndDate) params.append("createdAtEndDate", createdAtEndDate);
//     if (modifiedInBetweenStartDate) params.append("modifiedInBetweenStartDate", modifiedInBetweenStartDate);
//     if (modifiedInBetweenEndDate) params.append("modifiedInBetweenEndDate", modifiedInBetweenEndDate);
//     if (linkedToPrimaryUserName) params.append("linkedToPrimaryUserName", linkedToPrimaryUserName);
//     if (page) params.append("page", page);
//     if (limit) params.append("limit", limit);
//     const queryString = params.toString();
//     const url = `http://localhost:5000/api/admin/familyMembers${queryString ? `?${queryString}` : ""}`;
//     const response = yield call(axios.get, url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const { data, total, page: currentPage, limit: perPage } = response.data;
//     // :zap: compute totalPages manually since backend doesn’t send it
//     const totalPages = Math.ceil(total / perPage);
//     yield put(
//       fetchFamilyMembersSuccess({
//         data,
//         total,
//         page: currentPage,
//         limit: perPage,
//         totalPages, // :point_left: add it here
//       })
//     );
//   } catch (error) {
//     yield put(fetchFamilyMembersFailure(error.response?.data?.message || error.message));
//   }
// }
// function* fetchSingleFamilyMemberSaga(action) {
//   try {
//     const { id, token } = action.payload; // :white_check_mark: Correct destructuring
//     const { data } = yield call(
//       axios.get,
//       `http://localhost:5000/api/admin/familyMember/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     yield put(fetchSingleFamilyMemberSuccess(data));
//   } catch (error) {
//     yield put(
//       fetchSingleFamilyMemberFailure(
//         error.response?.data?.message || error.message
//       )
//     );
//   }
// }
// function* deleteFamilyMemberSaga(action) {
//   try {
//     const token = getAdminToken();
//     if (!token) throw new Error("No authorization token found");
//     yield call(
//       axios.delete,
//       `http://localhost:5000/api/admin/familyMember/${action.payload}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     yield put(deleteFamilyMemberSuccess(action.payload));
//   } catch (error) {
//     yield put(
//       deleteFamilyMemberFailure(error.response?.data?.message || "Failed to delete family member")
//     );
//   }
// }
// function* fetchScheduledCallsSaga(action) {
//   console.log(":pushpin: fetchScheduledCallsSaga CALLED with payload:", action.payload);
//   try {
//     const token = getAdminToken();
//     if (!token) {
//       throw new Error("No authorization token found");
//     }
//     // :white_check_mark: Remove empty/null filters before sending to backend
//     const cleanPayload = Object.fromEntries(
//       Object.entries(action.payload || {}).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
//     );
//     const queryParams = new URLSearchParams(cleanPayload);
//     const url = `http://localhost:5000/api/admin/scheduledCalls`;
//     // API call
//     const response = yield call(axios.get, url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(":white_check_mark: RAW API Response:", response);
//     const { data = [], total = 0, page = 1, limit = 10 } = response.data;
//     // Dispatch success
//     yield put(fetchScheduledCallsSuccess({ data, total, page, limit }));
//   } catch (error) {
//     console.error(":x: Error in fetchScheduledCallsSaga:", error);
//     yield put(fetchScheduledCallsFailure(error.response?.data?.message || error.message));
//   }
// }
// function* deleteScheduledCallSaga(action) {
//   try {
//     const token = getAdminToken();
//      if (!token) throw new Error("No authorization token found");
//      yield call(
//       axios.delete,
//       `http://localhost:5000/api/admin/deleteScheduledCall/${action.payload}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     yield put(deleteScheduledCallSuccess(action.payload));
//   } catch (error) {
//     yield put(deleteScheduledCallFailure(error.response?.data?.message || error.message));
//   }
// }
// export default function* usersRootSaga() {
//   yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
//   yield takeLatest(fetchUserDetailRequest.type, fetchUserDetailSaga);
//   yield takeLatest(deleteUserRequest.type, deleteUserSaga);
//   yield takeLatest(fetchFamilyMembersRequest.type, fetchFamilyMembersSaga);
//   yield takeLatest(fetchSingleFamilyMemberRequest.type, fetchSingleFamilyMemberSaga);
//   yield takeLatest(deleteFamilyMemberRequest.type, deleteFamilyMemberSaga);
//   yield takeLatest(fetchScheduledCallsRequest.type, fetchScheduledCallsSaga);
//   yield takeLatest(deleteScheduledCallRequest.type, deleteScheduledCallSaga);
// }

import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { decodeJWT } from "../utils/auth";
import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUserDetailRequest,
    fetchUserDetailSuccess,
    fetchUserDetailFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
    fetchFamilyMembersRequest,
    fetchFamilyMembersSuccess,
    fetchFamilyMembersFailure,
    fetchSingleFamilyMemberRequest,
    fetchSingleFamilyMemberSuccess,
    fetchSingleFamilyMemberFailure,
    deleteFamilyMemberRequest,
    deleteFamilyMemberSuccess,
    deleteFamilyMemberFailure,
    fetchScheduledCallsRequest,
    fetchScheduledCallsSuccess,
    fetchScheduledCallsFailure,
    deleteScheduledCallRequest,
    deleteScheduledCallSuccess,
    deleteScheduledCallFailure,
} from "./userSlice";
import { getAdminToken, removeAdminToken } from "../utils/adminAuth";

function* fetchUsersSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        const { page = 1, limit = 10, filters = {} } = action.payload || {};
        const queryParams = new URLSearchParams({ page, limit });
        if (filters.search && filters.search.trim() !== "") {
            if (filters.searchType === "name") {
                queryParams.append("name", filters.search.trim());
            } else if (filters.searchType === "email") {
                queryParams.append("email", filters.search.trim());
            } else if (filters.searchType === "phoneNumber") {
                queryParams.append("phoneNumber", filters.search.trim());
            }
        }
        if (filters.isVerified) {
            queryParams.append("isVerified", filters.isVerified);
        }
        if (filters.createdAtInBetweenStartDate) {
            queryParams.append("createdAtInBetweenStartDate", filters.createdAtInBetweenStartDate);
        }
        if (filters.createdAtInBetweenEndDate) {
            queryParams.append("createdAtInBetweenEndDate", filters.createdAtInBetweenEndDate);
        }
        for (const key in filters) {
            if (
                key !== "search" &&
                key !== "searchType" &&
                key !== "name" &&
                key !== "email" &&
                key !== "phoneNumber" &&
                filters[key] !== null &&
                filters[key] !== undefined &&
                filters[key] !== ""
            ) {
                queryParams.append(key, filters[key]);
            }
        }
        const response = yield call(
            axios.get,
            `http://localhost:5000/api/admin/users?${queryParams.toString()}`, { headers: { Authorization: `Bearer ${token}` } }
        );
        const { users, totalPages, totalUsers } = response.data;
        yield put(
            fetchUsersSuccess({
                users,
                page,
                limit,
                totalPages,
                totalUsers,
                count: users.length,
            })
        );
    } catch (error) {
        yield put(fetchUsersFailure(error.response?.data?.message || error.message));
    }
}

function* fetchUserDetailSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        const response = yield call(
            axios.get,
            `http://localhost:5000/api/admin/user/${action.payload}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        yield put(fetchUserDetailSuccess(response.data.data.user));
    } catch (error) {
        yield put(fetchUserDetailFailure(error.response?.data?.message || error.message));
    }
}

function* deleteUserSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        yield call(
            axios.delete,
            `http://localhost:5000/api/admin/user/${action.payload}`, { headers: { Authorization: `Bearer ${token}` } }
        );
        yield put(deleteUserSuccess(action.payload));
    } catch (error) {
        yield put(deleteUserFailure(error.response?.data?.message || "Failed to delete user"));
    }
}

function* fetchFamilyMembersSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        const {
            page,
            limit,
            name,
            email,
            phoneNumber,
            isUser,
            createdAtStartDate,
            createdAtEndDate,
            modifiedInBetweenStartDate,
            modifiedInBetweenEndDate,
            linkedToPrimaryUserName,
        } = action.payload || {};
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (email) params.append("email", email);
        if (phoneNumber) params.append("phoneNumber", phoneNumber);
        if (isUser !== undefined) params.append("isUser", isUser);
        if (createdAtStartDate) params.append("createdAtStartDate", createdAtStartDate);
        if (createdAtEndDate) params.append("createdAtEndDate", createdAtEndDate);
        if (modifiedInBetweenStartDate) params.append("modifiedInBetweenStartDate", modifiedInBetweenStartDate);
        if (modifiedInBetweenEndDate) params.append("modifiedInBetweenEndDate", modifiedInBetweenEndDate);
        if (linkedToPrimaryUserName) params.append("linkedToPrimaryUserName", linkedToPrimaryUserName);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        const queryString = params.toString();
        const url = `http://localhost:5000/api/admin/familyMembers${queryString ? `?${queryString}` : ""}`;
        const response = yield call(axios.get, url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { data, total, page: currentPage, limit: perPage } = response.data;
        const totalPages = Math.ceil(total / perPage);
        yield put(
            fetchFamilyMembersSuccess({
                data,
                total,
                page: currentPage,
                limit: perPage,
                totalPages,
            })
        );
    } catch (error) {
        yield put(fetchFamilyMembersFailure(error.response?.data?.message || error.message));
    }
}

function* fetchSingleFamilyMemberSaga(action) {
    try {
        const { id, token } = action.payload;
        const { data } = yield call(
            axios.get,
            `http://localhost:5000/api/admin/familyMember/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        yield put(fetchSingleFamilyMemberSuccess(data));
    } catch (error) {
        yield put(
            fetchSingleFamilyMemberFailure(
                error.response?.data?.message || error.message
            )
        );
    }
}

function* deleteFamilyMemberSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        yield call(
            axios.delete,
            `http://localhost:5000/api/admin/familyMember/${action.payload}`, { headers: { Authorization: `Bearer ${token}` } }
        );
        yield put(deleteFamilyMemberSuccess(action.payload));
    } catch (error) {
        yield put(
            deleteFamilyMemberFailure(error.response?.data?.message || "Failed to delete family member")
        );
    }
}

function* fetchScheduledCallsSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) {
            throw new Error("No authorization token found");
        }
        const cleanPayload = Object.fromEntries(
            Object.entries(action.payload || {}).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
        );
        const url = `http://localhost:5000/api/admin/scheduledCalls`;

        const response = yield call(axios.get, url, {
            headers: { Authorization: `Bearer ${token}` },
            params: cleanPayload,
        });

        const { data = [], total = 0, page = 1, limit = 10 } = response.data;
        yield put(fetchScheduledCallsSuccess({ data, total, page, limit }));
    } catch (error) {
        yield put(fetchScheduledCallsFailure(error.response?.data?.message || error.message));
    }
}

function* deleteScheduledCallSaga(action) {
    try {
        const token = getAdminToken();
        if (!token) throw new Error("No authorization token found");
        yield call(
            axios.delete,
            `http://localhost:5000/api/admin/deleteScheduledCall/${action.payload}`, { headers: { Authorization: `Bearer ${token}` } }
        );
        yield put(deleteScheduledCallSuccess(action.payload));
    } catch (error) {
        yield put(deleteScheduledCallFailure(error.response?.data?.message || error.message));
    }
}
export default function* usersRootSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
    yield takeLatest(fetchUserDetailRequest.type, fetchUserDetailSaga);
    yield takeLatest(deleteUserRequest.type, deleteUserSaga);
    yield takeLatest(fetchFamilyMembersRequest.type, fetchFamilyMembersSaga);
    yield takeLatest(fetchSingleFamilyMemberRequest.type, fetchSingleFamilyMemberSaga);
    yield takeLatest(deleteFamilyMemberRequest.type, deleteFamilyMemberSaga);
    yield takeLatest(fetchScheduledCallsRequest.type, fetchScheduledCallsSaga);
    yield takeLatest(deleteScheduledCallRequest.type, deleteScheduledCallSaga);
}