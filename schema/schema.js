const { PrismaClient } = require('@prisma/client')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const prisma = new PrismaClient()


const typeDefs = `
  type Query {
    getAllUsers: [User!]!
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await prisma.user.findMany()
        }
        ,
        getUser: async ({ id }) => {
            return await prisma.user.findOne({
                where: {
                    id: id
                }
            })
        }
    },
    Mutation: {
        createUser: async ({ name, email }) => {
            return await prisma.user.create({
                data: {
                    name: name,
                    email: email
                }
            })
        }
    }

}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = {
    schema
}

