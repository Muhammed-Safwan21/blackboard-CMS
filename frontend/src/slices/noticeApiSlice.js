import { apiSlice } from "./apiSlice";
const NOTICE_URL = '/api/notices'

export const noticeApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllNotices:builder.query({
            query:()=>({
                url:NOTICE_URL,
                method:'GET',

            }),providesTags:['Notice'],keepUnusedDataFor:5
        }),
        createNotice: builder.mutation({
            query: (data) => ({
              url: NOTICE_URL,
              method: "POST",
              body:data,
            }),
            invalidatesTags: ["Notice"],
          }),
          updateNotice: builder.mutation({
            query: (data) => ({
              url: `${NOTICE_URL}/${data.id}`,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Notice"],
          }),
          deleteNotice:builder.mutation({
            query:(noticeId)=>({
              url:`${NOTICE_URL}/${noticeId}`,
              method:'DELETE',
      
            })
          }),
    })
})

export const {useCreateNoticeMutation,useGetAllNoticesQuery,useDeleteNoticeMutation,useUpdateNoticeMutation} = noticeApiSlice