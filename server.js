const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// Меняем порт на 3001, на случай если 3000 завис
const PORT = 3001; 

app.use(cors());
app.use(express.json());
// Указываем папку public как хранилище статики (html и картинки)
app.use(express.static(path.join(__dirname, 'public')));

// --- НАШИ ДАННЫЕ (В ПАМЯТИ) ---
const DB_DATA = [
    { _id: '1', title: 'Портрет неизвестной', museum: 'Третьяковская галерея', year: 'XIX век', type: 'Живопись', images: ['портрет неизвестной.jpg'], description: 'Шедевр Крамского.' },
    { _id: '2', title: 'Античная ваза', museum: 'Эрмитаж', year: 'V век до н.э.', type: 'Археология', images: ['античная ваза.jpg'], description: 'Древнегреческая амфора.' },
    { _id: '3', title: 'Икона Спас Нерукотворный', museum: 'Русский музей', year: 'XVI век', type: 'Живопись', images: ['икона.jpg'], description: 'Новгородская школа.' },
    { _id: '4', title: 'Бронзовый идол', museum: 'Эрмитаж', year: 'VIII век до н.э.', type: 'Археология', images: ['идол.jpg'], description: 'Древнее божество.' },
    { _id: '5', title: 'Серебряный кубок', museum: 'Музей Кремля', year: 'XVII век', type: 'Декоративно-прикладное искусство', images: ['кубок.jpg'], description: 'Царская посуда.' },
    { _id: '6', title: 'Шапка Мономаха', museum: 'Музей Кремля', year: 'XIII-XIV века', type: 'Драгоценности', images: ['шапка.png'], description: 'Символ самодержавия.' },
    { _id: '7', title: 'Боярыня Морозова', museum: 'Третьяковская галерея', year: '1887 год', type: 'Живопись', images: ['морозова.jpg'], description: 'Картина Сурикова.' },
    { _id: '8', title: 'Даная', museum: 'Эрмитаж', year: '1553 год', type: 'Живопись', images: ['даная.jpg'], description: 'Картина Тициана.' },
    { _id: '9', title: 'Утро в сосновом лесу', museum: 'Третьяковская галерея', year: '1889 год', type: 'Живопись', images: ['утро.jpg'], description: 'Мишки в лесу.' },
    { _id: '10', title: 'Девятый вал', museum: 'Русский музей', year: '1850 год', type: 'Живопись', images: ['девятый.jpg'], description: 'Айвазовский.' }
];

// --- API МАРШРУТЫ ---

// 1. Получить все (простой массив для фронтенда)
app.get('/api/exhibits', (req, res) => {
    // ЛОГИРОВАНИЕ: Смотрим, что пришло от фронта
    console.log('--------------------------------');
    console.log('Фильтры запроса:', req.query); 

    let results = [...DB_DATA]; 

    // 1. ПОИСК
    const search = req.query.search ? req.query.search.toLowerCase() : '';
    if (search) {
        results = results.filter(item => 
            item.title.toLowerCase().includes(search) || 
            item.museum.toLowerCase().includes(search)
        );
    }

    // 2. ФИЛЬТРЫ
    const types = req.query.types ? req.query.types.split(',') : [];
    const museums = req.query.museums ? req.query.museums.split(',') : [];

    if (types.length > 0) {
        console.log('Применяю фильтр по типам:', types);
        results = results.filter(item => types.includes(item.type));
    }

    if (museums.length > 0) {
        console.log('Применяю фильтр по музеям:', museums);
        results = results.filter(item => museums.includes(item.museum));
    }

    console.log(`Найдено элементов: ${results.length}`);
    res.json(results);
});

// 2. Получить один по ID
app.get('/api/exhibits/:id', (req, res) => {
    const item = DB_DATA.find(i => i._id === req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ error: "Not found" });
});

// --- ЗАПУСК ---
app.listen(PORT, () => {
    console.log(`✅ СЕРВЕР УСПЕШНО ЗАПУЩЕН!`);
    console.log(`🌍 Откройте в браузере: http://localhost:${PORT}`);
});