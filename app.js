const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./database/util');
const { verifyUser } = require('./helper/context');
const fetch = require('node-fetch');

//Set dot Env
dotEnv.config();

const app = express();

//DB Connectivity, Incase I pull my data from mongodb
//connection();

//Middleware
app.use(express.json());

//Define the schema
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req}) => {
		await verifyUser(req);
		return {
			email: req.email
		}
	}
});

//Setup apollo middleware
apolloServer.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 5001;

app.use('/', (req, res, next)=> {
	//Testing my server ...
	res.send({message: 'Hello'});
});

app.listen(PORT, () => {
	console.log('Server listening on PORT: ' + PORT);
	console.log('Graphql End point ' + apolloServer.graphqlPath);
});