import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useStreet } from './components/StreetSelector';
import { useMultipleStreets } from './components/MultiStreetSelector';
import { Form, Row, Col } from 'react-bootstrap';
import { chartOptionsGeneric} from './charts/chartOptions'; 

const processTemperatureData = (data, selectedStreets) => {
  // Create headers dynamically based on the selected streets
  const headers = ["Date", 
    ...selectedStreets.flatMap(street => [
      `${street}`
    ])
  ];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.DATE).toDateString();
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    selectedStreets.forEach(street => {
      if (!acc[date][street]) {
        acc[date][street] = {
          temperature: entry.Street === street ? entry["Temperature"] : null
        };
      }
    });
    return acc;
  }, {});

  // Create rows with temperature and pH data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach(date => {
    const row = [new Date(date)];
    selectedStreets.forEach(street => {
      row.push(groupedData[date][street]?.temperature || null); // Temperature
    });
    rows.push(row);
  });

  return [headers, ...rows];
};

// Group data by Street name
const groupedLocationDataByStreet = (data) => {
  return data.reduce((acc, entry) => {
    const street = entry.Street;
    const locationType = entry['Location Type/#'];

    if (!acc[street]) {
      acc[street] = new Set(); // Use Set to avoid duplicates
    }
    acc[street].add(locationType);
    return acc;
  }, {});
};

const processPhData = (data, selectedStreets) => {
  // Create headers dynamically based on the selected streets
  const headers = ["Date", ...selectedStreets.map(street => `${street} - pH`)];
  
  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.DATE).toDateString();
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    selectedStreets.forEach(street => {
      if (!acc[date][street]) {
        acc[date][street] = entry.Street === street ? entry.pH : null;
      }
    });
    return acc;
  }, {});

  // Create rows with pH data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach(date => {
    const row = [new Date(date)];
    selectedStreets.forEach(street => {
      row.push(groupedData[date][street] || null); // Fill with null if no data
    });
    rows.push(row);
  });

  return [headers, ...rows];
};


const processChlorineData = (data) => {
  const headers = ["Date", "Total Chlorine Residual", "Monochloramine"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Total Chlorine Residual"],
    entry.Monochloramine,
  ]);
  return [headers, ...rows];
};
// Updated processChlorineData function
const processChlorineDataMulti = (data, selectedStreets) => {
  // Create headers with a single label for each street's data
  const headers = ["Date", ...selectedStreets.flatMap(street => [`${street}`])];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    console.log(typeof(entry.DATE));
    const date = new Date(entry.DATE);
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    acc[date][entry.Street] = {
      "Total Chlorine Residual": entry["Total Chlorine Residual"],
      // Monochloramine: entry.Monochloramine
    };
    return acc;
  }, {});

  // Create rows with data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach((date) => {
    const row = [new Date(date)];
    selectedStreets.forEach((street) => {
      const streetData = groupedData[date][street] || {};
      row.push(streetData["Total Chlorine Residual"] || null); // Fill with null if no data
      // row.push(streetData.Monochloramine || null);
    });
    rows.push(row);
  });

  return [headers, ...rows];
};

const processFreeChlorineData = (data, selectedStreets) => {
  // Create headers with a single label for each street's data
  const headers = ["Date", ...selectedStreets.flatMap(street => [`${street}`])];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    console.log(typeof(entry.DATE));
    const date = new Date(entry.DATE);
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    acc[date][entry.Street] = {
      "Free Chlorine": entry["Free Chlorine"],
      // Monochloramine: entry.Monochloramine
    };
    return acc;
  }, {});

  // Create rows with data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach((date) => {

    const row = [new Date(date)];
    selectedStreets.forEach((street) => {
      const streetData = groupedData[date][street] || {};
      row.push(streetData["Free Chlorine"] || null); // Fill with null if no data
      // row.push(streetData.Monochloramine || null);
    });
    rows.push(row);
  });

  return [headers, ...rows];
};

const processFreeAmmoniaData = (data, selectedStreets) => {
  // Create headers dynamically based on the selected streets
  const headers = ["Date", 
    ...selectedStreets.map(street => `${street}`)
  ];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.DATE).toDateString();
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    selectedStreets.forEach(street => {
      if (!acc[date][street]) {
        acc[date][street] = entry.Street === street ? entry["Free Ammonia"] : null;
      }
    });
    return acc;
  }, {});

  // Create rows with Free Ammonia data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach(date => {
    const row = [new Date(date)];
    selectedStreets.forEach(street => {
      row.push(groupedData[date][street] || null); // Free Ammonia
    });
    rows.push(row);
  });

  return [headers, ...rows];
};


const processNitritesData = (data, selectedStreets) => {
  // Create headers dynamically based on the selected streets
  const headers = ["Date", 
    ...selectedStreets.map(street => `${street}`)
  ];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.DATE).toDateString();
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    selectedStreets.forEach(street => {
      if (!acc[date][street]) {
        acc[date][street] = entry.Street === street ? entry["Nitrites"] : null;
      }
    });
    return acc;
  }, {});

  // Create rows with Nitrites data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach(date => {
    const row = [new Date(date)];
    selectedStreets.forEach(street => {
      row.push(groupedData[date][street] || null); // Nitrites
    });
    rows.push(row);
  });

  return [headers, ...rows];
};


