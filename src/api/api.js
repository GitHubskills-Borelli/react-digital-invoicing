import axios from "axios";


export const customersApi= axios.create(
    {
        baseURL: "http://localhost:8090",
    }
);

export const getCustomerList= (keyword="", page=1, size=3)=>{
    return customersApi.get(
        `/customers?name_like=${keyword}&_page=${page}&_limit=${size}`);
};

export const deleteCustomer= (customer)=> {
    return customersApi.delete(`/customers/${customer.id}`);
};

export const getCustomerById= (id)=> {
    return customersApi.get(`/customers/${id}`);
};

export const createCustomer= (customer)=> {
    return customersApi.post(`/customers`, customer);
};

export const checkCustomer= (customer)=> {
    return customersApi.patch(`/customers/${customer.id}`, {checked: !customer.checked});
};

export const updateCustomer= (customer)=> {
    return customersApi.put(`/customers/${customer.id}`, customer);
};

/* export const AppContext= createContext();
export const useAppState= ()=> {
    const initialState={
        customers: [],
        currentPage: 1,
        pageSize: 3,
        keyword:"",
        totalPages: 0
    };
    const appState= useState(initialState);
    return appState;
} */