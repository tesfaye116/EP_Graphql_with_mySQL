const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

const PORT = process.env.PORT || 8000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`.yellow.bold)
})