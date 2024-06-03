import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Table, Stack } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


const BuildUser = (index) => {
    //добавить пользователя в Таблицу
    const [name, setName] = useState(''); //имя пользователя
    const [surname, setSurname] = useState(''); //фамилия пользователя
    const [age, setAge] = useState(''); //возраст пользователя
    const [infoCreate, setInfoCreate] = useState(''); //информация о добавлении пользователя

    function createUser() {
        fetch(`http://95.174.90.246:8000/api/insert/${name}/${surname}/${age}`)
            .then(response => response.text())
            .then(response => setInfoCreate(response.replaceAll('"', '')))
            .catch(err => setInfoCreate(err));
    }
    

    //найти пользователя в Таблице
    const [idSearch, setIdSearch] = useState(''); //ID пользователя
    const [select, setSelect] = useState(''); //значение из списка    
    const [infoSearch, setInfoSearch] = useState(''); //информация о поиске пользователя

    function searchUser() {
        fetch(`http://95.174.90.246:8000/api/search/${idSearch}`)
            .then(response => response.json())
            .then(response => {
                if (typeof(response) == 'object') {
                    setInfoSearch(response[select]);
                } else if (typeof(response) == 'string') {
                    setInfoSearch(response);
                }
            })
            .catch(err => setInfoSearch(err));
    }
   
    
    //удалить пользователя из Таблицы
    const [idDelete, setIdDelete] = useState(''); //ID пользователя
    const [infoDelete, setInfoDelete] = useState(''); //информация об удалении

    function deleteUser() {
        fetch(`http://95.174.90.246:8000/api/delete/${idDelete}`)
            .then(response => response.json())
            .then(response => setInfoDelete(response))
            .catch(err => setInfoDelete(err));
    }


    //обновить таблицу пользователей
    const [dataUsers, setDataUsers] = useState([]); //таблица пользователей
    const [infoTable, setInfoTable] = useState(''); //информация о данный в таблице
    
    useEffect(() => {
        fetch('http://95.174.90.246:8000/api/allusers')
            .then(response => {return response.json()})
            .then(response => {setDataUsers(response)});
    }, [infoCreate, infoDelete, infoTable]);
    
    function updateUsers() {
        fetch("http://95.174.90.246:8000/api/allusers")
            .then(response => response.json())
            .then(response => setDataUsers(response));
    }


    //удалить всех пользователей из таблицы
    function deleteAllUsers() {
        fetch("http://95.174.90.246:8000/api/truncate")
            .then(response => response.text())
            .then(response => setInfoTable(response));
    }


    return (
        <Container>
            <h3>{index}</h3>
            <Form>
                <Form.Group className="group mb-3 p-3">
                    <Form.Label>Добавление нового пользователя в Таблицу</Form.Label>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Control type="input" placeholder="Имя" onFocus={() => {setInfoCreate('')}} onChange={(event) => {setName(event.target.value)}} />
                        </Col>
                        <Col>
                            <Form.Control type="input" placeholder="Фамилия" onFocus={() => {setInfoCreate('')}} onChange={(event) => {setSurname(event.target.value)}} />
                        </Col>
                        <Col>
                            <Form.Control type="input" placeholder="Возраст" onFocus={() => {setInfoCreate('')}} onChange={(event) => {setAge(event.target.value)}} />
                        </Col>   
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={createUser}>Добавить пользователя</Button>
                            <Form.Text className='p-3'>{infoCreate}</Form.Text>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="group mb-3 p-3">
                    <Form.Label>Найти данные нового пользователя в Таблице</Form.Label>
                    <Row>
                        <Col xs="3">
                            <Form.Control type="input" placeholder="Введите ID польтователя" onFocus={() => {setInfoSearch('')}} onChange={(event) => {setIdSearch(event.target.value)}} />
                        </Col>
                        <Col xs="4">
                            <Form.Select aria-label="Default select example" onFocus={() => {setInfoSearch('')}} onChange={(event) => {setSelect(event.target.value)}}>
                                <option>Выберите выводимые данные из списка</option>
                                <option value="name">Имя</option>
                                <option value="surname">Фамилия</option>
                                <option value="age">Возраст</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={searchUser}>Найти пользователя</Button>
                            <Form.Text className='p-3'>{infoSearch}</Form.Text>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="group mb-3 p-3">
                    <Form.Label>Удалить пользователя из Таблицы</Form.Label>
                    <Row>
                        <Col xs="7">
                            <Form.Control type="input" placeholder="Введите ID польтователя" onFocus={() => {setInfoDelete('')}} onChange={(event) => {setIdDelete(event.target.value)}} />
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={deleteUser}>Удалить пользователя</Button>
                            <Form.Text className='p-3'>{infoDelete}</Form.Text>
                        </Col>
                    </Row>
                </Form.Group>
                
                <Form.Group className="group mb-3 p-3">
                    <Stack className='mb-3' direction='horizontal' gap={3}>
                        <Form.Label className='mb-0'>Таблица пользователей</Form.Label>
                        <Button variant="primary" onMouseOut={() => {setInfoTable('')}} onClick={() => {updateUsers(); setInfoTable("Таблица обновлена");}}>Обновить данные о пользователях</Button>
                        <Button variant="danger" onMouseOut={() => {setInfoTable('')}} onClick={deleteAllUsers}>Удалить всех пользователей</Button>
                        <Form.Text className='ps-3'>{infoTable}</Form.Text>
                    </Stack>                    

                    <Table borderless>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td className='ps-2'>
                                {dataUsers.map(column => <tr>{JSON.stringify(column.id)}</tr>)}
                            </td>
                            <td className='ps-2'>
                                {dataUsers.map(column => <tr>{JSON.stringify(column.name).replaceAll('"', '')}</tr>)}
                            </td>
                            <td className='ps-2'>
                                {dataUsers.map(column => <tr>{JSON.stringify(column.surname).replaceAll('"', '')}</tr>)}
                            </td>
                            <td className='ps-2'>
                                {dataUsers.map(column => <tr>{JSON.stringify(column.age)}</tr>)}
                            </td>
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
        </Container>
    );
};

export const Users = () => BuildUser("Работа с записями пользователей");