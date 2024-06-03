import React, { useState, useEffect } from 'react';
import {Container, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const BuildTable = (index) => {
    const [resultPresenceTable, setResultPresenceTable] = useState('');
    const [resultCreateTable, setResultCtreateTable] = useState('');
    const [resultDeleteTable, setResultDeleteTable] = useState('');

    
    //информация о наличии таблицы в Базе данных
    useEffect(() => {
        fetch(`http://95.174.90.246:8000/api/like`)
            .then(res => {return res.text()})
            .then(result => {
                if(result === "1") {
                    setResultPresenceTable("Таблица есть в Базе данных")
                } else {
                    setResultPresenceTable("Таблицы нет в Базе данных")
                }
            });
    }, []);    

    
    //создание таблицы
    function createTable() {
        fetch('http://95.174.90.246:8000/api/create')
        .then(res => res.text())
        .then(res => setResultCtreateTable(res));

        setResultDeleteTable('');
        setResultPresenceTable('');
    }

    
    //удаление таблицы
    function deleteTable() {
        fetch('http://95.174.90.246:8000/api/drop')
        .then(res => res.text())
        .then(res => setResultDeleteTable(res));

        setResultCtreateTable('');
        setResultPresenceTable('');
    }

    
    return (
        <Container>
            <h3>{index}</h3>
            <Form>
                <Form.Group className='group mb-3 py-2 ps-3'>
                    <Form.Text className='ps-3'>{resultPresenceTable}</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Button variant="success" onClick={createTable}>Создать таблицу</Button>
                    <Form.Text className='ps-3'>{resultCreateTable}</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Button variant="danger" onClick={deleteTable}>Удалить таблицу</Button>
                    <Form.Text className='ps-3'>{resultDeleteTable}</Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
};

export const TableUsr = () => BuildTable("Работа с таблицей пользователей");