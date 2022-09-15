const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema.js')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

PORT = process.env.PORT || 8000

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`.yellow.bold)
})