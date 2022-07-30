const airtable = require("airtable");
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

const applicants = base("Documents");
// const all = applicants.select({ view: "Grid view" });

const read_airtable = async() => {
    let index = 0;
    return new Promise(resolve => {
        let list = [];
        applicants.select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function(record) {
                index++;
                let item = {
                    'id': record.id,
                    'Name': record.get('Name'),
                    'Document': record.get('Document'),
                    'Thumbnail': record.get('Thumbnail_Image')
                }
                list.push(item);
            });

            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; } else {
                resolve(list);
            }
        });
    });
};

const create_record_airtable = async(pdf_url, image_file_url) => {
    create_record({
        Name: "TEST",
        Thumbnail_Image: [{ url: image_file_url }]
    })
};

const create_record = async(fields) => {
    const createdRecord = await applicants.create(fields);
    console.log(minifyRecord(createdRecord));
}

const minifyRecord = (record) => {
    return {
        id: record.id,
        fields: record.fields
    }
}


const update_record_airtable = async(id, image_file_path) => {
    await applicants.update([{
        "id": id,
        "fields": {
            "Thumbnail_Image": [{ url: image_file_path }]
        }
    }], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function(record) {
            // console.log(record.get('Name'));
        });
    });
};

module.exports = {
    read_airtable,
    create_record_airtable,
    update_record_airtable
};