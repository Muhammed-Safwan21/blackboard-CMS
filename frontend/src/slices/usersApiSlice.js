
import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=> ({
                url:`${USERS_URL}/login`,
                method:"POST",
                body:data,
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:"POST",
                body:data,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:"POST"
            })

        }),
        updateUserProfile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:"PUT",
                body:data,
            })
        }),
        getTeachers:builder.query({
            query:()=>({
                url:`${USERS_URL}/teachers`,
                method:'GET'
            }),providesTags:['User'], keepUnusedDataFor:5
        }),
        getStudents:builder.query({
            query:()=>({
                url:`${USERS_URL}/students`,
                method:'GET'
            }),providesTags:['User'], keepUnusedDataFor:5
        }),
        getAdmins:builder.query({
            query:()=>({
                url:`${USERS_URL}/admins`,
                method:'GET'
            }),providesTags:['User'], keepUnusedDataFor:5
        }),
        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE'
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data,
            }),invalidatesTags:['User']
        }),
        getUserDetails:builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
            }),keepUnusedDataFor:5
        }),
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation , useUpdateUserProfileMutation,
useGetTeachersQuery,useGetStudentsQuery,useDeleteUserMutation, useUpdateUserMutation ,useGetUserDetailsQuery,
useGetAdminsQuery }=usersApiSlice;