const { gql } = require('../node_modules/apollo-server-express');

module.exports = gql`
extend type Query {
	categories: [Categories!]
	category(categories: String!): Jokes
    }
    
    type Jokes {
	   categories: [String!]
	   created_at: String!
           id: ID!
           updated_at: String! 
           value: String!
	   url: String!
    	}
	
	type Categories {
	   id: ID!
	   categories: String!
	}
`;
	