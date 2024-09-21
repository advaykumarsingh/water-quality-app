import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css'; // Make sure to create this CSS file

const About = () => {
  return (
    <section className="about-section">
      <Container>
        <div className="section-title mb-5">
          <h2 className="section-title text-center mb-5">About Me</h2>
          <div style={{ color: "black" }}>

          <p style={{ color: "black" }}>
            Welcome! I’m Advay Singh, a high school senior, passionate about machine learning and data science. 
            During my sophomore and junior years, I collaborated with two peers on monthly water quality tests for the Plano Environmental Health & Sustainability department. 
            </p>
            <p style={{ color: "black" }}>
            What began as a volunteer opportunity quickly transformed into a powerful learning experience. 
            I was amazed to discover the extensive processes our drinking water undergoes, which fueled my curiosity about its quality and importance. 
            Inspired by this journey, I created this website to provide information to the residents of Plano and raise awareness about our water quality.
<br/>
<br/>
            This website aims to inform the residents of Plano about water quality, but I want to emphasize that I am not trying to infringe upon the official Plano water quality website. 
            All data presented here is sourced from Plano City's resources, which you can explore directly for more in-depth information. 
<br/>
<br/>
            
            Thank you for visiting!
</p>
<p className="section-title text-left mb-5" style={{ color: "black" }}>
    Source for dataset:&nbsp;<a href='https://www.plano.gov/1742/Drinking-Water-Quality-Information'>Plano City - Water quality data</a>

</p>
        </div>
        </div>
        <Row>
          <Col md={6}>
            <h3></h3>
            <ul>
            </ul>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default About;
