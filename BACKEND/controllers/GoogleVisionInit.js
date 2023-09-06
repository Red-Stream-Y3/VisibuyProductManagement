const vision = require('@google-cloud/vision');

// Create a  new client
let client;

const getClient = () => {
    if (!client) {
        client = new vision.ProductSearchClient({
            keyFilename: '../googleCredentials/curious-kingdom-398108-bb6edf68c75b.json',
        });
    }
    return client;
};

module.exports = { getClient };