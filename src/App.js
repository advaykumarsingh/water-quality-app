import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import { Chart } from 'react-google-charts';

import './App.css';
import TableComponent from './TableComponent';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';


function App() {

  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('waterqualitydata.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="App">
        <h1>Table Example</h1>
        {
       data && data.length
     }
     {/* <TableComponent data={data} /> */}
      <LineChart data={data} />
      <BarChart data={data} />
      <PieChart data={data} />
    </div>
  );


}

export default App;
