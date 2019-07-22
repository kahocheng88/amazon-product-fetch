const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const databaseName = 'AmazonProducts';

let clientHandler = null;
let db = null;

const connect = async () => {
    return new Promise (resolve => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err !== null) {
                console.log(err);
                resolve(false);
            }
            console.log('Connected');
            clientHandler = client;
            db = clientHandler.db(databaseName);
            resolve(true);
        });
    });
};

const updateItem = async (collectionName, filter, item) => {
    return new Promise (resolve => {
        const collection = db.collection(collectionName);
        collection.updateOne(filter, {$set: item}, {upsert: true}, (err, result) => {
            if (err !== null) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};

const findItems = async (collectionName, filter) => {
    return new Promise (resolve => {
        const collection = db.collection(collectionName);
        collection.find(filter).toArray((err, items) => {
            resolve(items);
        });
    });
};

exports.update = async (collectionName, filter, newItem) => {
    return new Promise (resolve => {
        MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
            if (err !== null) {
                console.log(err);
                resolve(false);
            }
            else {
                console.log('Connected to database @ ', url);
                clientHandler = client;
                db = clientHandler.db(databaseName);
                let result = await updateItem(collectionName, filter, newItem);
                clientHandler.close();

                if (result) {
                    resolve(newItem);
                }

                resolve(false);
            }
        });
    });
};

exports.find = async (collectionName, filter) => {
    return new Promise (resolve => {
        MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
            if (err !== null) {
                console.log(err);
                resolve(false);
            }
            else {
                console.log('Connected to database @ ', url);
                clientHandler = client;
                db = clientHandler.db(databaseName);
                let products = await findItems(collectionName, filter);
                clientHandler.close();
                resolve(products[0]);
            }
        });
    });
};