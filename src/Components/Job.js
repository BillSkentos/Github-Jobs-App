import React from 'react';
import {getRandomColor,formatDate} from './colorAndDate';
import classNames from 'classnames';
import {useHistory} from 'react-router-dom';
import {useJobsContext} from '../Components/AppContext';

export default function Job({job}) {
  
  const {setJobViewed} = useJobsContext();
  const history = useHistory();
  

  const goToJobDescription = ({job})=>{
    setJobViewed(job);
    history.push(`/description`);
  }

  return (
    <div className="my-1 px-1 w-full  md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 p-2 mt-4">
      <div className={classNames('text-white font-brand font-bold text-lg absolute grid w-12 h-12 p-2 transform -translate-y-1/2 translate-x-1/2  place-items-center rounded-2xl', getRandomColor(job.company)) } >
        {job.company[0]}
      </div>
      <article className="overflow-hidden rounded-lg shadow-lg h-56 lg:w-full md:w-80  bg-white dark:bg-very-dark-blue">
        <div onClick={()=>goToJobDescription({job})}  className="p-2 float-right flex items-center space-x-4 justify-end text-violet cursor-pointer  w-auto  hover:bg-gray-200">
            <div>
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
                  <span  className=" text-sm  font-semibold tracking-wider uppercase ">
                    View Details
                  </span>  
            </div>
        </div> <br/>
        <div className="flex justify-start flex-col mt-6 space-y-3 pl-2">
          <div className="flex flex-row text-lg items-center space-x-8 justify-start ml-6 text-dark-grey">
            <div><span> {formatDate (new Date(job.created_at))} </span> </div>
            <div className="space-x-2">
              <span>&#8226;</span> 
              <span>{job.type} </span> 
            </div>
          </div>
          <div>
            <h2 className="text-lg pr-4 font-bold leading-6 font-brand text-very-dark-blue dark:text-white ml-6">{job.title}</h2>
          </div>
            <div className="flex items-center">
              <span className=" ml-6 text-sm text-dark-grey ">{job.company}</span>
            </div> 
          <div>
            <span className="ml-6  text-violet font-semibold">{job.location}</span>
          </div>
        </div>
      </article>
          
    </div>
  )
}
