import {React} from 'react';
import {useJobsContext} from '../Components/AppContext';


export default function FilterList() {
  
  const {params,setParams ,setCurrentJobs} = useJobsContext();
  
  const removeFilter = (key,value)=>{

    if(Object.keys(params).includes(key)){
      setCurrentJobs([]);
      setParams((oldstate)=>({...oldstate, [key] : key === "fullTime" ? false : '' }))
    }
   
  }  
  
  return (
    <>
      <div className="w-full flex -mt-4 flex-col sm:flex-row items-center justify-center mx-auto ">
        
        {
          params.length !== "undefined" && Object.keys(params).map((val,index)=>{
            if( params[val] !== "" && params[val] !== false){
              return (
                <span key = {index} className="flex sm:inline-flex w-auto  items-center mt-4 ml-2 px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-violet text-white ">
                    {(params[val] === true ? "Only Full Time" : params[val])}
                    
                    {/* hidden key value  */}
                    <p style = {{display:'none'}}>{val}</p>
                  <button 
                    type="button"
                    onClick = {()=>removeFilter(val , params[val])}
                    className="flex-shrink-0 mt-1 -mr-0.5 ml-1.5  inline-flex text-white focus:outline-none focus:text-white hover:text-opacity-75 focus:text-opacity-75" aria-label="Remove large badge">
                    <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"></path>
                    </svg>
                  </button>
                </span> 
              );
            }

          })
        } 
      </div>
      <br/>
    </>
  )
}
