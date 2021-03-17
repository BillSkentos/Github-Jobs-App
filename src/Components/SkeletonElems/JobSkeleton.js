import React from 'react';


export default function JobSkeleton() {
  return (
    <div className="animate-pulse my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 p-2">
    <div className="text-white font-brand font-bold text-xl absolute grid w-12 h-12 p-2 transform -translate-y-1/2 translate-x-1/2 place-items-center rounded-2xl bg-grey" /> 
    <article className=" h-56 overflow-hidden rounded-lg shadow-lg h-56 bg-white">
      <br/>
      <div className="flex justify-start flex-col mt-6 space-y-3 pl-2 ">
         <div className="bg-grey rounded w-44 h-4" />  
         <div className="bg-grey rounded w-64 h-4 " />
         <div className="bg-grey rounded w-36 h-4 " />
         <br/>
         <div className="bg-grey rounded w-24 h-4 " />

      </div>
    </article>
    </div>
  )
}
