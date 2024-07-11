import React, { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, USERCARD_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const obj = localStorage.user
    let user_id = JSON.parse(obj).id
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className='nav-container'>
                <Navbar.Brand href={MAIN_ROUTE}>Учёты и записи</Navbar.Brand>
                {user.isAuth?
                    <Nav className="ml-auto">
                        <Button as={Link} to={`${USERCARD_ROUTE}/${user_id}`} variant={"outline-light"}>Данные</Button>
                        <Button as={Link} to={`${PROFILE_ROUTE}/${user_id}`} variant={"outline-light"}style={{marginLeft: 6}}>Профиль</Button>
                        <Button as={Link} to={`${LOGIN_ROUTE}`} variant={"outline-light"} style={{marginLeft: 6}}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
                
            </Container>
        </Navbar>
        </>
    )
})

export default NavBar;