import { apiSlice } from "./apiSlice";
const SUBJECT_URL = '/api/subjects'
const UPLOAD_URL = '/api/upload'

export const subjectApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllSubjects:builder.query({
            query:(keyword)=>({
                url:SUBJECT_URL,
                method:'GET',
                params:keyword,

            }),providesTags:['Subject'],keepUnusedDataFor:5
        }),
        getSubjectDetails: builder.query({
            query: (subjectId) => ({
              url: `${SUBJECT_URL}/${subjectId}`,
            }),
            keepUnusedDataFor: 5,
          }),
        createSubject: builder.mutation({
            query: (data) => ({
              url: SUBJECT_URL,
              method: "POST",
              body:data,
            }),
            invalidatesTags: ["Subject"], //stop being cached and get fresh data
          }),
          updateSubject: builder.mutation({
            query: (data) => ({
              url: `${SUBJECT_URL}/${data.id}`,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Subject"],
          }),
        uploadSubjectImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}/subject`,
              method: "POST",
              body: data,
            }),
          }),
          deleteSubject:builder.mutation({
            query:(subjectId)=>({
              url:`${SUBJECT_URL}/${subjectId}`,
              method:'DELETE',
      
            })
          }),
          getSubjectByCreator:builder.query({
            query:(userId)=>({
              url:`${SUBJECT_URL}/creator/${userId}`,
              method:'GET'
            }),keepUnusedDataFor: 5,
          })
    })
})

export const {useGetAllSubjectsQuery,useUploadSubjectImageMutation,useCreateSubjectMutation,useUpdateSubjectMutation,
useGetSubjectDetailsQuery,useDeleteSubjectMutation,useGetSubjectByCreatorQuery} = subjectApiSlice