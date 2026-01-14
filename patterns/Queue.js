class ImageProcessorQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    // Producer
    add(imageName) {
        this.queue.push(imageName);
        console.log(`[QUEUE] Image ${imageName} added to processing queue.`);
        this.process();
    }

    // Consumer
    async process() {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const image = this.queue.shift();

        console.log(`[WORKER] Processing image: ${image}...`);
        
        // Имитация тяжелой работы (2 секунды)
        setTimeout(() => {
            console.log(`[WORKER] Image ${image} processed successfully.`);
            this.isProcessing = false;
            this.process(); // Берем следующий
        }, 2000);
    }
}

module.exports = new ImageProcessorQueue();