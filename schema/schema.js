const { PrismaClient } = require('@prisma/client')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')

const prisma = new PrismaClient();

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        published: { type: GraphQLBoolean },
        author: {
            type: UserType,
            resolve(parent, args) {
                try {
                    return prisma.post.findOne({
                        where: { id: parent.id }
                    }).author();
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                try {
                    return prisma.user.findMany();
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                try {
                    return prisma.user.findUnique({
                        where: { id: args.id }
                    });
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                try {
                    return prisma.post.findMany();
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                try {
                    return prisma.post.findUnique({
                        where: { id: args.id }
                    });
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        createUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                try {
                    return prisma.user.create({
                        data: {
                            name: args.name,
                            email: args.email
                        },
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                try {
                    return prisma.user.update({
                        where: { id: args.id },
                        data: {
                            name: args.name,
                            email: args.email
                        }
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                try {
                    return prisma.user.delete({
                        where: { id: args.id }
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        createPosts: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                published: { type: new GraphQLNonNull(GraphQLBoolean) },
                author: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                try {
                    return prisma.post.create({
                        data: {
                            title: args.title,
                            content: args.content,
                            published: args.published,
                            author: {
                                connect: {
                                    id: args.author
                                }
                            }
                        }
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        updatePosts: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                published: { type: GraphQLBoolean },
                author: { type: GraphQLID }
            },
            resolve(parent, args) {
                try {
                    return prisma.post.update({
                        where: { id: args.id },
                        data: {
                            title: args.title,
                            content: args.content,
                            published: args.published,
                            author: {
                                connect: {
                                    id: args.author
                                }
                            }
                        }
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

        deletePosts: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                try {
                    return prisma.post.delete({
                        where: { id: args.id }
                    })
                } catch (error) {
                    return JSON.stringify(error);
                }
            }
        },

    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})