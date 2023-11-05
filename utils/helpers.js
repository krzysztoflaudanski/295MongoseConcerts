function generateRandomId() {
    return Math.floor(Math.random() * 1000); // Możesz dostosować zakres ID według własnych potrzeb
}

module.exports = { generateRandomId };