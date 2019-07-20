const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const Product = require('./Product');

let router = express.Router();

// const fetchProduct = asin => {
//   const url = 'https://www.amazon.com/dp/' + asin;

//   return axios.get(url)
//   .then(response => {
//     console.log(response.data);   

//     return response.data;
//   })
//   .catch(error => {
//     console.log(error);
//     return error;
//   });

  
//   // res.json({'asin': asin});
// };

router.get('/product/:asin', async function(req, res) {
  const asin = req.params.asin;
  if (typeof asin === 'undefined') {
    res.json({'error': 'Missing required parameter: ASIN'});
    return;
  }

  const productData = await Product.fetch(asin);

  res.json({'status': typeof productData === "string" ? 'error' : 'success', 'data': productData});
});

app.use('/api', router);

app.use('/', express.static('./dist', {
  index: "index.html"
}));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));