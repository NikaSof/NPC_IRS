import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, ListGroup, Spinner, Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../http/userApi";
import { Context } from "../index";
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader";

const UserProfile = () => {
    const { id } = useParams(); 
    const user_id = JSON.parse(localStorage.user).id
    const user_token = localStorage.token;
    const { user } = useContext(Context); 
    const [data, setData] = useState(null);
    const [education, setEducation] = useState([]);
    const [family, setFamily] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModalFamily, setShowModalFamily] = useState(false);
    const [showModalEducation, setShowModalEducation] = useState(false); 
    const [newFamilyMember, setNewFamilyMember] = useState({
        full_name: '',
        birth_date: '',
        relationship: '',
    });
    const [newEducation, setNewEducation] = useState({
        institution: '',
        degree: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {

        const requestProfile = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
            }
        };

        fetch(`http://localhost:5000/api/user/auth`, requestProfile)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Failed to fetch profile data:", error))
            .finally(() => setLoading(false));

        const requestEducation = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
            }
        };

        fetch(`http://localhost:5000/api/education/${user_id}`, requestEducation)
            .then(response => response.json())
            .then(education => setEducation(education))
            .catch(error => console.error("Failed to fetch education data:", error))
            .finally(() => setLoading(false));

        const requestFamily = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
            }
        };

        fetch(`http://localhost:5000/api/family/${user_id}`, requestFamily)
            .then(response => response.json())
            .then(family => setFamily(family))
            .catch(error => console.error("Failed to fetch education data:", error))
            .finally(() => setLoading(false));

    }, 
    []);

    const handleAddFamilyMember = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/family`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(newFamilyMember),
            });
            if (response.ok) {

                const updatedFamilyResponse = await fetch(`http://localhost:5000/api/family/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`,
                    }
                });
                const updatedFamilyData = await updatedFamilyResponse.json();
                setFamily(updatedFamilyData);

                setNewFamilyMember({
                    full_name: '',
                    birth_date: '',
                    relationship: '',
                });
                setShowModalFamily(false);
            } else {
                console.error('Failed to add family member');
            }
        } catch (error) {
            console.error('Failed to add family member:', error);
        }
    };

    const handleAddEducation = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/education`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(newEducation),
            });
            if (response.ok) {
                const updatedEducationResponse = await fetch(`http://localhost:5000/api/education/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`,
                    }
                });
                const updateEducationData = await updatedEducationResponse.json();
                setFamily(updateEducationData);
                setNewEducation({
                    institution: '',
                    degree: '',
                    start_date: '',
                    end_date: '',
                });
                setShowModalEducation(false);
            } else {
                console.error('Failed to add education');
            }
        } catch (error) {
            console.error('Failed to add education:', error);
        }
    };

    if (!data) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container style={{marginTop: 50}}>
            <Row className="justify-content-center">
                <Col md={8} >
                    <Card>
                        <Card.Header as="h2">Профиль пользователя</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong>ФИО:</strong> {data.full_name}</ListGroup.Item>
                                <ListGroup.Item><strong>Email:</strong> {data.email}</ListGroup.Item>
                                <ListGroup.Item><strong>Логин:</strong> {data.login}</ListGroup.Item>
                                <ListGroup.Item><strong>Дата рождения:</strong> {new Date(data.birth_date).toLocaleDateString()}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: 25}}>   
                            <Card.Header as="h3">Образование</Card.Header>
                            <Button variant={"outline-dark"} style={{ height: 40, marginTop: 5 }} onClick={() => setShowModalEducation(true)}>Добавить</Button>
                        </div>    
                        <Card.Body>
                            <Modal show={showModalEducation} onHide={() => setShowModalEducation(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Добавить образование</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formFullName">
                                            <Form.Label>Университет</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Введите название"
                                                value={newEducation.institution}
                                                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBirthDate">
                                            <Form.Label>Факультет</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newEducation.degree}
                                                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formRelationship">
                                            <Form.Label>Начало обучения</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Введите дату"
                                                value={newEducation.start_date}
                                                onChange={(e) => setNewEducation({ ...newEducation, start_date: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formRelationship">
                                            <Form.Label>Конец обучения</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Введите дату"
                                                value={newEducation.end_date}
                                                onChange={(e) => setNewEducation({ ...newEducation, end_date: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModalEducation(false)}>
                                        Закрыть
                                    </Button>
                                    <Button variant="primary" onClick={handleAddEducation}>
                                        Сохранить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <ListGroup variant="flush">
                            {education.count > 0 ? (
                                    education.rows.map((edu, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>Университет:</strong> {edu.institution}<br />
                                            <strong>Факультет:</strong> {edu.degree}<br />
                                            <strong>Начало обучения:</strong> {edu.start_date.split('T')[0]}<br />
                                            <strong>Конец обучения:</strong> {edu.end_date.split('T')[0]}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>Образовательных учреждений не найдено</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: 25}}>
                            <Card.Header as="h3">Члены семьи</Card.Header>
                            <Button variant={"outline-dark"} style={{ height: 40, marginTop: 5 }} onClick={() => setShowModalFamily(true)}>Добавить</Button>
                        </div>
                        <Card.Body>
                            <Modal show={showModalFamily} onHide={() => setShowModalFamily(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Добавить члена семьи</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formFullName">
                                            <Form.Label>ФИО</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Введите ФИО"
                                                value={newFamilyMember.full_name}
                                                onChange={(e) => setNewFamilyMember({ ...newFamilyMember, full_name: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBirthDate">
                                            <Form.Label>Дата рождения</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={newFamilyMember.birth_date}
                                                onChange={(e) => setNewFamilyMember({ ...newFamilyMember, birth_date: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formRelationship">
                                            <Form.Label>Родственная связь</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Введите родственную связь"
                                                value={newFamilyMember.relationship}
                                                onChange={(e) => setNewFamilyMember({ ...newFamilyMember, relationship: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModalFamily(false)}>
                                        Закрыть
                                    </Button>
                                    <Button variant="primary" onClick={handleAddFamilyMember}>
                                        Сохранить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <ListGroup variant="flush">
                            {family.count > 0 ? (
                                    family.rows.map((fl, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>ФИО:</strong> {fl.full_name}<br />
                                            <strong>Дата рождения:</strong> {fl.birth_date.split('T')[0]}<br />
                                            <strong>Родственная связь:</strong> {fl.relationship}<br />
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>Образовательных учреждений не найдено</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
