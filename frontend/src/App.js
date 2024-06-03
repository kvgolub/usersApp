import { BrowserRouter, Routes, Route } from "react-router-dom"; //модуль для настройки маршрутизации
import { Main } from './components/mainPage';
import { TableUsr } from './components/pageTable';
import { Users } from './components/pageUsers';



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={
              <div>
                <h3>Пользователи системы</h3>
                <p>
                  Страница "Таблица" - cоздание/проверка/удаление таблицы в Базе данных<br />
                  Страница "Пользователи" - cоздание/поиск/удаление пользователей в Таблице
                </p>
              </div>
            } />
            <Route path="table" element={<TableUsr />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
