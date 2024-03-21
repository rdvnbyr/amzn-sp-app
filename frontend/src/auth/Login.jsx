import {Form, Button} from 'react-bootstrap';
import styled from 'styled-components';

function Login() {
  return (
    <StyledWrapper>
      <div className="text-center mb-4">
        <h2>Login</h2>
        <p>Login form goes here</p>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="******" />
        </Form.Group>

        <div className="d-grid mt-4">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 2.25rem 2.75rem;
  max-width: 26rem;
  margin: 0 auto;
`;

export default Login;
