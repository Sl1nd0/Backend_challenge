const { gql } = require('../node_modules/apollo-server-express');

const userTypeDefs = require('./user');
const jokesTypeDefs = require('./jokes');

const typeDefs = gql`
type Query {
    _: String
}

type Mutation {
    _: String
}
`;

module.exports = [
    typeDefs,
    userTypeDefs,
    jokesTypeDefs 
]