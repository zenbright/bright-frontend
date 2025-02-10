import { apiSlice } from '@/config/api/apiSlice';

export const otpApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendOTP: builder.mutation({
            query: body => ({
                url: 'auth/sendOTP', // API endpoint for signup
                method: 'POST', // HTTP method
                body, // Request body
            }),
        }),
        verifyOTP: builder.mutation({
            query: body => ({
                url: 'auth/verifyOTP', // API endpoint for signup
                method: 'POST', // HTTP method
                body, // Request body
            }),
        }),
    }),
});

export const { useSendOTPMutation, useVerifyOTPMutation } = otpApiSlice;
