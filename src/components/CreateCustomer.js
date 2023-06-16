import React, { useState } from 'react'
import {createCustomer} from '../api/api'

export default function CreateCustomer() {
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [Phone, setPhone]= useState("");
  const [address, setAddress]= useState("");
  const [checked, setChecked]= useState(false);

  const handleCreateCustomer= (event)=> {
    event.preventDefault();
    let customer= { name, email, Phone,address, checked};
    createCustomer(customer).then(
      (resp)=> {alert(JSON.stringify(resp.data));}
    );
  }

  return (
    <div className='row p-0'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleCreateCustomer}>
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
