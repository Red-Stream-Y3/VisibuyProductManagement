import vision from '@google-cloud/vision';

// Create a  new client
let client;

export const getClient = () => {
    if (!client) {
        client = new vision.ImageAnnotatorClient({
            keyFilename: '../googleCredentials/curious-kingdom-398108-bb6edf68c75b.json',
        });
    }
    return client;
};