const processTotalAlkalinityAs_CaCO3 = (data, selectedStreets) => {
  // Create headers dynamically based on the selected streets
  const headers = ["Date", 
    ...selectedStreets.map(street => `${street}`)
  ];

  // Group data by date for all selected streets
  const groupedData = data.reduce((acc, entry) => {
    const date = new Date(entry.DATE).toDateString();
    if (!acc[date]) {
      acc[date] = { date: new Date(entry.DATE) };
    }
    selectedStreets.forEach(street => {
      if (!acc[date][street]) {
        acc[date][street] = entry.Street === street ? entry["Total Alkalinity (as CaCO3)"] : null;
      }
    });
    return acc;
  }, {});

  // Create rows with Total Alkalinity data for each street per date
  const rows = [];
  Object.keys(groupedData).forEach(date => {
    const row = [new Date(date)];
    selectedStreets.forEach(street => {
      row.push(groupedData[date][street] || null); // Total Alkalinity (as CaCO3)
    });
    rows.push(row);
  });

  return [headers, ...rows];
};



const LineChart = ({ data }) => {
  const [chartType, setChartType] = useState('LineChart');

  const { selectedStreet } = useStreet();
  const { selectedStreets } = useMultipleStreets();
  //const filteredData = data.filter((entry) => entry.Street === selectedStreet);
// Filter data for multiple selected streets
const filteredData = data.filter((entry) =>
  selectedStreets.includes(entry.Street)
);
  const tempAndPHChartData = processTemperatureData(filteredData, selectedStreets);
  const chlorineChartData = processChlorineDataMulti(filteredData, selectedStreets);
  const freeChlorineChartData = processFreeChlorineData(filteredData, selectedStreets);
  
  const phChartData = processPhData(filteredData, selectedStreets);
  const freeAmmoniaData = processFreeAmmoniaData(filteredData, selectedStreets);
  const nitritesData = processNitritesData(filteredData, selectedStreets);
  const totalAlkalinityAs_CaCO3Data = processTotalAlkalinityAs_CaCO3(filteredData, selectedStreets);
  const groupedLocationdata = groupedLocationDataByStreet(filteredData);

  return (
    <div>
      <div>
        {selectedStreets && selectedStreets.length > 0 ? (
          1==1
        ) : (
          <p></p>
        )}
      </div>
      {selectedStreets  && selectedStreets.length > 0 ? (
        <div>
      {/* <Row className="mb-2">
        <Col className="d-flex justify-content-end pr-3"> 
    <div className="d-flex align-items-center centered-container">
          <label className="mr-2">Select Chart Type:</label>
          <Form.Group controlId="chartTypeSelect" className="mb-0">
            <Form.Control
              as="select"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="LineChart">Line Chart</option>
              <option value="Bar">Bar Chart</option>
              <option value="Scatter">Scatter</option>
            </Form.Control>
          </Form.Group>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Col>
      </Row> */}
        <div className="text-center mb-4 border-bottom border-info pb-2"> {/* Added maxWidth */}
          <Chart
            chartType={chartType}
            width="100%"
            height="800px"
            data={chlorineChartData}
            options={chartOptionsGeneric( 'Total Chlorine Residual (mg/L)', selectedStreets)}
            
          />
        <Chart
            chartType={chartType}
            width="100%"
            height="800px"
            data={phChartData}
            options={chartOptionsGeneric( 'pH Value', selectedStreets)}
        />
        <Chart
          chartType={chartType}
          width="100%"
          height="800px"
          data={tempAndPHChartData}
          options={chartOptionsGeneric('Temperatures (Celcius)', selectedStreets)}
        />
        <Chart
          chartType={chartType}
          width="100%"
          height="800px"
          data={freeAmmoniaData}
          options={chartOptionsGeneric('Free Ammonia (mg/L)', selectedStreets)}
        />
        <Chart
          chartType={chartType}
          width="100%"
          height="800px"
          data={nitritesData}
          options={chartOptionsGeneric('Nitrites (mg/L)', selectedStreets)}
        />
        <Chart
          chartType={chartType}
          width="100%"
          height="800px"
          data={totalAlkalinityAs_CaCO3Data}
          options={chartOptionsGeneric('Total Alkalinity (as CaCO3) mg/L', selectedStreets)}
        />
<div>
    <h3 style={{color:'Navy'}}>Location Type by Street</h3>
    <ul className="list-group">
  {Object.keys(groupedLocationdata).map((street) => (
  <li key={street} className="list-group-item">
    <h5 className="mb-1"><strong>{street}</strong></h5>
    <p className="mb-1">
      {Array.from(groupedLocationdata[street]).join(', ')}
    </p>
  </li>
  ))}
  </ul>

  </div>
        </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default LineChart;
