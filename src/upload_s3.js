const fs = require('fs');
const AWS = require('aws-sdk');
// Enter copied or downloaded access ID and secret key here
const ID = 'AKIATAQCWUWULBKADIR4';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'scripts-hexawise/document-screenshots';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = async(filepath, callback) => {

    const fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
    // Read content from the file
    const fileContent = fs.readFileSync(filepath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
        ACL: 'public-read'
    };

    // Uploading files to the bucket
    await s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        callback(data.Location);
    });
};

module.exports = uploadFile;