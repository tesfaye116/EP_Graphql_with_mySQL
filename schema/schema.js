const { PrismaClient } = require('@prisma/client')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const prisma = new PrismaClient()


const typeDefs = `

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        published: Boolean!
        author: User!
    }

    type Query {
        users: [User!]!
        posts: [Post!]!
        user(id: ID!): User
        post(id: ID!): Post
    }

    type Mutation {
        createUser
        createPost
    }

    `;

const resolvers = {
    Query: {
        users: async () => {
            return await prisma.user.findMany()
        }
        ,
        posts: async () => {
            return await prisma.post.findMany()
        }
        ,
        user: async (parent, args) => {
            return await prisma.user.findOne({
                where: {
                    id: args.id
                }
            })
        },
        post: async (parent, args) => {
            return await prisma.post.findOne({
                where: {
                    id: args.id
                }
            })
        },
    }
    ,
    Mutation: {
        createUser: async (parent, args) => {
            return await prisma.user.create({
                data: {
                    name: args.name,
                    email: args.email
                }
            })
        },
        createPost: async (parent, args) => {
            return await prisma.post.create({
                data: {
                    title: args.title,
                    content: args.content,
                    published: args.published,
                    author: {
                        connect: {
                            id: args.authorId
                        }
                    }
                }
            })
        }
    }
}
