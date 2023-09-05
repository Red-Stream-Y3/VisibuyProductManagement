import vision from '@google-cloud/vision';

// Create a  new client
let client;

export const getClient = () => {
    if (!client) {
        client = new vision.ImageAnnotatorClient({
            keyFilename: './utils/credentials.json',
        });
    }
    return client;
};