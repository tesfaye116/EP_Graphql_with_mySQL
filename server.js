const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

PORT = process.env.PORT || 8000

app.use('/graphql', graphqlHTTP({
    schema: require('./schema/schema.js'),
    graphiql: true
}))

app.listen(PORT,
    () => console.log(`Server listening on port http://localhost:${PORT}`.yellow.bold))