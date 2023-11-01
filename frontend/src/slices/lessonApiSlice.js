import { apiSlice } from "./apiSlice";
const SUBJECT_URL = '/api/subjects'
const UPLOAD_URL = '/api/upload'

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllLessons:builder.query({
            query:()=>({
                url:SUBJECT_URL,
                method:'GET',

            }),providesTags:['Subject'],keepUnusedDataFor:5
        }),
        getLessonDetails: builder.query({
            query: ({subjectId,lessonId}) => ({
              url: `${SUBJECT_URL}/${subjectId}/lessons/${lessonId}`,
            }),
      
            keepUnusedDataFor: 5,
          }),
        createLesson: builder.mutation({
            query: (data) => ({
              url: `${SUBJECT_URL}/${data.subjectId}`,
              method: "POST",
              body:data,
            }),
            invalidatesTags: ["Subject"], //stop being cached and get fresh data
          }),
          updateLesson: builder.mutation({
            query: (data) => ({
              url: `${SUBJECT_URL}/${data.subjectId}/lessons/${data.lessonId}`,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["Subject"],
          }),
        uploadLessonImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}/lesson`,
              method: "POST",
              body: data,
            }),
          }),
          deleteLesson:builder.mutation({
            query:({subjectId,lessonId})=>({
              url:`${SUBJECT_URL}/${subjectId}/lessons/${lessonId}`,
              method:'DELETE',
      
            })
          }),
          readLesson: builder.mutation({
            query: ({subjectId,lessonId}) => ({
              url: `${SUBJECT_URL}/${subjectId}/lessons/${lessonId}/read`,
              method: 'PUT',
            }),
          }),
          getLessonProgress:builder.query({
            query:({subjectId,lessonId})=>({
              url: `${SUBJECT_URL}/${subjectId}/lessons/${lessonId}/read`,
              method:'GET'
            })
          })
    })
})

export const {useGetAllLessonsQuery,useUploadLessonImageMutation,useCreateLessonMutation,useUpdateLessonMutation,
useGetLessonDetailsQuery,useDeleteLessonMutation,useReadLessonMutation} = lessonApiSlice