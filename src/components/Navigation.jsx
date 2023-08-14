import { Container, Navbar, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "../Service/AuthService";

function LogoutButton() {

  let navigate = useNavigate();

  const Logout = () => {
    AuthService.logout();
    navigate("/")
  }

  const authentication = AuthService.getAuthentication();

  if (authentication != null){
    return (
      <>
        <Button vatiant="danger" onClick={Logout}>Logout</Button>      
      </>
    )
  }
}

export function Navi() {
    return (
      <Navbar bg="dark" data-bs-theme="dark" className="nav">
        <Container>
          <Navbar.Brand href="#home">Order Service</Navbar.Brand>
          <LogoutButton/>
        </Container>
      </Navbar>
    )
}