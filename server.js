const express = require('express')
const colors = require('colors')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


PORT = process.env.PORT || 8000


app.listen(PORT,
    () => console.log(`Server listening on port http://localhost:${port}`.yellow.bold))