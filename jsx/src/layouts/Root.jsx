import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Outlet} from 'react-router-dom';
import propTypes from 'prop-types';

function Header({expand = 'lg'}) {
  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-start flex-grow-1 pe-3">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

Header.propTypes = {
  expand: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

function Root() {
  return (
    <div className="root-layout">
      <header>
        <Container fluid>
          <Header />
        </Container>
      </header>

      <main className="min-vh-100">
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="p-4 bg-body-tertiary">
        <p className="text-center">&copy; 2024 Company, Inc.</p>
      </footer>
    </div>
  );
}

export default Root;
