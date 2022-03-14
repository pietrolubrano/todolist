import { useContext } from 'react';
import { Link } from "react-router-dom";

import { AuthContext } from '../context/auth/AuthContext';

import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

export default function MyNavbar(){
    const { currentUser, logOut } = useContext(AuthContext)
    
    return(
        <Navbar bg="light" expand="md" sticky='top'>
            <Container fluid>

                <Link className='navbar-brand' to="/">
                    <FontAwesomeIcon icon={faListCheck} className="me-2 text-success" />
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    
                    {/* <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                    </Nav> */}
                    
                {currentUser ?

                    <Nav
                        className="my-2 my-lg-0 ms-auto"
                        style={{ maxHeight: '100px' }}
                    >
                        <NavDropdown
                            id="navbarScrollingDropdown"
                            title={currentUser.email}
                            align="end"
                        >
                            {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            <NavDropdown.Item onClick={() => logOut()}>
                                Logout
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                :

                        <Nav
                            className="my-2 my-lg-0 ms-auto"
                            style={{ maxHeight: '100px' }}
                        >
                        <Link
                            className='btn btn-outline-success'
                            to="/signin"
                        >
                            Sign In
                        </Link>
                    </Nav>
                }
                    
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}