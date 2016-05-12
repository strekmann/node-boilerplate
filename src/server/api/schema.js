import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    graphql,
} from 'graphql';

import { User } from '../models';

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        is_active: { type: GraphQLBoolean },
        is_admin: { type: GraphQLBoolean },
        created: { type: GraphQLString },
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            viewer: {
                type: userType,
                resolve: ({ viewer }) => viewer,
            },
            user: {
                type: userType,
                args: {
                    username: {
                        name: 'username',
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
                resolve: ({ viewer }, { username }) => User.findOne({ username }).exec(),
            },
            users: {
                type: new GraphQLList(userType),
                resolve: (root) => User.find({}).exec(),
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            updateUser: {
                type: userType,
                args: {
                    username: { type: GraphQLString },
                    email: { type: GraphQLString },
                },
                resolve: ({ viewer }, { username, email }) => {
                    if (!viewer) { throw new Error('User not logged in'); }
                    return User.findByIdAndUpdate(viewer._id, { username, email }, { new: true }).exec();
                },
            },
        },
    }),
});

export default schema;
