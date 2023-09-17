const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();

const amazon = require('amazon-product-api');

const client = amazon.createClient({
  awsId: process.env.AWS_ACCESS_KEY,
  awsSecret: process.env.AWS_SECRET_KEY,
  awsTag: process.env.AWS_ASSOCIATE_TAG
});


app.get('/products/:category', (req, res) => {
    const category = req.params.category;

    client.itemSearch({
      searchIndex: category,
      responseGroup: 'ItemAttributes,Images',
      sort: 'salesrank',
      limit: 5
    }).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.status(500).json({ error: "Failed to fetch products." });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
