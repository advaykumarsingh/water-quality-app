import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import NavigationBar from './NavigationBar';
import { StreetProvider, StreetSelector } from './components/StreetSelector';
import { MultiStreetProvider, MultiStreetSelector } from './components/MultiStreetSelector';
import { useLoading } from './context/LoadingContext';
import { streetNames } from './data/streetData';
import StreetDataConsumer from './components/StreetDataConsumer'; // Consumer component
import Home from './components/Home';
import About from './components/About';
const streets = streetNames;

function App() {
  const { showLoading, hideLoading } = useLoading();
  const [data, setData] = useState([]);

  const getData = async () => {
    showLoading(); // Show global spinner
    try {
      const response = await fetch('waterqualitydata.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const myJson = await response.json();
      setData(myJson); // Set the data after parsing the JSON
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      hideLoading(); // Always hide the spinner, whether fetch succeeds or fails
    }
  }

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  return (
<Router>
      <div>
        <NavigationBar />
        <Routes>
          {/* Set Home component to load by default */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          
          {/* Route for Line Chart */}
          <Route path="/visualize" element={
            <MultiStreetProvider>
              <StreetProvider>
                {/* <h2>Water Quality Data Visualization - Line Chart</h2> */}
                <Container className="mt-5">
      <h2 className="text-center mb-4 border-bottom border-info pb-2" style={{color:'Navy'}}>
       Plano City Water Quality Data Visualization Charts
      </h2>
    </Container>
                <MultiStreetSelector streetNames={streets} />
                <LineChart data={data} />
              </StreetProvider>
            </MultiStreetProvider>
          } />
          
          {/* Route for Bar Chart */}
          <Route path="/predict" element={
            <MultiStreetProvider>
              <StreetProvider>
                <MultiStreetSelector streetNames={streets} />
                <BarChart data={data} />
              </StreetProvider>
            </MultiStreetProvider>
          } />

          {/* Route for Pie Chart */}
          <Route path="/piechart" element={
            <MultiStreetProvider>
              <StreetProvider>
                <h2>Water Quality Data Visualization - Pie Chart</h2>
                <MultiStreetSelector streetNames={streets} />
                <PieChart data={data} />
              </StreetProvider>
            </MultiStreetProvider>
          } />
          <Route path="/about" element={
                <Container className="mt-5">
                <About/>
                </Container>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
