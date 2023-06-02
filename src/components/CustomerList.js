import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { checkCustomer, deleteCustomer, getCustomerList } from '../app/app';

export default function CustomerList() {
    const [customerList, setCustomerList]= useState([]);

    useEffect(()=>{
        handleGetCustomerList();
    }, []);

    const handleGetCustomerList=()=>{
        getCustomerList()
        .then(
            (resp)=>{
                setCustomerList(resp.data);
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
                const newCustomerList= customerList.filter(cust => cust.id != customer.id);
                setCustomerList(newCustomerList);
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
                const newCustomerList= customerList.map(
                    (cust)=> {
                        if(cust.id == customer.id){
                            cust.checked= !cust.checked;
                        } return cust;
                    } 
                );
                setCustomerList(newCustomerList);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

  return (
    <div className='p-1 m-1'>
        <div className='row'>
            <div className='col-md-6'>
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
                                    customerList.map(
                                        (customer) => (
                                            <tr key={customer.id}>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone}</td>
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
                                            </tr>
                                        )                                         
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
