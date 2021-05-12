import axios from "axios";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {useMemo} from "react";

export const api = axios.create({
    baseURL: "https://crimespy.herokuapp.com"
    // headers: {
    //     Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2NTc0NzIwLCJleHAiOjE2MTkxNjY3MjB9.R2CiSnJnOE2SMLQUnRHyXE-FBjZMRj8_eWCCKPdzpfY",
    // },
});

const queryClient = new QueryClient();

export const useModifiedQuery = (queryKey, queryFn, options = {}) => {
    const query = useQuery(queryKey, queryFn, {
        retry: false,
        ...options
    });

    const isLoading = useMemo(() => query.isLoading || (! query.isFetched && query.data), [query.data, query.isFetched, query.isLoading,]);

    const data = useMemo(() => ({
        ... query,
        isLoading
    }), [isLoading, query]);

    return data;
};

export const QueryProvider = (props) => {
    return <QueryClientProvider client={queryClient}>
        {
        props.children
    }</QueryClientProvider>;
};

export const generateErrorMessage = (err) => {
    let message,
        error = err ?. response ?. status;

    switch (error) {
        case 500: message = "Category already exists";
            break;
        case 405: message = "Method not allowed";
            break;
        default: message = err.message;
            break;
    }

    return message;
};

export default api;
