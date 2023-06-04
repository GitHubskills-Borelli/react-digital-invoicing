import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CreateCustomer from './components/CreateCustomer';
import { Component, useEffect, useState } from 'react';
import UpdateCustomer from './components/UpdateCustomer';
import { AppContext, useAppState } from './app/app';
function App() {
  const[currentRoute, setCurrentRoute]= useState();

  useEffect(()=>{
    const path= window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  },[])

  return (
    <AppContext.Provider value={useAppState()}>
    <BrowserRouter>
    <nav className='m-2 p-1 border border-info'>
      <ul className='nav nav-pills'>
        <li>
          <Link 
          onClick={()=> setCurrentRoute("home")}
          className={
                    currentRoute == "home"
                    ?"btn btn-info ms-1"
                    :"btn btn-outline-info ms-1"
          } to={"/home"}>Home</Link>
        </li>
        <li>
          <Link 
          onClick={()=> setCurrentRoute("customerList")}
          className={
                      currentRoute == "customerList"
                      ?"btn btn-info ms-1"
                      :"btn btn-outline-info ms-1"
          } to={"/customerList"}>Customer</Link>
        </li>
        <li>
          <Link 
          onClick={()=> setCurrentRoute("createCustomer")}
          className={
                      currentRoute == "createCustomer"
                      ?"btn btn-info ms-1"
                      :"btn btn-outline-info ms-1"
          } to={"/createCustomer"}>New Customer</Link>
        </li>
      </ul>
    </nav>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/customerList' element={<CustomerList/>}></Route>
        <Route path='/createCustomer' element={<CreateCustomer/>}></Route>
        <Route path='/updateCustomer/:id' element={<UpdateCustomer/>}></Route>
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
