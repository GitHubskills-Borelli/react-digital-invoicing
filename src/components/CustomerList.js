import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, checkCustomer, deleteCustomer, getCustomerList } from '../app/app';
import { useNavigate } from 'react-router-dom';

export default function CustomerList() {
    const navigate= useNavigate();
    const [query, setQuery]= useState("");
    const [customersState, setCustomersState]= useContext(AppContext)
    useEffect(()=>{
        handleGetCustomerList( 
            customersState.keyword,
            customersState.currentPage,
            customersState.pageSize);
    }, []);

    const handleGetCustomerList=(keyword, page, size)=>{
        getCustomerList(keyword, page, size)
        .then(
            (resp)=>{
                const totalElements= resp.headers["x-total-count"];
                let totalPages= Math.floor(totalElements/size);
                if(totalElements % size != 0) ++totalPages;
                setCustomersState({
                    ...customersState,
                    customers:resp.data,
                    keyword:keyword,
                    currentPage:page,
                    pageSize: size,
                    totalPages: totalPages
                }
                );
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

    const handleDeleteCustomer= (customer)=>{
        deleteCustomer(customer).then(
            (resp)=> {
                const newCustomerList= customersState.customers.filter(cust => cust.id != customer.id);
                setCustomersState({...customersState, customers:newCustomerList});
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

    const handleCheckCustomer= (customer)=>{
        checkCustomer(customer).then(
            (resp)=>{
                const newCustomerList= customersState.customers.map(
                    (cust)=> {
                        if(cust.id == customer.id){
                            cust.checked= !cust.checked;
                        } return cust;
                    } 
                );
                setCustomersState({...customersState, customers:newCustomerList});
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

    const handleGotoPage= (page)=> (
        handleGetCustomerList(
            customersState.keyword, 
            page, 
            customersState.pageSize)
    );

    const handleSearch= (event)=> {
        event.preventDefault();
        handleGetCustomerList(query, 1, customersState.pageSize);
    };

  return (
    <div className='p-1 m-1'>
        <div className='row'>
            <div className='col-md-6'>
            <div className='card m-2'>
                <div className='card-body'>
                    <form onSubmit={handleSearch}>
                        <div className='row g-2'>
                            <div className='col-auto'>
                                <input 
                                onChange={(e)=> setQuery(e.target.value)}
                                value={query}
                                className='form-control'></input>
                            </div>
                            <div className='col-auto'>
                                <button className='btn btn-success'>
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                <div className='card'>
                    <div className='card-body'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>checked</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customersState.customers.map(
                                        (customer) => (
                                            <tr key={customer.id}>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone}</td>
                                                <td>{customer.address}</td>
                                                <td>
                                                    <button onClick={()=>handleCheckCustomer(customer)} className='btn btn-outline-success'>
                                                        <FontAwesomeIcon 
                                                            icon={
                                                                customer.checked
                                                                ?faCheckCircle
                                                                :faCircle
                                                            }>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={()=>handleDeleteCustomer(customer)} className='btn btn-outline-danger'>
                                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button 
                                                    onClick={()=> navigate(`/updateCustomer/${customer.id}`)}
                                                    className='btn btn-outline-success'>
                                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        )                                         
                                    )
                                }
                            </tbody>
                        </table>
                        <ul className='nav nav-pills'>
                            {
                                new Array(customersState.totalPages).fill(0).map(
                                    (v,index)=> (
                                        <li key={index+1}>
                                        <button
                                            onClick={(()=> handleGotoPage(index+1))}
                                            className={
                                                index +1 == customersState.currentPage
                                                ? "btn btn-info ms-1"
                                                : "btn btn-outline-info ms-1"
                                            }>
                                                {index +1}
                                        </button>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
