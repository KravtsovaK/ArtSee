class EventManager {
    constructor() {
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify(data) {
        this.listeners.forEach(listener => listener(data));
    }
}

const loggerObserver = (data) => {
    console.log(`[LOG - ${new Date().toISOString()}]: Создан новый экспонат: ${data.title}`);
};

const eventManager = new EventManager();
eventManager.subscribe(loggerObserver);

module.exports = eventManager;