import axios from "axios";

export const customersApi= axios.create(
    {
        baseURL: "http://localhost:8090/api",
    }
);

export const getCustomerList= ()=>{
    return customersApi.get(`/customer/lists`);
};

export const deleteCustomer= (customer)=> {
    return customersApi.delete(`/customer/delete/${customer.custId}`);
};

export const getCustomer= (id)=> {
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