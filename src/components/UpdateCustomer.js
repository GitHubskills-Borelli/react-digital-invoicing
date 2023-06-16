import React, { useEffect, useState } from 'react'
import { getCustomerById, updateCustomer} from '../api/api'
import { useParams } from 'react-router-dom';

export default function UpdateCustomer() {
  const {id}= useParams();
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [Phone, setPhone]= useState("");
  const [address, setAddress]= useState("");
  const [checked, setChecked]= useState(false);

  useEffect(()=> {
    handleGetCustomerById(id);
  }, []);
  
  const handleUpdateCustomer= (event)=> {
    event.preventDefault();
    let customer= {id, name, email, Phone,address, checked};
    updateCustomer(customer).then(
      (resp)=> {alert(JSON.stringify(resp.data));}
    );
  }

  const handleGetCustomerById= (id)=> {
    getCustomerById(id).then(
      (resp)=> {
        let customer= resp.data;
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.Phone);
        setAddress(customer.address);
        setChecked(customer.checked);
      }
    )
  }

  return (
    <div className='row p-0'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleUpdateCustomer}>
              <div className='mb-3'>
                <label className='form-label'>Name:</label>
                <input 
                onChange={(e)=> setName(e.target.value)}
                value={name}
                className='form-control'></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email:</label>
                <input 
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                className='form-control'></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone:</label>
                <input 
                onChange={(e)=> setPhone(e.target.value)}
                value={Phone}
                className='form-control'></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Address</label>
                <input 
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                className='form-control'></input>
              </div>
              <div className='form-check'>
                <input 
                onChange={(e)=> setChecked(e.target.value)}
                checked={checked==="on"?true:false}
                className='form-check-input' type='checkbox'></input>
                <label className='forme-check-label' htmlFor="flexCheckChecked"></label>
                Checked
              </div>
              <div className='mb-3'>
                <button className='btn btn-success'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
