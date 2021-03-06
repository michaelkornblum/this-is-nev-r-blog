const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const collectionRoutes = require('./routes/collection');
const fieldRoutes = require('./routes/field');
const entryRoutes = require('./routes/entry');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(collectionRoutes);
app.use(fieldRoutes);
app.use(entryRoutes);

app.listen(3000, () => console.log('Rockin on port 3000!!!'));
