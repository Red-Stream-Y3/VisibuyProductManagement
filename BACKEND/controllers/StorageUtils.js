const { getStorageClient } = require('./GoogleConfig');

//constants
const BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME;

//get storage client
const client = getStorageClient();

const uplodaFile = async (file) => new Promise((resolve, reject) => {
    const bucket = client.bucket(BUCKET_NAME);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: true,
    });

    blobStream.on('error', (err) => {
        reject(err);
    });

    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
    });

    blobStream.end(file.buffer);
});

module.exports = {
    uplodaFile,
};