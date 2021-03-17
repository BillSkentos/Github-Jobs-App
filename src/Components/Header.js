import React from 'react';
import {useJobsContext} from '../Components/AppContext';
import {useHistory} from 'react-router-dom';

export default function Header() {
  
  const history = useHistory();
  const {darkMode,setDarkMode} = useJobsContext();
  //change theme 
  const toggleTheme = ()=>{
    setDarkMode(!darkMode);
    const root = window.document.documentElement;
    root.classList.toggle('dark');
  }
  
  const returnToHome = ()=>{
    history.push('/');
  }


  return (
    <div className="flex flex-1  items-center flex-row bg-violet h-40">
      <div className="flex-auto p-5 mb-16 cursor-pointer" onClick={()=>returnToHome()}>
        <h1 className="text-white text-5xl ">DevJobs</h1>
      </div>
      <div className=" text-white flex-auto flex justify-end items-center p-5 space-x-4 mb-16">
        <span className="text-sm text-white">Light </span>
        
        <input name = "" type = "checkbox" id = "toggle" className = "hidden" />
        <label htmlFor = "toggle">
        <div onClick = {()=>toggleTheme()} className="w-9 h-5 flex items-center cursor-pointer bg-gray-300 p-1 rounded-full">
            <div className="toggle-dot w-4 h-4 rounded-full  bg-white shadow-md transform duration-300 ease-in-out"></div>
        </div>
        </label> 
        
        <span className="text-sm text-white">Dark </span>
      </div>
    </div>
  );
}
