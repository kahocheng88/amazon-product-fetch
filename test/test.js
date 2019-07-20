const product = require('../server/Product.js');
const expect = require('chai').expect;

const asin = 'B002QYW8LW';

describe('#product', function() {

  context('fetch product data from web', function() {
    it('should return product data with product name', async function(dne) {
    
        // use await to wait until the promise is fulfilled
        let productData = await product.fetchFromWeb(asin);

        expect(productData).to.deep.include({'name': 'Baby Banana Infant Training Toothbrush and Teether'});
    })
  });

  // context('fetch product data from storage', function() {
  //   it('should return product data with product name', async function() {
    
  //       // use await to wait until the promise is fulfilled
  //       const productData = await product.fetchFromStorage(asin);

  //       expect(productData).to.deep.include({'name': 'Baby Banana Infant Training Toothbrush and Teether'});
  //   })
  // });
});