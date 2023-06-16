import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CreateCustomer from './components/CreateCustomer';
import { Component, useEffect, useState } from 'react';
import UpdateCustomer from './components/UpdateCustomer';
import { CustomersContext, useCustomersState } from './context/context';
import AppNavBar from './components/AppNavBar';

function App() {
  const[currentRoute, setCurrentRoute]= useState();

  useEffect(()=>{
    const path= window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  },[])

  return (
    <CustomersContext.Provider value={useCustomersState()}>
    <BrowserRouter>
      <AppNavBar></AppNavBar>
      <Routes>
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route path={'/customersList'} element={<CustomerList></CustomerList>}></Route>
        <Route path={'/createCustomer'} element={<CreateCustomer></CreateCustomer>}></Route>
        <Route path='/updateCustomer/:id' element={<UpdateCustomer></UpdateCustomer>}></Route> 
      </Routes>
    </BrowserRouter>
    </CustomersContext.Provider>
  );
}

export default App;
