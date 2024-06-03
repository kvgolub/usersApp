const express = require('express');

const app = express();
const port = 8000;


//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//REST API
app.get('/', (req, res) => {
    res.send(`
        REST API - База данных пользователей
        <hr>
        <br>
        <pre>
Список URL-комманд API:
/api/create - создание таблицы в БД
/api/like - проверка наличия таблицы в БД
/api/drop - удаление таблицы

/api/insert/:name/:surname/:age - вставка новой записи о пользователе в БД (name - имя, surnsme - фамилия, age - возраст)
/api/search/:id - поиск и вывод данных опредленнного пользователя по id (id - идентификатор записи в БД)
/api/delete/:id - поиск и удаление опредленнного пользователя по id (id - идентификатор записи в БД)
/api/allusers - вывод списка всех пользователей
/api/truncate - очистка всех записей таблицы
        <\pre>
    `);
});


//подключение маршрутизации
const Router = require('./routes');
app.use('/api', Router);


app.use((req, res) => {
    res.status(404);
    res.json("Введите данные");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
