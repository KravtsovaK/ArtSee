// controllers/ExhibitController.js

// ВРЕМЕННО: Убираем все require, чтобы исключить ошибки путей
// const factory = require('../patterns/ExhibitFactory'); 
// const observer = require('../patterns/Observer');

// Данные
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

class ExhibitController {
    
    // Метод получения всех данных
    async getAll(req, res) {
        console.log('Запрос пришел, отправляю массив...');
        // Просто отдаем массив. Никакой логики, которая может сломаться.
        res.json(DB_DATA);
    }

    // Метод получения одного
    async getOne(req, res) {
        const item = DB_DATA.find(i => i._id === req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ error: "Not found" });
    }

    // Заглушка для создания (чтобы не ломалось)
    async create(req, res) {
        console.log('Попытка создания:', req.body);
        res.json({ status: 'ok', msg: 'Эмуляция создания успешна' });
    }

    // Заглушка для админки
    async renderAdminPanel(req, res) {
        res.render('admin', { exhibits: DB_DATA });
    }
}

module.exports = new ExhibitController();