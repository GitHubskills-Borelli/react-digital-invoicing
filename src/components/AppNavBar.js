import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomersContext } from "../context/context";


function AppNavBar(props){
    const [state]= useContext(CustomersContext);

    const [currentAction, setCurrentAction]= useState("");
    const location= useLocation();
    useEffect(
        ()=> {
            const path= location.pathname;
            setCurrentAction(path);
        }
        );
        
    const [actions, setActions]= useState(
            [
                {title: "List", icon: "card-list", route: "/customersList"},
                {title: "Add", icon: "database-add", route: "/createCustomer"}
            ]
            );
            
            
            
    function ListMenu({item}){
        const [buttonClick, setButtonClick]= useState(false)
                
        function handleButtonClick(){
            setButtonClick(!buttonClick);
        }
        return(
            <div className="p-2 m-1">
                <ul className="list-unstyled ps-0">
                                
                    <li className="mb-1">
                        <button 
                            onClick={handleButtonClick}
                            className={
                                buttonClick
                                ?"btn btn-primary"
                                :"btn btn-outline-primary collapsed"
                            }
                        >{item}</button>
                        <div
                            className={
                                buttonClick
                                ?"collapse show"
                                :"collapse"
                            }
                            id="customers-collapse"
                        >
                            <ul className="mx-auto list-unstyled">
                                {

                                    actions.map((action, index )=>(
                                        <li key={index}>
                                                <Link to={action.route}
                                                    onClick={
                                                        ()=> {
                                                            setCurrentAction(action.route);
                                                            console.log(currentAction);
                                                        }
                                                    }
                                                    className={currentAction.toLowerCase() == action.route.toLowerCase() ? "btn btn-success ms-1" : "btn btn-outline-success ms-1"}
                                                >
                                                    {action.title}    
                                                    <i className={`bi bi-${action.icon}`}></i>
                                                </Link>
                                        </li>
                                    )) 
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    return(
        <div className="d-flex justify-content-md-start m-2 p-2 border border-info">
            <ListMenu item={"Customers"}/>
{/*             <ListMenu item={"Invoices"}/>
            <ListMenu item={"Payment Info"}/>
            <ListMenu item={"Address"}/> */}
        </div>
    );
}

export default AppNavBar;