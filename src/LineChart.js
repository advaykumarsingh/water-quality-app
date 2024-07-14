// src/components/LineChart.js
import { Chart } from 'react-google-charts';
import React, { useState } from 'react';

//const streetNames = ["W PLANO PKWY", "RIDGEVIEW DR", "COMMUNICATIONS PKWY"];


const processTempAndPHData = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "Temperature (Celcius)"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Temperature"]
  ]);

  return [headers, ...rows];
};

const processPhData = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "pH"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry.pH,
  ]);

  return [headers, ...rows];
};


const processChlorineData = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "Total Chlorine Residual", "Monochloramine"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Total Chlorine Residual"],
    entry.Monochloramine,
  ]);

  return [headers, ...rows];
};

const processFreeAmmoniaData = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "Free Ammonia"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Free Ammonia"],
  ]);

  return [headers,...rows];
};

const processNitritesData = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "Nitrites"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Nitrites"],
  ]);

  return [headers,...rows];
};

const processTotalAlkalinityAs_CaCO3 = (data) => {
  // const headers = ["Date", "Total Chlorine Residual", "Free Chlorine", "Monochloramine", "Free Ammonia", "Temperature", "pH", "Nitrates", "Nitrites", "Total Alkalinity (as CaCO3)"];
  const headers = ["Date", "Total Alkalinity (as CaCO3)"];
  const rows = data.map((entry) => [
    new Date(entry.DATE),
    entry["Total Alkalinity (as CaCO3)"],
  ]);

  return [headers,...rows];
};

const options = {
  title: 'Chlorine Quality Over Time',
  curveType: 'function',
  legend: { position: 'bottom' },
};



