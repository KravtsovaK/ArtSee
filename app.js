const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Инициализация БД (Singleton срабатывает при импорте)
require('./config/db'); 

const ExhibitController = require('./controllers/ExhibitController');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Раздача статики (Vue фронтенд)

// Настройка View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Роуты ---

// 1. API Маршруты (Для Vue Frontend)
app.get('/api/exhibits', ExhibitController.getAll);
app.get('/api/exhibits/:id', ExhibitController.getOne);
app.post('/api/exhibits', ExhibitController.create);

// 2. Классический MVC маршрут (Рендеринг HTML на сервере)
app.get('/admin', ExhibitController.renderAdminPanel);

// 3. Главная страница (Отдаем ваш файл Vue)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Frontend available at http://localhost:${PORT}`);
    console.log(`Admin Panel available at http://localhost:${PORT}/admin`);
});