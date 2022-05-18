const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv').config()
const app = express();

app.use(cors())
app.use(fileUpload({}))
app.use(bodyParser.json());
app.use(express.static('public'))

const routes = require('./src/modules/routes/filesRoutes');

app.use('/api', routes)

app.listen(4000)
