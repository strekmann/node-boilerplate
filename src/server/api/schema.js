import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import { User } from '../models';

class UserDTO { constructor(obj) { for (const k of Object.keys(obj)) { this[k] = obj[k]; } } }

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'User') {
            return User.findById(id).exec().then((user) => {
                console.log("USERDTO");
                return new UserDTO(user.toObject());
            });
        } else if (type === 'Widget') {
            // pass
            return null;
        } else {
            return null;
        }
    },
    (obj) => {
        console.log(obj);
        if (obj instanceof UserDTO) {
            return userType;
        } else if (obj instanceof Widget)  {
            return widgetType;
        } else {
            return null;
        }
    }
);

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A person',
    fields: {
        id: globalIdField('User'),
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        is_active: { type: GraphQLBoolean },
        is_admin: { type: GraphQLBoolean },
        created: { type: GraphQLString },
    },
    interfaces: [nodeInterface],
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
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
});

const mutationUserUpdate = mutationWithClientMutationId({
    name: 'UpdateUser',
    inputFields: {
        userid: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        viewer: {
            type: userType,
            resolve: (payload) => payload,
        },
    },
    mutateAndGetPayload: ({ userid, email }, context) => {
        const id = fromGlobalId(userid).id;
        return User.findByIdAndUpdate(id, { email: email }, { new: true }).exec();
    },
});


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        // Add your own mutations here
        updateUser: mutationUserUpdate,
    }),
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});

export default schema;
