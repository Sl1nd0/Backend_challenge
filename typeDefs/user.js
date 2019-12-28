const { gql } = require('../node_modules/apollo-server-express');

module.exports = gql`
extend type Query {
    users: [User!]
    user(id: ID!): User


	username(name: String!): User
	userpassword(password: String!): User
	useremail(email: String!): User
    }

    extend type Mutation {
        login(input: loginInput): Token
    }

    input loginInput {
        email: String!
        password: String!
    }
    
    type Token {
        token: String!
    }

    type User {
        id: ID!
        name: String!
        email: String! 
        password: String!
    }`;