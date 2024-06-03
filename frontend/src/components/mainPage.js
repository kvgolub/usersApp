import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Main = () => (
    <Container>
        <Navbar bg="primary" data-bs-theme="dark">
            <Nav className="p-2">
                <Navbar.Brand href="/">Стартовая страница</Navbar.Brand>
                <Nav.Link href="/table">Таблица</Nav.Link>
                <Nav.Link href="/users">Пользователи</Nav.Link>
            </Nav>  
        </Navbar>
        <hr />
        <Outlet />
    </Container>
);