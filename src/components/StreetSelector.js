import React, { createContext, useContext, useState } from 'react';

// Create a Context for the single-street selector
const SingleStreetContext = createContext();

// Provide context to child components
export const StreetProvider = ({ children }) => {
  const [selectedStreet, setSelectedStreet] = useState(null);

  return (
    <SingleStreetContext.Provider value={{ selectedStreet, setSelectedStreet }}>
      {children}
    </SingleStreetContext.Provider>
  );
};

// Custom hook to use the SingleStreetContext
export const useStreet = () => {
  return useContext(SingleStreetContext);
};

// StreetSelector component using native select dropdown
export const StreetSelector = ({ streetNames }) => {
  const { selectedStreet, setSelectedStreet } = useStreet();

  const handleStreetChange = (event) => {
    setSelectedStreet(event.target.value);
  };

  return (
    <div>
      <label htmlFor="street-select">Select Street:</label>
      <select id="street-select" value={selectedStreet || ''} onChange={handleStreetChange}>
        <option value="" disabled>Select a street</option>
        {streetNames.map((street) => (
          <option key={street} value={street}>{street}</option>
        ))}
      </select>
    </div>
  );
};
