import {React,useState,useEffect,useRef} from 'react';
import {useJobsContext} from '../Components/AppContext';
import {getRandomColor,formatDate} from './colorAndDate';
import classNames from 'classnames';
import marked from 'marked';
import JobSkeleton from '../Components/SkeletonElems/JobSkeleton';

export default function JobDescription() {
   
  const {jobViewed} = useJobsContext();
  const [showSkel , setShowSkel] = useState(true); //show loading skeleton effect
  
  const applyRef = useRef();
  
  const scrollToApply = ()=>{
    applyRef.current.scrollIntoView({
      behavior:'smooth',
    });
  }

  const goToCompanySite = ()=>{
    window.open(jobViewed.company_url);
  }

  //show skeleton element for 2.5 sec 
  useEffect(()=>{
    setTimeout(()=>{
      setShowSkel(false);
    },2500);
  },[]);

  return (

   <div className="flex  justify-center w-full mx-auto">
     {showSkel === true &&  
       <div className="flex items-center relative w-full justify-center mt-4 ">
          <JobSkeleton />
       </div>  
     }
     {Object.keys(jobViewed).length === 0  && <p className="text-black">Error 404 </p>}
     {
      ( Object.keys(jobViewed).length !== 0 &&  showSkel===false)
          && 
      <div className="flex flex-col h-35 sm:w-3/4    lg:w-1/2 absolute top-28 space-y-8">
       {/* {job company} */}
       <div className="flex flex-row bg-white rounded-md">
          <div className={classNames(' rounded-tl-md text-6xl rounded-bl-md font-semibold h-full w-40 text-white grid place-items-center',getRandomColor(jobViewed.company))}>
              {jobViewed.company[0]}
          </div>
          <div className="h-30 w-full h-auto text-lg space-y-4  flex xl:flex-row sm:flex-col p-8 items-center justify-between ">
             <div className="flex flex-col items-center space-y-2">
               <h2 className="font-semibold text-2xl text-black">{jobViewed.company}</h2>
               <p className="text-grey">{jobViewed.company_url}</p>
             </div>
             <div className="flex items-center">
               <button
                onClick = {()=> goToCompanySite()} 
                className="bg-gray-200 hover:bg-gray-300 text-base text-violet font-bold py-2 px-4 rounded-sm shadow">
                Company Site
               </button>
             </div>
          </div>
       </div>
      
       {/* {job requirements} */}
       <div className="rounded-md bg-white flex flex-col  justify-between w-full px-6 py-10 ">
         <div className="flex flex-row justify-between items-center">
           {/* {job info} */}
           <div className="flex flex-col place-items-start text-dark-grey">
             <div className="flex flex-row justify-between items-center space-x-4"> 
               <p className="text-lg"> {formatDate(new Date(jobViewed.created_at))} </p>
               <div className="flex  flex-row  items-center">
                 <p className="text-4xl mb-1">·</p>
                 <p className="ml-3 text-lg">{jobViewed.type}</p>
               </div>
             </div>
             <div className="">
               <h2 className="text-black font-bold leading-6 text-xl">{jobViewed.title}</h2>
             </div>
             <div className="">
               <p className="mt-2 text-sm font-bold text-violet leading-1">{jobViewed.location}</p>
             </div>
           </div>
             {/* {apply button} */}
           <div className="flex flex-col items-center justify-end">
             <button 
             onClick = {()=> scrollToApply()}
               className="mt-10 h-15 text-white bg-violet text-base rounded-button font-bold hover:bg-light-violet p-4 w-35" >
               Apply Now 
             </button>
           </div>
         </div>
         <div className="mt-8">
           <article className="text-base font-normal leading-7 markDownArticle description font-brand text-dark-grey dark:text-grey"
           dangerouslySetInnerHTML={{
               __html: marked(jobViewed.description) || '',
             }} />
            
         </div>
 
       </div>
      
       {/* {how to apply } */}
       <div ref= {applyRef} id = "how-to-apply" className= "h-35 px-28 pt-10 pl-12  mb-24 md:mb-16 mt-8  text-white rounded-md pb-28 font-brand   bg-violet space-y-4">
         <h2 className="font-bold text-xl"> How to Apply</h2>
         <div>
           <article
             id ="jobRequirements"
             className='mt-6  text-base font-normal leading-7 markDownArticle text-white how-to-apply font-brand'
             dangerouslySetInnerHTML={{
               __html: marked(jobViewed.how_to_apply) || '',
             }}
           />
         </div>
       </div>
        <br/> <br/>
      </div>
    }
    
  </div> 

  );
}
