const express = require('express');
const router = express.Router();


//подключение к БД
const connection = require('../database/connect_db');


//создание таблицы в БД
router
    .route('/create')
    .get((req, res) =>  {
        connection.query("CREATE TABLE users (id INT, name VARCHAR(20), surname VARCHAR(20), age INT)", (err, result, fields) => {
            if(err != null) {
                res.send("Ошибка: " + err.message)
            } else if (result != null) {
                res.send("Таблица пользователей создана в БД")
            }
        });
    });


//проверка наличия таблицы в БД
router
    .route('/like')
    .get((req, res) => {
        connection.query("SHOW tables LIKE 'users'", (err, result, fields) => {
            res.json(result.length);
        });
    });


//удаление таблицы
router
    .route('/drop')
    .get((req, res) => {
        connection.query("DROP TABLE users", (err, result, fields) => {
            if(err != null) {
                res.send("Ошибка: " + err.message)
            } else if (result != null) {
                res.send("Таблица пользователей удалена из БД")
            }
        });
    });


//вставка новой записи о пользователе в БД
router
    .route('/insert/:name/:surname/:age')
    .get(async (req, res) => {
        const query =  new Promise((resolve, reject) => {
            connection.query("SELECT count(*), max(id) FROM users", (err, result, fields) => {
                var count;
                if(result[0]['count(*)'] == 0) {
                    count = result[0]['count(*)'];
                } else {
                    count = result[0]['max(id)'] + 1;
                }
                
                resolve(count);
            });
        });
        
        connection.query(`INSERT INTO users (id, name, surname, age) VALUES (${await query}, '${req.params.name}', '${req.params.surname}', ${req.params.age})`, (err, result, fields) => {
            if(err != null) {
                res.send("Ошибка: " + err.message)
            } else if (result != null) {
                query.then(v => res.send(`Пользователь с ID: ${v} добавлен в таблицу`));
            }
        }); 
    });


//поиск и вывод опредленнного пользователя по id
router
    .route('/search/:id')
    .get((req, res) => {
        connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, result, fields) => {
            if(err != null) {
                res.json("Ошибка: " + err.message)
            } else if (result != null) {
                if (result.length == 1) {
                    res.json(result[0]);
                } else if (result.length == 0) {
                    //res.send(`Пользователя с ID: ${req.params.id} нет в таблице`);
                    res.json(`Пользователя с ID: ${req.params.id} нет в таблице`);
                }
            }
        });
    });


//поиск и удаление опредленнного пользователя по id
router
    .route('/delete/:id')
    .get((req, res) => {
        connection.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, result, fields) => {
            if(err != null) {
                res.json("Ошибка: " + err.message)
            } else if (result != null) {
                if (result.affectedRows === 1) {
                    res.json(`Пользователь с ID: ${req.params.id} удален из таблицы`);
                } else if (result.affectedRows === 0) {
                    res.json(`Пользователя с ID: ${req.params.id} нет в таблице`);
                }
            }
        });
    });


//вывод списка всех пользователей
router
    .route('/allusers')
    .get((req, res) => {
        connection.query("SELECT * FROM users", (err, result, fields) => {
            res.json(result);
        });
    });    


//очистка всех записей таблицы
router
    .route('/truncate')
    .get((req, res) => {
        connection.query("TRUNCATE TABLE users", (err, result, fields) => {
            res.send("Таблица очищена от всех записей пользователей");
        });
    });


module.exports = router;
