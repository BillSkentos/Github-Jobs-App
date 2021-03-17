import {React,useState} from 'react';
import {useJobsContext} from '../Components/AppContext';
 
export default function SearchBar() {

  const {params,setParams,locationRef,textRef,fullTimeRef,setPage} = useJobsContext();

  const SearchWithFilters = ()=>{
    
    const checkIfUndefinedFilters = 
      ( textRef.current.value.length === 0 ) 
        && 
      ( locationRef.current.value.length === 0 )
        &&
      (fullTimeRef.current.checked === false);
    
      if(checkIfUndefinedFilters === false){
        let filters = {
          description:typeof textRef.current.value !== "undefined" ? textRef.current.value.trim() : null,
          location:typeof locationRef.current.value !== "undefined" ? locationRef.current.value.trim() : null,
          fullTime:fullTimeRef.current.checked  ,
        }
      
      setPage(1);
      setParams(filters);
    }else{
      setPage(1);
      setParams({});
      console.log('you have undefined all params');
    }  
    
  }

  return (
    <div className="flex items-center bg-white dark:bg-very-dark-blue transform -translate-y-1/2 translate-x-44 h-20 w-3/4 rounded-md shadow  relative container ">
      <div className="flex-1 flex justify-start items-center space-x-2 border-r-2 h-full  border-gray-300 p-4 ">
        <div>
          <svg className="w-6 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <input ref= {textRef} className="outline-none" type = "text" placeholder="Filter by text..."/>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-start space-x-2 border-r-2 border-gray-300   h-full  p-4 ">
        <div>
          <svg className="w-6 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <input ref = {locationRef}  className="outline-none placeholder-white::placeholder	" type = "text" placeholder="Filter by location..."/>
        </div>
      </div>
      <div className="flex flex-1 justify-between items-center h-full  p-4">
       <div className="flex items-center justify-start space-x-2">
        <input ref = {fullTimeRef} type = "checkbox"  className="outline-none w-8 h-6  border-0  cursor-pointer" />
        <p className="text-lg font-bold dark:text-white">Full Time Only </p>
       </div>
       <div className = "mr-4">
        <button onClick={()=>SearchWithFilters()} className="bg-violet hover:bg-violet outline-none rounded text-white p-2 pl-4 pr-4">
          <p className="font-semibold text-sm">Search</p>
        </button>
       </div>
      </div>

    </div>
    
  )
}
