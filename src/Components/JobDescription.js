import {React,useState,useEffect,useRef} from 'react';
import {getRandomColor,formatDate} from './colorAndDate';
import classNames from 'classnames';
import marked from 'marked';
import JobSkeleton from '../Components/SkeletonElems/JobSkeleton';

export default function JobDescription() {
   
  const jobViewed = JSON.parse(localStorage.getItem("jobViewed"));
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
 
  <>

  <div className="flex flex-col space-y-4 bg-white items-center justify-center dark:bg-very-dark-blue w-11/12 mx-auto 
    transform  -translate-y-6 rounded-md min-h-52 min-w-183 md:hidden">

    <div className={classNames('text-white text-base font-bold grid mx-auto h-12 w-12 rounded-2xl grid font-brand place-items-center p-2 transform -translate-y-1/2 ',getRandomColor(jobViewed.company))}>
      {jobViewed.company[0]}
    </div>

    <div className='px-6 text-center py-4'>
      <div className="-mt-4">
        <h2 className="text-xl font-bold leading-6 text-very-dark-blue  dark:text-white font-brand">{jobViewed.company}</h2>
        <p className="text-dark-grey mt-3 text-base leading-button font-brand">{jobViewed.company_url}</p>
      </div>
      <button className="mt-6 font-brand text-base font-bold leading-button h-12 bg-violet hover:bg-light-violet rounded-button text-violet dark:text-white dark:bg-white dark:bg-opacity-10 bg-opacity-10 hover:bg-opacity-35 w-35">
        Company Site 
      </button>
      
    </div> 
  </div> 

  <div className="hidden md:flex overflow-hidden bg-white transform -translate-y-12 rounded-md mx-auto w-11/12 dark:bg-very-dark-blue  min-h-35 max-w-183  ">
     <div className={classNames('grid place-items-center text-white flex-1' ,getRandomColor(jobViewed.company))}>
      <p className="text-6xl font-brand">{jobViewed.company[0]}</p> 
     </div>
     <div className="flex flex-4 items center space-x-12 justify-between px-10 py-10.5 font-brand ">
      <div className="flex flex-col space-y-2">
        <h2 className="font-bold text-2xl leading-7 dark:text-white "> {jobViewed.company}</h2>
        <p className="text-dark-grey">{jobViewed.company_url}</p>
      </div>
      <div className="grid place-items-center">
        <button
          onClick = {()=> goToCompanySite()}  
          className="font-brand text-base font-bold leading-button h-12 bg-violet hover:bg-light-violet rounded-button text-violet dark:text-white dark:bg-white dark:bg-opacity-10 bg-opacity-10 hover:bg-opacity-35 w-35">
          Company Site 
        </button>
      </div>
    </div>
  </div>

  <div className="mx-auto bg-white dark:bg-very-dark-blue rounded-md w-11/12 
     max-w-183  overflow-hidden px-6 py-10"> 
    
        {/* info before description   */}
    <div className=" flex md:flex-row flex-col md:items-center md:justify-between">
        {/* first div of row  */}
      <div className="flex flex-col ">
        <div className="text-dark-grey">
          <div className="flex flex-row items-center">
            <p className="text-base">{formatDate(new Date(jobViewed.created_at))}</p>
            <div className="flex items-center ml-5 ">
              <p className="text-4xl mb-1">·</p>
              <p className="ml-3 text-lg">{jobViewed.type}</p>
            </div>
          </div>
        </div>
        <h2 className="mt-2 text-xl font-bold leading-6 font-brand text-very-dark-blue dark:text-white">{jobViewed.title}</h2>
        <p className="text-violet font-bold mt-2 leading-1 text-base">{jobViewed.location}</p>
      </div>
        {/* second  div of row  */}
      <div>
        <button
          onClick = {()=> scrollToApply()} 
          className="w-full mx-auto mt-8 md:w-35 font-brand text-base font-bold leading-button h-12 bg-violet hover:bg-light-violet rounded-button text-white ">
          Apply Now
        </button>
      </div> 
    </div>
        {/* job details  */}
    <div className="mt-8">
      <article className="text-base font-normal leading-7 dark:darkArticle markDownArticle description font-brand text-dark-grey dark:text-grey"
      dangerouslySetInnerHTML={{
          __html: marked(jobViewed.description) || '',
        }} />
    </div>
   
  </div>
  <br/>
    {/* {how to apply } */}
  <div ref= {applyRef} className="w-full grid place-items-center mx-auto overflow-x-hidden">
    <div  id = "how-to-apply" className="bg-violet rounded-md w-11/12 max-w-183 px-4 py-10">
    <h2 className="font-bold text-xl text-white"> How to Apply</h2>
         <div>
           <article
             id ="jobRequirements"
             className='mt-6 break-all text-base font-normal leading-7 markDownArticle text-white how-to-apply font-brand'
             dangerouslySetInnerHTML={{
               __html: marked(jobViewed.how_to_apply) || '',
             }}
           />
         </div>
    </div>
  </div>   
   <br/> <br/>

  </>
  );
}
