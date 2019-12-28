const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middleware');
const fetch = require('node-fetch');

var baseURL = `https://api.chucknorris.io/jokes/`;

module.exports = {
    
	Query: {
		//console.log(email);
	   categories: () => {
	//return [ {id: '1', categories:'animal'}, {id: '2', categories:'bird'} ]; //Right Structure
     let data =  fetch(`${baseURL}/categories`).then(res => res.json()).then(function(data) {
		    var mydata = [];
		    //var myJson = {};
		   
			for (var i = 0; i < data.length; i++) {
				let categories = data[i];
				
				let myjson = {
					id: i,
					categories: data[i]
				}		

				mydata.push(myjson);  
			}
			
			return mydata;
	  })
	  
	  return data;
    },
	
	   category: combineResolvers(isAuthenticated, (parent, args, { email }) => {
			  
			  //console.log('Categories ' + email);
			  baseURL+= "random?category=";
			  baseURL+=args.categories;	  
			  
			return fetch(`${baseURL}`).then(res => res.json())
		})
     
	 }
}