import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

  return (
    <div className="container mt-5">

        <h1 className="mb-4 text-center">Understanding Elements Present in Drinking Water</h1>

        <p className="lead">Ensuring the safety and quality of drinking water is essential for public health. Water treatment processes often involve the addition of various chemicals and substances to remove contaminants and ensure that the water is safe for consumption. These elements can affect both the health and the taste of drinking water. Let’s explore some of the most common elements found in treated drinking water and their significance.</p>

        <div className="row">
            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-primary text-white p-2">Chlorine</h5>
                        <p>Chlorine is widely used as a disinfectant in drinking water to eliminate harmful bacteria, viruses, and other pathogens. It is a powerful oxidizing agent and helps prevent waterborne diseases like cholera and typhoid.</p>
                        <ul>
                            <li><strong>Importance</strong>: Ensures microbiological safety of water.</li>
                            <li><strong>Concerns</strong>: Excess chlorine can affect taste and form harmful byproducts.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-success text-white p-2">pH</h5>
                        <p>The pH of water measures its acidity or alkalinity, ranging from 0 to 14, with 7 being neutral. Drinking water should ideally have a pH between 6.5 and 8.5.</p>
                        <ul>
                            <li><strong>Importance</strong>: Affects chemical balance and disinfectant efficiency.</li>
                            <li><strong>Concerns</strong>: Extreme pH can cause corrosion or taste issues.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-info text-white p-2">Total Chlorine Residual</h5>
                        <p>Total chlorine residual refers to the amount of chlorine remaining after disinfection. It includes both free and combined chlorine, ensuring ongoing water safety.</p>
                        <ul>
                            <li><strong>Importance</strong>: Protects water from recontamination.</li>
                            <li><strong>Concerns</strong>: Imbalance may lead to taste issues or microbial regrowth.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-secondary text-white p-2">Monochloramine</h5>
                        <p>Monochloramine, a stable form of chloramine, is used as a secondary disinfectant in drinking water. It prevents microbial growth over long distances.</p>
                        <ul>
                            <li><strong>Importance</strong>: Provides lasting disinfection.</li>
                            <li><strong>Concerns</strong>: Less effective than chlorine and may affect taste.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-primary text-white p-2">Free Ammonia</h5>
                        <p>Free ammonia is the unreacted ammonia remaining after chloramine formation. It supports long-lasting chloramine disinfection but can lead to bacterial growth.</p>
                        <ul>
                            <li><strong>Importance</strong>: Needed for chloramine creation.</li>
                            <li><strong>Concerns</strong>: Excess ammonia can result in nitrite formation.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-success text-white p-2">Nitrites</h5>
                        <p>Nitrites result from bacterial activity when ammonia is present in water. High nitrite levels can pose health risks, especially to infants and pregnant women.</p>
                        <ul>
                            <li><strong>Importance</strong>: Indicates microbial activity in water.</li>
                            <li><strong>Concerns</strong>: High levels can cause "blue baby syndrome."</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-info text-white p-2">Total Alkalinity (as CaCO3)</h5>
                        <p>Total alkalinity measures water’s ability to neutralize acids, expressed as calcium carbonate (CaCO3). It helps maintain stable pH levels in water.</p>
                        <ul>
                            <li><strong>Importance</strong>: Buffers pH and prevents corrosion.</li>
                            <li><strong>Concerns</strong>: Imbalances can cause water to become too acidic or alkaline.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title bg-secondary text-white p-2">Chloramine</h5>
                        <p>Chloramine, formed by combining chlorine with ammonia, is a long-lasting disinfectant used to keep water safe during distribution.</p>
                        <ul>
                            <li><strong>Importance</strong>: Provides ongoing disinfection.</li>
                            <li><strong>Concerns</strong>: May change water's taste and is a weaker disinfectant than chlorine.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <Container className="mt-5">
    
        {/* Content Section */}
        <Row className="mb-5 justify-content-center">
        <Col md={6} className="d-flex">
          <Button 
            variant="primary" 
            size="lg" // Makes button larger
            style={{ width: '45%', marginRight: '10%' }} // Custom width and spacing
            onClick={() => navigate('/visualize')}
          >
            Visualize Data
          </Button>
          <Button 
            variant="success" 
            size="lg" // Makes button larger
            style={{ width: '45%' }} // Custom width
            onClick={() => navigate('/predict')}
          >
            Predict
          </Button>
        </Col>
      </Row>

      {/* <Link to="/linechart" style={{ textDecoration: 'none' }}> 
        <Card className="mb-5 bg-info text-white shadow-sm">
            <Card.Body className="text-center">
            <h4 className="font-weight-bold">Explore the Visual Data</h4>
            </Card.Body>
        </Card>
      </Link>
      <Card className="mb-5 bg-primary text-white shadow-sm">
        <Card.Body className="text-center">
            <h4 className="font-weight-bold">Explore the Visual Data</h4>
        </Card.Body>
    </Card> */}

    </Container>


    </div>
  );
};

export default Home;
