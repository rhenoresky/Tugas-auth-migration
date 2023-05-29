const db = require('./app/models')
require('dotenv').config()
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const port = process.env.PORT
require('./app/router/router.js')(app);
db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server Running on port ${port}`))
});