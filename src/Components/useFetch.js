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
  

  let queryString = Object.keys(params).map(p=>`${(p)}` + `=` + `${params[p]}`).join("&");

  let FULL_URL = BASE_URL + queryString;


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
        let areParamsEmpty = Object.keys(params).length===0; //if no params added
        if(areParamsEmpty){    
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
