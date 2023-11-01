import { apiSlice } from "./apiSlice";
const QUIZ_URL = '/api/quizzes'

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllQuiz:builder.query({
            query:()=>({
                url:QUIZ_URL,
                method:'GET',

            }),providesTags:['Quiz'],keepUnusedDataFor:5
        }),
        createQuiz: builder.mutation({
            query: (data) => ({
              url: QUIZ_URL,
              method: "POST",
              body:data,
            }),
            invalidatesTags: ["Quiz"], //stop being cached and get fresh data
          }),
        deleteQuiz:builder.mutation({
            query:(quizId)=>({
                url:`${QUIZ_URL}/${quizId}`,
                method:'DELETE'
            })
        }),
        updateQuiz:builder.mutation({
            query:(data)=>({
                url:`${QUIZ_URL}/${data.quizId}`,
                method:'PUT',
                body:data,
            }),invalidatesTags:['Quiz']
        }),
        getQuizById:builder.query({
            query:(quizId)=>({
                url:`${QUIZ_URL}/${quizId}`,
            }),keepUnusedDataFor:5
        }),
        updateQuizResult:builder.mutation({
            query:(data)=>({
                url:`${QUIZ_URL}/${data.quizId}/result`,
                method:'PUT',
                body:data,
            }),invalidatesTags:['Quiz']
        }),
        getQuizResult:builder.query({
            query:(quizId)=>({
              url:`${QUIZ_URL}/${quizId}/result`,
              method:'GET'
            }),keepUnusedDataFor: 5,
          }),
        getQuizByCreator:builder.query({
            query:(userId)=>({
              url:`${QUIZ_URL}/creator/${userId}`,
              method:'GET'
            }),keepUnusedDataFor: 5,
          }),
          getQuizProgress:builder.query({
            query:(userId)=>({
              url: `${QUIZ_URL}/${userId}/progress`,
              method:'GET'
            })
          }),
          getQuizHistoryByUser:builder.query({
            query:(guizId)=>({
              url: `${QUIZ_URL}/${guizId}/hostory`,
              method:'GET'
            })
          })
    })
})

export const {useGetAllQuizQuery,useCreateQuizMutation,useDeleteQuizMutation,useUpdateQuizMutation,useGetQuizByIdQuery,useUpdateQuizResultMutation,
useGetQuizResultQuery,useGetQuizByCreatorQuery,useGetQuizProgressQuery,useGetQuizHistoryByUserQuery} = quizApiSlice