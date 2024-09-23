import React, { useEffect, useState } from 'react';
import { Table, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useMultipleStreets } from './components/MultiStreetSelector';
import { useLoading } from './context/LoadingContext';


const PredictQuality = () => {
  const { showLoading, hideLoading } = useLoading();
  const { selectedStreets } = useMultipleStreets();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFormValid = selectedStreets && selectedStreets.length > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31;

  useEffect(() => {
    // Only fetch data if a street has been selected
    if (selectedStreets   && selectedStreets.length > 0 && month && day) {
      showLoading(); // Show global spinner
      const fetchData = async () => {
        setLoading();
        try {
              console.log(selectedStreets);
              console.log(`streetName=${encodeURIComponent(selectedStreets)}`);
              const response = await fetch(
                `https://func-whatsinmywater.azurewebsites.net/api/PredictValuesHttpTrigger?streetName=${encodeURIComponent(selectedStreets)}&Month=${month}&Day=${day}`,
        //            `http://localhost:7071/api/PredictValuesHttpTrigger?streetName=${encodeURIComponent(selectedStreet)}&Month=${month}&Day=${day}`
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  streets: selectedStreets,
                  month: month,
                  day: day,
                })
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          hideLoading(); // Always hide the spinner, whether fetch succeeds or fails

        }
      };

      fetchData();
    }
  }, [selectedStreets, month, day]); // Fetch data when selectedStreet changes

  const fetchData = async () => {
    if (isFormValid) {
      setLoading(true);
    showLoading(); // Show global spinner
    setLoading();
    try {
          console.log(selectedStreets);
          console.log(`streetName=${encodeURIComponent(selectedStreets)}`);
          const response = await fetch(
            `https://func-whatsinmywater.azurewebsites.net/api/PredictValuesHttpTrigger?streetName=${encodeURIComponent(selectedStreets)}&Month=${month}&Day=${day}`,
    //            `http://localhost:7071/api/PredictValuesHttpTrigger?streetName=${encodeURIComponent(selectedStreet)}&Month=${month}&Day=${day}`
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              streets: selectedStreets,
              month: month,
              day: day,
            })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      hideLoading(); // Always hide the spinner, whether fetch succeeds or fails

    }
  }
};
const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  return (
    <div>
        <Row><Col>&nbsp;</Col></Row>
        <Form>
  {/* This Row adds some space on the left side */}
  <Row>
    <Col xs={1} sm={2} md={3} lg={4} />
    <Col xs={11} sm={10} md={9} lg={8}>

      {/* Form elements */}
      <Row>
        <Col md={4}>
          <Form.Group controlId="month" className="mb-3">
            <Form.Label>Month</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={handleMonthChange}
              className="form-select"
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="day" className="mb-3">
            <Form.Label>Day</Form.Label>
            <Form.Control
              as="select"
              value={day}
              onChange={handleDayChange}
              className="form-select"
            >
              <option value="">Select Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Col>
  </Row>
</Form>
      {/* <Form>
      <Row className="justify-content-center">
          <Col md={1} >
            <Button 
              variant="primary" 
              onClick={fetchData} 
              disabled={!isFormValid}
              className="mt-3"
            >
              Predict
            </Button>
          </Col>
        </Row>
      </Form> */}
      {selectedStreets  && selectedStreets.length > 0 ? (
        <div>
          <Container>
            <br/>
            <div className="text-center mb-1 border-top border-info pb-1">
            <h3 class=" text-center display-6  mb-6 pb-2 mb-4">Predicted Values</h3>
            </div>
              {error && <p>Error: {error}</p>}
              {loading && <p>Loading...</p>}
              {!loading && data.length === 0 && !error && <p></p>}

              {!loading && data.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Street Name</th>
                      <th>Total Chlorine Residual (mg/L)</th>
                      <th>Monochloramine (mg/L)</th>
                      <th>Predicted pH</th>
                      <th>Free Ammonia (mg/L)</th>
                      <th>Total Alkalinity (as CaCO3) mg/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.StreetName}</td>
                        <td>{item.predicted_TotalChlorineResidual.toFixed(3)}</td>
                        <td>{item.predicted_Monochloramine.toFixed(3)}</td>
                        <td>{item.predicted_pH.toFixed(3)}</td>
                        <td>{item.predicted_FreeAmmonia.toFixed(3)}</td>
                        <td>{item.predicted_TotalAlkalinity.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Container>
          </div>): (
        <div>
            <br/>
            <div className="text-center mb-1 border-top border-info pb-1">
              Please select street(s) to predict the data
            </div>
        </div>
      )}

      <footer className="bg-light text-center text-lg-start mt-4">

        <div 
          className="text-center p-3" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            position: 'fixed', 
            left: 0, 
            right: 0, 
            bottom: 0,
            width: '100%' 
          }}
        >
          Disclaimer: The predictions provided are generated using machine learning algorithms and are for informational purposes only. They are based on historical data and statistical patterns, which may not always reflect real-world outcomes. While efforts have been made to ensure the accuracy and reliability of the results, no guarantees or warranties are provided. The use of these predictions is at your own risk.
        </div>
      </footer>


    </div>
  );
};

export default PredictQuality;
