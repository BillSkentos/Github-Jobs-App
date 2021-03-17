import React from 'react';
import {useJobsContext} from '../Components/AppContext';
import classNames from 'classnames';

export default function LoadMore(props) {
  
  const {page,setPage} = useJobsContext();
  
  const toNextPage = ()=>{
    setPage(prevPage=>prevPage+1);
  }

  const isButtonDisabled = props.isPageEmpty === true ? 
    "bg-red-500 hover:bg-red-400 cursor-not-allowed" 
      : 
    "bg-violet hover:bg-indigo-500";

  return (
    <div className="flex items-center justify-center">
      <button
        disabled = {props.isPageEmpty}
        onClick = {()=>toNextPage()} 
        className={classNames("text-lg text-white font-bold py-2 px-4 rounded",isButtonDisabled )}>
        Load More 
      </button>
    </div>
  )
}

