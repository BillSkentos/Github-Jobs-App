import {React , useState, useEffect} from 'react';
import useFetch from './useFetch';
import Job from './Job';
import {useJobsContext} from './AppContext';
import LoadMore from '../Components/LoadMore';
import JobSkeleton from '../Components/SkeletonElems/JobSkeleton';

export default function JobList() {
  
  const {page,params,currentJobs} = useJobsContext();
  const {state:{loading ,error , jobs}} = useFetch(params,page);
  
  const [isLoading,setIsLoading]  = useState(false);

  useEffect(()=>{  //add delay on skeleton load 
 
    if(loading){
      setIsLoading(true);
    }
    
    if(!loading){
      setTimeout(()=>{
        setIsLoading(false);
      },2500)
    }

  },[loading]);

  const emptyPage = jobs.length === 0 ? true:false; //check if jobs returned are 0 

  return (
    <div className="container  mx-auto  px-4 md:px-12">
      <div className="flex items-center flex-wrap -mx-1 lg:-mx-4 ">
      
        { error && <h1>Error has occured .</h1>}
        
        { (typeof currentJobs !=="undefined") && !isLoading  && 
            currentJobs.flat().map((job)=>{
              return <Job key = {job.id} job={job} />
            })
        }

        {

         isLoading
          &&  
          <>
           <JobSkeleton />
           <JobSkeleton />
           <JobSkeleton />
           <JobSkeleton />
           <JobSkeleton />
           <JobSkeleton />
           <JobSkeleton />
          </>

        }
        
      </div>

      { (!isLoading && !error)  && <LoadMore isPageEmpty = {emptyPage} /> }

    </div>  
  );
  
}
