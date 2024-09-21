import React from 'react';
import { useMultipleStreets } from './MultiStreetSelector';  // Path to your multi-street context file
import { useStreet } from './StreetSelector';  // Path to your single-street context file

const StreetDataConsumer = () => {
  // Access both the selected multiple streets and single street from their respective contexts
  const { selectedStreets } = useMultipleStreets();
  const { selectedStreet } = useStreet();

  return (
    <div>
      <h2>Selected Streets</h2>
      
      {/* Display selected multiple streets */}
      <div>
        <h3>Multiple Streets:</h3>
        {selectedStreets && selectedStreets.length > 0 ? (
          <ul>
            {selectedStreets.map((street) => (
              <li key={street}>{street}</li>
            ))}
          </ul>
        ) : (
          <p>No streets selected in multi-street selector.</p>
        )}
      </div>

      {/* Display selected single street */}
      <div>
        <h3>Single Street:</h3>
        {selectedStreet ? (
          <p>{selectedStreet}</p>
        ) : (
          <p>No street selected in single-street selector.</p>
        )}
      </div>
    </div>
  );
};

export default StreetDataConsumer;
