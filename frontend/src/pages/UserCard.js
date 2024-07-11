import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Spinner } from 'react-bootstrap';
import DataTable from '../components/DataTable';

const UserCard = () => {
    const [data, setData] = useState({ rows: [] });
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('users');

    const columnNames = {
        users: [
            { key: 'id', label: 'ID' },
            { key: 'login', label: 'Логин' },
            { key: 'email', label: 'Email' },
            { key: 'full_name', label: 'ФИО' },
            { key: 'birth_date', label: 'Дата рождения' },
        ],
        education: [
            { key: 'id', label: 'ID' },
            { key: 'institution', label: 'Университет' },
            { key: 'degree', label: 'Факультет' },
            { key: 'start_date', label: 'Дата начала' },
            { key: 'end_date', label: 'Дата окончания' }
        ],
        family: [
            { key: 'id', label: 'ID' },
            { key: 'full_name', label: 'Имя' },
            { key: 'relationship', label: 'Отношение' },
            { key: 'birth_date', label: 'Дата рождения' }
        ]
    };

    useEffect(() => {
        const fetchData = async (url) => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setColumns(columnNames[view]);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        switch (view) {
            case 'users':
                fetchData('http://localhost:5000/api/user/all');
                break;
            case 'education':
                fetchData('http://localhost:5000/api/education');
                break;
            case 'family':
                fetchData('http://localhost:5000/api/family');
                break;
            default:
                break;
        }
    }, [view]);

    return (
        <Container style={{ marginTop: 50, }}>
            <Row className="justify-content-center">
                <Col md={10}>
                    <ButtonGroup className="mb-3 align-self-end" >
                        <Button variant={"outline-light"} onClick={() => setView('users')}>Пользователи</Button>
                        <Button variant={"outline-light"} onClick={() => setView('education')}>Образование</Button>
                        <Button variant={"outline-light"} onClick={() => setView('family')}>Члены семьи</Button>
                    </ButtonGroup>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <DataTable data={data} columns={columns} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserCard;
