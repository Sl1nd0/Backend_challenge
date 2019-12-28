const uuid = require('uuid');
const { users } = require('../constants');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middleware');

module.exports = {
    
	Query: {
		//greetings: () => null,
		//console.log(email);
	   users: () => users,
	   user: combineResolvers(isAuthenticated, (_, {id}, { email }) => {
	/*	if (!req.email)
        {
            throw new Error('Access denied, please log in again');
        }*/
		console.log(' ==== ', email); 
		return users.find(user => user.id === id)
	   })	   
	 //  username: (_, {name}) => users.find(user => user.name === name),
	  // useremail: (_, {email}) => users.find(user => user.email === email),
	   //userpassword: (_, {password}) => users.find(user => user.password === password)
     },

	Mutation: {
		login: async( _, { input }) => {
			//I'm not pulling from DB because you won't have access to it.. 
			try {

			  const user = await users.find(user => user.email == input.email);
			if (!user)
			{
				throw new Error('User not found');
			}
			
			const isPasswordValid = bcrypt.compare(input.password, user.password);
			//console.log(isPasswordValid);
			if (!isPasswordValid)
			{
				console.log(user);
				throw new Error('Incorrect password ' + input.password);
			}

			const secret = process.env.JWT_SECRET_KEY || 'mysecret';
			const token = jwt.sign({email: user.email}, secret, {expiresIn: '1d'});
			return {token}
			} catch(error) {
			  console.log("Something wentb wrong \n" + error );
			}
		}
	}

}