import { createContext, useState } from "react";

export const CustomersContext= createContext();

export function useCustomersState(){
    return useState({
        customers: [],
        currentPage: 1,
        pageSize: 3,
        keyword:"",
        totalPages: 0
    });
}