const LineChart = ({ data }) => {
  const [selectedStreet, setSelectedStreet] = useState(streetNames[0]);
  const filteredData = data.filter((entry) => entry.Street === selectedStreet);

  const tempAndPHChartData = processTempAndPHData(filteredData);
  const chlorineChartData = processChlorineData(filteredData);
  const phChartData = processPhData(filteredData);
  const freeAmmoniaData = processFreeAmmoniaData(filteredData);
  const nitritesData = processNitritesData(filteredData);
  const totalAlkalinityAs_CaCO3Data = processTotalAlkalinityAs_CaCO3(filteredData);

  const handleStreetChange = (event) => {
    setSelectedStreet(event.target.value);
  };

  return (
    <div>
      <label htmlFor="street-select">Select Street:</label>
      <select id="street-select" value={selectedStreet} onChange={handleStreetChange}>
        {streetNames.map((street) => (
          <option key={street} value={street}>{street}</option>
        ))}
      </select>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={chlorineChartData}
          options={options}
        />

      </div>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={phChartData}
          options={options}
        />
      </div>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={tempAndPHChartData}
          options={options}
        />
      </div>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={freeAmmoniaData}
          options={options}
        />
      </div>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={nitritesData}
          options={options}
        />
      </div>
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={totalAlkalinityAs_CaCO3Data}
          options={options}
        />
      </div>
    </div>
  );
};
const raw_streetNames = ['RIDGEVIEW DR', 'W 15TH ST', 'DEL SOL DR', 'ALMA DR',
  'Sage Brush Trl', 'W PLANO PKWY', 'Sandy Trail Ln', 'Louis Dr',
  'Arbor Vista Dr', 'Mt Vernon Way', 'Walters Dr', 'Simsbury Dr',
  'Randall Way', 'Milton Ln', 'Bonsai Dr', 'Harrington Dr',
  'Geneva Ln', 'Shoal Creek Cir', 'The Giovanna', 'BROWNING DR',
  'International Pkwy', 'Wynview Dr', 'INTERNATIONAL PKWY',
  'BISHOP RD', 'COMMUNICATIONS PKWY', 'HAGGARD ST', 'LOTUS DR',
  'Shetland Rd', 'Cleveland Dr', 'Pinehurst Dr', 'Canterbury Dr',
  'Del Sol Dr', 'Piedra Dr', 'Stonemoss Dr', 'Chadbourne Dr',
  'Steamboat Dr', 'Chicota Dr', 'Bass Dr', 'N Medalist Cir',
  'Alma Dr', 'Mapleshade Ln', 'Ridgeview Dr', 'CENTRAL PKY E',
  'Jasmine Ln', 'W 15th St', 'Hideaway Ln', 'Brookshire Dr',
  'Regal Rd', 'Edwards Dr', 'Burnet Dr', 'Smokey Dr', 'Stacia Dr',
  'Communications Pkwy', 'Wooded Cove Dr', 'Laurel Ln', 'Sherrye Dr',
  'Bishop Rd', 'Browning Dr', 'Jenning Ct', 'W Plano Pkwy',
  'HAYFIELD DR', 'California Trl', 'Bull Run Dr', 'Patrick Ln',
  'Shantara Ln', 'Camp Wood Ct', 'Sunflower Ln', 'Deer Park Ln',
  'Case Dr', 'Spring Mountain Dr', 'Lake Crest Ln', 'Vanderbilt Dr',
  'Appalachian Ct', 'Aimpoint Dr', 'Glyndon Dr', 'Lakestream Dr',
  'Sandhurst Dr', 'Mellville Dr', 'Croston Dr', 'Callaway Dr',
  'Crystal Way', 'Medina Dr', 'OCEANVIEW DR', 'FLICKER LN',
  'Lavaca Dr', 'Covinton Ln', 'Shinnery Oak Dr', 'TALBERT DR',
  'Brimwood Dr', 'Gallant Fox Ln', 'Bender Trl', 'Early Morn Dr',
  'Sterling Ln', 'Parkside Dr', 'Remington Dr', 'Loch Haven Dr',
  'Heather Hill Ln', 'Downing Dr', 'Santana Ln', 'Leigh Dr',
  'Cumberland Trl', 'Valdez Ct', 'Bandera Dr', 'Knob Hill Dr',
  'Lazy Oak Ln', 'Hartford Dr', 'Dartmouth Dr', 'Fall Wheat Dr',
  'Capital Ave', 'Meadowbrook Dr', 'Tilden Dr', 'Winchester Dr',
  'Grandview Dr', 'Cherbourg Dr', 'Lake Shore Ln', 'Tawakoni Ln',
  'Arbor Downs Dr', 'Cup Dr', 'Old Orchard Dr', 'Country Club Dr',
  'Oak Tree Dr', 'Wingren Dr', 'Misty Haven Ln', 'Cedar Grove Cir',
  'Seabrook Dr', 'Rockcreek Ln', 'Peek Dr', 'Sandia Dr', 'Bengal Ln',
  'Muirfield Cir', 'Steven Dr', 'Snidow Dr', 'Redfield Dr',
  'Liverpool Dr', 'Vienna Dr', 'Baxter Dr', 'FULLERTON DR',
  'RAINWOOD DR', 'Red Wolf Ln', 'Apple Tree Dr', 'Eagle Vail Dr',
  'Streamwood Ln', 'Bridle Bend Trl', 'Bridge View Ln', 'Arlen Dr',
  'Dundee Ln', 'Matterhorn Dr', 'Claymore Dr', 'Canyon Valley Trl',
  'Arbuckle Dr', 'Evans Dr', 'Bluffton Dr', 'Aldridge Dr',
  'Berwyn Dr', 'Madera Ct', 'HYANNIS ST', 'Pebble Beach Dr',
  'Amazon Dr', 'Sacramento Ter', 'Wimbledon Ln', 'Lombardy Dr',
  'Yellowstone Dr', 'Japonica Ln', 'Covered Wagon Dr',
  'Charter Oak Dr', 'Kentfield Ln', 'Lottie Ln', 'Fountain Head Dr',
  'Biltmore Pl', 'Adrian Way', 'Dunwick Dr', 'Sako Dr',
  'Endicott Dr', 'Cotton Belt Ave', 'Mullins Dr', 'Ledgemont Dr',
  'Mossvine Dr', 'Lawndale Dr', 'Nightfall Dr', 'Ridgehaven Dr',
  'Whitehaven Dr', 'Saltburn Dr', 'Plymouth Dr', 'Piedmont Dr',
  'N Cypress Cir', 'Hunters Creek Dr', 'Northcrest Dr', 'P Ave',
  'Tangerine Ln', 'BIANCA LN', 'TURNER LN', 'St Thomas Dr',
  'Fairmount Dr', 'Misted Breeze Dr', 'Whiffletree Dr',
  'Whittingdon Pl', 'Cross Bend Rd', 'Toppingham St', 'Basalt Dr',
  'Swanson Dr', 'Wolf Ridge Dr', 'Riverhill Dr', 'Harvest Glen Dr',
  'Lochridge Dr', 'Nocona Dr', 'Westridge Dr', 'Armstrong Dr',
  'Schooner Dr', 'Rockbrook Dr', 'Merriman Dr', 'Camino Dr',
  'Buckboard Dr', 'Reunion Dr', 'Forest Park Rd', 'Winding Wood Trl',
  'Buchanan Dr', 'Raintree Dr', 'Shady Ln', 'Hawkhurst Dr',
  'Wyvonnes Way', 'Mandevilla Dr', 'SHERWOOD DR', 'Big Sky Dr',
  'Montrose Dr', 'Kingsbury Dr', 'San Patricio Dr', 'Kimble Dr',
  'Duval Dr', 'Angus Dr', 'Brycewood Ln', 'Cimmaron Dr', 'Gent Dr',
  'Flintstone Dr', 'Ruthridge Dr', 'Panther Ridge Ln',
  'W SPRING CREEK PKWY', 'Cloverhaven Way', 'Bianca Ln', 'GARDA CIR',
  'York Ln', 'Warwick Dr', 'ALLEGHENY TRL', 'Grand Falls Cir',
  'CHELSEA LN', 'Ashmill Dr', 'Tall Oak Ln', 'Hyannis St',
  'Overglen Dr', 'Garda Cir', 'Falling Water Ln', 'Blackjack Oak Ln',
  'Homewood Dr', 'Greenfield Dr', 'Trail Walker Dr', 'G Ave',
  'Quill Dr', 'Kite Meadow Dr', 'BELLA VISTA DR', 'Rock Trl',
  'Fieldlark Dr', 'Calhoun Ln', 'San Antonio Ct', 'Sassafras Dr',
  'Biloxi Cir', 'North Star Rd', 'Mills Branch Cir',
  'Judge Holland Ln', 'Van Gogh Dr', 'Angels Dr', 'Mantissa Dr',
  'Rowlett Cemetery Rd', 'Heatherton Pl', 'HEDGCOXE RD',
  'W Spring Creek Pkwy', 'Dodge Ct'];
const streetNames = raw_streetNames.sort();

export default LineChart;
