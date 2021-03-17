import {React,useEffect, useState , useReducer} from 'react';
import axios from 'axios';
import {useJobsContext} from './AppContext';

const ACTIONS = {
  MAKE_REQUEST:'make-request',
  GET_DATA:'get-data',
  GOT_ERROR:'got-error',
}

const reducer = (state,action) =>{
  switch (action.type){
    case ACTIONS.MAKE_REQUEST:
      return {...state,loading:true , jobs:[]};
    case ACTIONS.GET_DATA:
      return { ...state, loading:false , jobs:action.payload.jobs};
    case ACTIONS.GOT_ERROR:
      return {...state,loading:false, jobs:[] , error:action.payload.error};
    default:
      return state;
  }
}


export default function useFetch(params,page) {
  
  const {currentJobs,setCurrentJobs,setPage} = useJobsContext();
  const BASE_URL = `https://jobs.github.com/positions.json?`;
  const [state,dispatch] = useReducer(reducer, {jobs: [] , loading:true});
  const {description,location,fullTime} = params;
  
  let FULL_URL=BASE_URL;
  //add description first in url 
  if((description && description.length>0)){
      FULL_URL = FULL_URL.concat(`description=${description}`);
    if(location && location.length>0){
      FULL_URL = FULL_URL.concat(`&location=${location}`);
    }
  }
  
  //add location first in url 
  if((location && location.length>0) && !description){
      FULL_URL = FULL_URL.concat(`location=${location}`)
    if(description && description.length>0){
      FULL_URL = FULL_URL.concat(`&description=${description}`)
    }
  }

  //add markdown to url 
  if(FULL_URL.length>52){
    FULL_URL = FULL_URL.concat(`&markdown=true&page=${page}`);
  }else{
    FULL_URL = FULL_URL.concat(`markdown=true&page=${page}`);
  }

  //add full time to url 
  if(typeof fullTime !== "undefined"){
    FULL_URL = FULL_URL.concat(`&full_time=${fullTime}`);
  }

  //add proxy to url 
  const urlWithProxy = `https://api.allorigins.win/get?url=${encodeURIComponent(FULL_URL)}`;

  useEffect(()=>{
    
    const source = axios.CancelToken.source();
    dispatch( {type:ACTIONS.MAKE_REQUEST} );
    axios.get(urlWithProxy,{
      cancelToken: source.token,
    }).then((res)=>{
      
      let results = JSON.parse(res.data.contents);
      //check if filters are enabled and page is 1 
      let isFiltered = ( (description && description.length>0)||(location && location.length>0) ) && page===1 ;
      if(isFiltered){
        setCurrentJobs([]);
        setCurrentJobs([results]);
      }else{
        if(FULL_URL.length===59){
          //always enters here  
          if(results.length !== 0 ){
            setCurrentJobs([results]);
          }
        }else{
          setCurrentJobs([...currentJobs,results]);
        }
      }
      dispatch({type:ACTIONS.GET_DATA , payload:{jobs: results} });
    
    }).catch(e=>{
      if(axios.isCancel(e)) return 
      dispatch({type:ACTIONS.GOT_ERROR ,payload:{error:e } });
    })

    // axios.interceptors.request.use(config=>{
    //   console.log(`the url is ${config.url}`);
    //   return config;
    // },error=>{
    //   return Promise.reject(error);
    // });
    
    return ()=>{
      source.cancel();
    }

  },[page,params]);

  
  
  return {state};
 

}
