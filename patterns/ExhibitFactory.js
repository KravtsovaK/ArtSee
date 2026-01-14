class ExhibitFactory {
    createExhibit(data) {
        // Базовая логика: если нужно обработать разные типы по-разному
        // В данном простом примере мы возвращаем подготовленный объект
        return {
            title: data.title,
            museum: data.museum || 'Неизвестный музей',
            year: data.year,
            type: data.type,
            description: data.description,
            images: data.images || [],
            createdAt: new Date()
        };
    }
}

module.exports = new ExhibitFactory();