import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getToken} from "../../user";

interface Employee {
    first_name: string
    last_name: string
    id: number
}

export const employeesAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://use-my-time-demo.herokuapp.com/',
        prepareHeaders: (headers) => {
            const token = getToken()
            headers.set('Authorization', `Token ${token}`)
            return headers
        }
    }),
    tagTypes: ['employees'],
    reducerPath: 'employees',
    endpoints: build => ({
        sendMessageToDevs: build.mutation<void, string>(({
            query: message => ({
                url: 'email/send_email_to_developers/',
                method: "POST",
                body: {
                    message
                }
            })
        })),
        getEmployees: build.query<Employee[], void>(({
            query: () => `auth/users/`,
            providesTags:['employees']
        })),
        makeUserAdmin: build.mutation<void, number>(({
            query: id => ({
                url: `user/make_user_admin/${id}/`,
                method: 'PATCH'
            }),
            invalidatesTags: ['employees']
        }))

    })
})


export const {
    useSendMessageToDevsMutation,
    useGetEmployeesQuery,
    useMakeUserAdminMutation
} = employeesAPI