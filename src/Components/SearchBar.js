import {React,useState , useEffect} from 'react';
import {useJobsContext} from '../Components/AppContext';
import SmallSearchBar from './SmallSearchBar'; 

export default function SearchBar() {

  const {params,setParams,locationRef,textRef,fullTimeRef,setPage} = useJobsContext();
  const [width,setWidth] = useState(window.innerWidth);

  const checkWidth = ()=>{
    setWidth(window.innerWidth);
  }


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


  useEffect(()=>{
    window.addEventListener("resize",checkWidth);
    return ()=>{
      window.removeEventListener('resize',checkWidth);
    }
  });

  return ( //return big or small searchbar based on browser width 
    <>
    {
      width >= 768 ? 

    <div className="flex items-center justify-center  w-full mx-auto">
      <div className="flex items-center bg-white dark:bg-very-dark-blue transform -translate-y-1/2  h-20 w-full mx-4 rounded-md shadow  relative container ">
        {/* search by text  */}
        <div className="flex-1 flex justify-start items-center space-x-2 border-r-2 h-full  dark:border-dark-grey border-normal-grey p-4 ">
          <div>
            <svg className="w-6 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <input ref= {textRef} className="outline-none dark:bg-very-dark-blue" type = "text" placeholder="Filter by text..."/>
          </div>
        </div>

        {/* search by location  */}

        <div className="flex flex-1 items-center justify-start space-x-2 border-r-2 dark:border-dark-grey border-normal-grey h-full  p-4 ">
          <div>
            <svg className="w-6 text-violet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <input ref = {locationRef}  className="outline-none dark:bg-very-dark-blue 	" type = "text" placeholder="Filter by location..."/>
          </div>
        </div>

        {/*  add full time and search btn   */}

        <div className="flex flex-1  justify-between items-center h-full space-x-2 p-4">
          <div className="flex items-center space-x-4">
            <input ref = {fullTimeRef} type = "checkbox"  className="outline-none w-8 h-6  border-0   transition duration-150 ease-in-out  cursor-pointer" />
            <div className="flex items-center">
              <p className="text-lg font-bold  dark:text-white font-brand ">Full Time Only </p>
            </div>
          </div>
          <div className = "mr-4">
            <button onClick={()=>SearchWithFilters()} className="bg-violet hover:bg-violet outline-none rounded text-white p-2 pl-4 pr-4 lg:w-24 lg:h-12 ">
              <p className="font-semibold text-sm">Search</p>
            </button>
          </div>
        </div>
      </div> 
    </div>

      :

    <SmallSearchBar /> 

    }
    </>    
  )
}
