const axios = require('axios');

const DatabaseHandler = require('./DatabaseHandler');
const ProductParser = require('./ProductParser');

const getFromStorage = async asin => {
    return await DatabaseHandler.find('products', {'asin': asin});
};

const getFromWeb = async asin => {
    const url = 'https://www.amazon.com/dp/' + asin;
    
    const response = await axios.get(url)
    const parsedData = ProductParser.parse(response.data);

    if (parsedData.name !== '') {
        parsedData.asin = asin;
        const result = await DatabaseHandler.update('products', {'asin': asin}, parsedData);
        
        if (result) {
            console.log('success', parsedData);
            return parsedData;
        }
    }
    return {};
};

exports.fetchFromStorage = getFromStorage;
exports.fetchFromWeb = getFromWeb;
exports.fetch = async asin => {
    let productData = await getFromStorage(asin);
    
    if (!productData) {
        productData = await getFromWeb(asin);
    }
    return productData;
};