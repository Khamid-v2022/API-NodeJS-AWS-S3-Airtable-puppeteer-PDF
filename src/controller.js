const take_screenshot = require('./screenshot.js');
const { read_airtable, update_record_airtable } = require('./airtable');
const uploadFile = require('./upload_s3.js');

const controller = async() => {
    const list = await read_airtable();

    for (const item of list) {
        if (item.Thumbnail == undefined && item.Document && item.Document[0].url) {

            const path = await take_screenshot(item.Document[0].url);

            // upload image to S3
            uploadFile(path, function(resp) {
                // update aritable
                update_record_airtable(item.id, resp);
            });
        }
    }

    return true;
};

module.exports = controller;