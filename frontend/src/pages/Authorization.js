import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './Authorization.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginUser, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Authorization = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [birth_date, setBirthDate] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await loginUser(login, password);
            } else {
                data = await registration(
                    login, 
                    password, 
                    email, 
                    full_name, 
                    birth_date
                );
            }
            user.setUser(data);
            user.setIsAuth(true);
            localStorage.setItem('user', JSON.stringify({
                id: data.id,
                login: data.login,
                password: data.password,
                token: data.token
            }));
            console.log(localStorage.user)
            navigate(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container style={{ width: 600 }}>
            <Form 
                className="justify-content-center align-items-center" 
                style={{ 
                    width: 600, 
                    marginTop: 100, 
                    border: '1px solid #2C3243',
                    borderRadius: 70, 
                    padding: 50, 
                    marginBottom: 20,
                    backgroundColor: '#444B5E', 
                    color: "white", 
                    boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.5)'
                }}
            >
                <Row className="mb-4" style={{ fontSize: 26, justifyContent: "center"}}>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </Row>
                {isLogin ? 
                    <>
                        <Form.Group className="mb-4" as={Col} controlId="formGridLogin">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control 
                                type="login" 
                                placeholder="Введите логин..."
                                name="login"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Введите пароль..."
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </>
                    :
                    <>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridLogin">
                            <Form.Label>Логин<span style={{ color: 'red' }}> *</span></Form.Label>
                            <Form.Control 
                                type="login" 
                                placeholder="Введите логин..." 
                                name="login"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Пароль<span style={{ color: 'red' }}> *</span></Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Введите пароль..." 
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
                        <Form.Label>Email<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Введите email..."
                            name="email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridFIO">
                        <Form.Label>ФИО<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите полное имя..."
                            name="full_name"
                            value={full_name} 
                            onChange={e => setFullName(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} controlId="formGridDob" >
                        <Form.Label>Дата рождения<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control 
                            type="date" 
                            style={{ cursor: "pointer" }}
                            name="birth_date"
                            value={birth_date} 
                            onChange={e => setBirthDate(e.target.value)} 
                        />
                    </Form.Group>
                    </>
                }

                {isLogin ?
                    <Row className="mt-5 justify-content-between">
                        <Button 
                            variant={"outline-light"} 
                            type="button" 
                            onClick={click} 
                            style={{ width: "25%", marginLeft: 12 }}
                        >
                            Войти
                        </Button>
                        <Button 
                            variant={"outline-light"} 
                            style={{ width: "35%", marginRight: 12 }} 
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                        >
                            Зарегистрироваться
                        </Button>
                    </Row>
                    :
                    <>
                        <Row className="mb-2" style={{ fontSize: 14, color: 'white' }}>
                            <p>Поля, отмеченные <span style={{ color: 'red' }}>*</span>, обязательны для заполнения.</p>
                        </Row>

                        <Row className="mt-3 justify-content-between">
                            <Button 
                                variant={"outline-light"} 
                                type="button" 
                                onClick={click} 
                                style={{ width: "35%", marginLeft: 12 }}
                            >
                                Зарегистрироваться
                            </Button>
                            <Button 
                                variant={"outline-light"} 
                                style={{ width: "25%", marginRight: 12 }} 
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Вход
                            </Button>
                        </Row>
                    </>
                }
            </Form>
        </Container>
    );
});

export default Authorization;
