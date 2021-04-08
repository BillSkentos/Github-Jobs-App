import {React,useState,useRef,useContext,createContext} from 'react';


const JobAppContext = createContext(); //create app context 

export default function AppProvider(props) {

  const [darkMode , setDarkMode] = useState(() => JSON.parse(localStorage.getItem("isDark")) ?? false);//theme state 
  const [currentJobs,setCurrentJobs] = useState([]); //current jobs 
  const [params,setParams] = useState({}); // filters
  const [page,setPage] = useState(1); //current page  
  const locationRef= useRef(); //location filter input ref 
  const textRef = useRef(); //text filter input ref
  const fullTimeRef = useRef(); //full time checkbox ref


  const contextValues = {
    currentJobs,
    setCurrentJobs,
    page,
    setPage,
    params,
    setParams,
    darkMode,
    setDarkMode,
    locationRef,
    textRef,
    fullTimeRef,
  }

  return (
    <JobAppContext.Provider value = {contextValues}>
      {props.children}
    </JobAppContext.Provider>
  );

}

export const useJobsContext = ()=>{  //hook to access context variables 
  return useContext(JobAppContext);
}