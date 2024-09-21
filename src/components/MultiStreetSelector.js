import React, { createContext, useContext, useState } from 'react';
import Select from 'react-select'; // Import React Select

// Create a Context for the multi-street selector
const MultiStreetContext = createContext();

// Provide context to child components
export const MultiStreetProvider = ({ children }) => {
  const [selectedStreets, setSelectedStreets] = useState([]); // Store selected streets as an array

  return (
    <MultiStreetContext.Provider value={{ selectedStreets, setSelectedStreets }}>
      {children}
    </MultiStreetContext.Provider>
  );
};

// Custom hook to use the MultiStreetContext
export const useMultipleStreets = () => {
  return useContext(MultiStreetContext);
};

// MultiStreetSelector component using react-select
export const MultiStreetSelector = ({ streetNames }) => {
  const { selectedStreets, setSelectedStreets } = useMultipleStreets();

  // Convert street names to a format that react-select expects
  const options = streetNames.map((street) => ({
    value: street,
    label: street,
  }));

  // Handle the selection change
  const handleStreetChange = (selectedOptions) => {
    const selectedStreets = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setSelectedStreets(selectedStreets); // Update context with selected streets
  };

  return (
    <div className="d-flex align-items-center centered-container">
      <label className="mr-2">Select one or multiple Street names &nbsp;</label>
      <div className="selector-container">
        {/* <label htmlFor="multi-street-select">Select Street(s):</label> */}
        <Select
          id="multi-street-select"
          isMulti
          options={options}
          value={options.filter((option) => selectedStreets.includes(option.value))}
          onChange={handleStreetChange}
          placeholder="Select streets..."
          styles={{
            container: (provided) => ({ ...provided, width: 800 }), // Customize width
            menu: (provided) => ({ ...provided, zIndex: 9999 }), // Ensure dropdown appears correctly
          }}
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );  
};
