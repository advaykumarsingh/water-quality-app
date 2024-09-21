import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'; // Allows using Nav.Link with React Router

function NavigationBar() {
  return (
  <div>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">What's in my water!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Link to Home */}
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {/* Link to Line Chart */}
            <LinkContainer to="/visualize">
              <Nav.Link>Visualize Data</Nav.Link>
            </LinkContainer>

            {/* Link to Bar Chart */}
            <LinkContainer to="/predict">
              <Nav.Link>Make Predictions</Nav.Link>
            </LinkContainer>

            {/* Dropdown Menu Example */}
            {/* <NavDropdown title="More Charts" id="collapsible-nav-dropdown">
              <LinkContainer to="/piechart">
                <NavDropdown.Item>Pie Chart</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/contact">
                <NavDropdown.Item>Contact</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown> */}
          </Nav>

          <Nav>
            {/* Additional Links */}

             <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavigationBar;