import {React,useState,useEffect} from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import JobList from './Components/JobList';
import {useJobsContext} from '../src/Components/AppContext';
import {Route} from "react-router-dom";
import JobDescription from './Components/JobDescription';
import FilterList from './Components/FilterList';

function App() {
  
  const {params} = useJobsContext();

  return (
    <div className='App'> 
      <Header />
      <Route exact path = '/'> 
        <SearchBar />
        <FilterList />
        <JobList />
      </Route>
      <Route path = '/description' component = {JobDescription} />
    </div>
      
  );
}

export default App;
