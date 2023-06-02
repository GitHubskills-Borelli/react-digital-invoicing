import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import { useEffect, useState } from 'react';
function App() {
  const[currentRoute, setCurrentRoute]= useState();

  useEffect(()=>{
    const path= window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  },[])

  return (
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
      </ul>
    </nav>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/customerList' element={<CustomerList/>}></Route>
        <Route path='/'></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
